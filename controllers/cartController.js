import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const addToCart = async (req, res, next) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    let totalRequestedQuantity = quantity;

    if (itemIndex > -1) {
      totalRequestedQuantity += cart.items[itemIndex].quantity;
    }

    if (totalRequestedQuantity > product.stock) {
      return res.status(400).json({
        error: `Only ${product.stock} item(s) in stock. You cannot add ${totalRequestedQuantity} to your cart.`,
      });
    }

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  const userId = req.user.id;
  const { id: productId } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ error: 'Item not found in cart' });

    if (quantity > product.stock) {
      return res.status(400).json({
        error: `Only ${product.stock} item(s) in stock. You cannot set quantity to ${quantity}.`,
      });
    }

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const deleteCartItem = async (req, res, next) => {
  const userId = req.user.id;
  const { id: productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};
