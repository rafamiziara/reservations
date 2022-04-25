import { Request, Response } from "express";
import { CreateReservationUseCase } from "./CreateReservationUseCase";

export class CreateReservationController {
  constructor(private createReservationUseCase: CreateReservationUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { seats, date, userId } = req.body;

    try {
      const reservation = await this.createReservationUseCase.execute({ seats, date: new Date(date), userId });
      return res.status(201).json(reservation);
    } catch (err) {
      return res.status(400).json({ message: err.message || "Unexpected error" });
    }
  }
}
