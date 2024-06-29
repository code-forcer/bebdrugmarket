import dbConnect from '../../lib/dbConnect';
import Review from '../../models/Review';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { user, product, rating, comment } = req.body;

    const newReview = new Review({
      user,
      product,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } else if (req.method === 'GET') {
    const reviews = await Review.find().populate('user').populate('product');
    res.status(200).json(reviews);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
