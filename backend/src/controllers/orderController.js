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
    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId },
      include: { product: true }
    });

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

    // Create order in transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          sessionId,
          userId: req.userId || (req.auth ? req.auth.userId : null),
          subtotal,
          shipping,
          total,
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
              price: item.product.price,
              quantity: item.quantity
            }))
          }
        },
        include: { orderItems: true }
      });

      // Decrease stock for each product
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({ where: { sessionId } });

      return newOrder;
    });

    // Send order confirmation email asynchronously
    sendOrderConfirmationEmail(order.id, shippingEmail, order).catch(console.error);

    res.status(201).json(order);
  } catch (err) {
    console.error("[CREATE_ORDER_ERROR]", {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    res.status(500).json({ 
      error: 'Failed to create order', 
      details: process.env.NODE_ENV === 'production' ? undefined : err.message 
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
    const whereClause = { userId: userId };

    const orders = await prisma.order.findMany({
      where: whereClause,
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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createOrder, getOrder, getOrdersBySession, getOrdersByUser };
