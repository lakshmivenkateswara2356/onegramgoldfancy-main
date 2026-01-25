const Cart = require("../models/cart.model");

exports.addItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // from auth middleware

    const cart = await Cart.getOrCreateCart(userId);
    const item = await Cart.addToCart(cart.id, productId, quantity);

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.getOrCreateCart(userId);
    const items = await Cart.getCartItems(cart.id);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Cart.removeItem(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
