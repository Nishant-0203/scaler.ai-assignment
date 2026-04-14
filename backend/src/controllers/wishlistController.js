const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getWishlist = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const items = await prisma.wishlist.findMany({
      where: { sessionId },
      include: {
        product: {
          include: { images: { where: { isPrimary: true }, take: 1 } }
        }
      }
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { sessionId, productId } = req.body;
    const existing = await prisma.wishlist.findUnique({
      where: { sessionId_productId: { sessionId, productId: parseInt(productId) } }
    });
    if (existing) return res.status(400).json({ error: 'Already in wishlist' });

    const item = await prisma.wishlist.create({
      data: { sessionId, productId: parseInt(productId) },
      include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } }
    });
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.wishlist.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
