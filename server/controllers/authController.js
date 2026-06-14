import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({
      _id: admin._id,
      email: admin.email,
      name: admin.name,
      token: generateToken(admin._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  res.json(req.admin);
};
