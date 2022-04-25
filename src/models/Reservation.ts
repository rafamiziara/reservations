import { Schema, Document } from "mongoose";

export interface Reservation {
  id?: string;
  seats: number;
  tables: number;
  date: string;
  userId: string;
  creationDate?: string;
}

export interface ReservationModel extends Reservation, Document {
  id: string;
}

export const reservationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    tables: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    userId: {
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
    collection: "reservations",
  }
);
