import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { product, quantity, address, user } = req.body;

    const newOrder = new Order({
      product,
      quantity,
      address,
      user,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } else if (req.method === 'GET') {
    const orders = await Order.find().populate('product').populate('user');
    res.status(200).json(orders);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
