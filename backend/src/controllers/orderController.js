const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendOrderConfirmationEmail } = require('../utils/sendEmail');

const generateOrderNumber = () => {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AMZ-${ts}-${rand}`;
};

const createOrder = async (req, res) => {
  try {
    console.log("[CREATE_ORDER] Request received", { 
      userId: req.userId,
      hasBody: !!req.body,
      bodyKeys: req.body ? Object.keys(req.body) : [] 
    });
    
    const {
      sessionId,
      shippingName,
      shippingEmail,
      shippingPhone,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry = 'India'
    } = req.body;

    if (!sessionId || !shippingName || !shippingEmail || !shippingAddress ||
        !shippingCity || !shippingState || !shippingZip) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get cart items
    console.log("[CREATE_ORDER] Fetching cart items for sessionId:", sessionId);
    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId },
      include: { product: true }
    });

    console.log("[CREATE_ORDER] Cart items found:", cartItems.length);
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Check stock
    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${item.product.name}`
        });
      }
    }

    const subtotal = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
      0
    );
    const shipping = subtotal > 499 ? 0 : 40;
    const total = subtotal + shipping;

    console.log("[CREATE_ORDER] Creating order:", { subtotal, shipping, total, itemCount: cartItems.length });

    // Create order in transaction
    const order = await prisma.$transaction(async (tx) => {
      const userId = req.userId || (req.auth ? req.auth.userId : null);
      console.log("[CREATE_ORDER] Transaction started. UserId:", userId);
      
      const newOrder = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          sessionId,
          ...(userId && { userId }), // Only include userId if it's not null
          subtotal: subtotal.toString(),
          shipping: shipping.toString(),
          total: total.toString(),
          shippingName,
          shippingEmail,
          shippingPhone: shippingPhone || '',
          shippingAddress,
          shippingCity,
          shippingState,
          shippingZip,
          shippingCountry,
          orderItems: {
            create: cartItems.map(item => ({
              productId: item.productId,
              name: item.product.name,
              price: parseFloat(item.product.price).toString(),
              quantity: item.quantity
            }))
          }
        },
        include: { orderItems: true }
      });

      console.log("[CREATE_ORDER] Order created with ID:", newOrder.id);

      // Decrease stock for each product
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }
      console.log("[CREATE_ORDER] Stock updated for all items");

      // Clear cart
      await tx.cartItem.deleteMany({ where: { sessionId } });
      console.log("[CREATE_ORDER] Cart cleared");

      return newOrder;
    });

    // Send order confirmation email asynchronously
    console.log("[CREATE_ORDER] Sending confirmation email to:", shippingEmail);
    sendOrderConfirmationEmail(order.id, shippingEmail, order).catch(console.error);

    console.log("[CREATE_ORDER] Order created successfully:", order.id);
    res.status(201).json(order);
  } catch (err) {
    console.error("[CREATE_ORDER_ERROR]", {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    res.status(500).json({ 
      error: 'Failed to create order', 
      details: err.message,
      stack: err.stack
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        orderItems: {
          include: {
            product: {
              include: { images: { where: { isPrimary: true }, take: 1 } }
            }
          }
        }
      }
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    console.log('GET ORDER -> Order userId:', order.userId, ' Req userId:', req.userId);
    if (order.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getOrdersBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const orders = await prisma.order.findMany({
      where: { sessionId },
      include: {
        orderItems: {
          include: {
            product: {
              include: { images: { where: { isPrimary: true }, take: 1 } }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (err) {
    console.error("[GET_ORDERS_BY_SESSION_ERROR]", err.message);
    res.status(500).json({ error: 'Server error', details: process.env.NODE_ENV === 'production' ? undefined : err.message });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.userId || (req.auth ? req.auth.userId : null);
    
    // Return empty array if no userId
    if (!userId) {
      return res.json([]);
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: {
              include: { images: { where: { isPrimary: true }, take: 1 } }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (err) {
    console.error('[GET_ORDERS_BY_USER_ERROR]', err.message);
    res.status(500).json({ error: 'Server error', details: process.env.NODE_ENV === 'production' ? undefined : err.message });
  }
};

module.exports = { createOrder, getOrder, getOrdersBySession, getOrdersByUser };
