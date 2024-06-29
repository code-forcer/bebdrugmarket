import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import { authenticate } from '../../../lib/auth';

export default async function handler(req, res) {
  await authenticate(req, res, async () => {
    if (req.method === 'GET') {
      await dbConnect();
      const products = await Product.find({});
      res.status(200).json(products);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  });
}
