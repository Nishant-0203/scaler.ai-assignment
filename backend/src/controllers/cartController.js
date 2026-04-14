const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCart = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const items = await prisma.cartItem.findMany({
      where: { sessionId },
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true }, take: 1 }
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { sessionId, productId, quantity = 1 } = req.body;
    if (!sessionId || !productId) {
      return res.status(400).json({ error: 'sessionId and productId required' });
    }

    const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const existing = await prisma.cartItem.findUnique({
      where: { sessionId_productId: { sessionId, productId: parseInt(productId) } }
    });

    let item;
    if (existing) {
      item = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + parseInt(quantity) },
        include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } }
      });
    } else {
      item = await prisma.cartItem.create({
        data: { sessionId, productId: parseInt(productId), quantity: parseInt(quantity) },
        include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } }
      });
    }

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const item = await prisma.cartItem.update({
      where: { id: parseInt(id) },
      data: { quantity: parseInt(quantity) },
      include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } }
    });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cartItem.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const clearCart = async (req, res) => {
  try {
    const { sessionId } = req.params;
    await prisma.cartItem.deleteMany({ where: { sessionId } });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
