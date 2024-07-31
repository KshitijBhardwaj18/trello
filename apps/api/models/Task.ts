import mongoose, { Schema, Document, Model } from 'mongoose';

interface ITask extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: 'To do' | 'In progress' | 'Under review' | 'Finished';
  priority?: 'Low' | 'Medium' | 'Urgent';
  deadline?: Date;
  date?: Date;
}

const TaskSchema: Schema<ITask> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    validate: {
      validator: mongoose.isValidObjectId,
      message: 'Invalid User ID',
    },
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['To do', 'In progress', 'Under review', 'Finished'],
      message: 'Status must be one of the following: To do, In progress, Under review, Finished',
    },
  },
  priority: {
    type: String,
    enum: {
      values: ['Low', 'Medium', 'Urgent'],
      message: 'Priority must be one of the following: Low, Medium, Urgent',
    },
    default: 'Low',
  },
  deadline: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Task: Model<ITask> = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
