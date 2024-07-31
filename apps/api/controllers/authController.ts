import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, Email and Password are required' });
      return;
    }

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const payload = { id: user.id };
    const userData = { email: user.email, name: user.name };

    jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ msg: 'User registered successfully', token, user: userData });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ error: 'Email and Password are required' });
      return;
    }

    let user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const payload = { id: user.id };
    const userData = { email: user.email, name: user.name };

    jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ msg: 'User logged in successfully', token, user: userData });
    });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ error: 'Server error' });
  }
};
