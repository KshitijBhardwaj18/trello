import { Request, Response } from 'express';
import Task from '../models/Task';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, status, priority, deadline } = req.body;

  if (!title || !status) {
    res.status(400).json({ error: 'Title and Status are required' });
    return;
  }

  try {
    const newTask = new Task({
      user: req.user!.id, // Use non-null assertion since `user` is added by the middleware
      title,
      description,
      status,
      priority,
      deadline,
    });

    const task = await newTask.save();
    res.status(201).json({ msg: 'Task created successfully', task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user!.id }).sort({ date: -1 });
    res.status(200).json({ msg: 'Tasks retrieved successfully', tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, status, priority, deadline } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    if (task.user.toString() !== req.user!.id) {
      res.status(401).json({ error: 'User not authorized' });
      return;
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, status, priority, deadline } },
      { new: true }
    );

    res.status(200).json({ msg: 'Task updated successfully', task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    if (task.user.toString() !== req.user!.id) {
      res.status(401).json({ error: 'User not authorized' });
      return;
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: 'Task removed successfully' });
  } catch (err) {
    if(err instanceof Error){
    console.error(err);
    res.status(500).json({ error: `Server error: ${err.message}` });
    }else{
      console.error(err);
    res.status(500).json({ error: `Unknown erro}` });
    }

    
  }
};
