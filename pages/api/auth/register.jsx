import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import corsMiddleware from '../../../middlewares/corsMiddleware';
import { validateEmail, validatePassword } from '../../../utils/validators';

export default async function handler(req, res) {
  await corsMiddleware(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'mailtrap' if you're using Mailtrap
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Registration Successful',
      text: `Hello ${name},\n\nYour registration was successful!\n\nThank you,\nYour Team`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error: ', error);
        return res.status(500).json({ message: 'Failed to send registration email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(201).json({ message: 'User registered successfully' });
      }
    });
  });
}
