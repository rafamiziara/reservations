import { Schema, Document } from 'mongoose';

export interface User {
  id?: string;
  email: string;
  name: string;
  creationDate?: string;
}

export interface UserModel extends User, Document {
  id: string;
}

export const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    creationDate: {
      type: String,
      default: new Date().toISOString(),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
    collection: 'users',
  },
);
