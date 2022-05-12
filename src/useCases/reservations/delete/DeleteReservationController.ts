import { Request, Response } from 'express';
import { DeleteReservationUseCase } from './DeleteReservationUseCase';

export class DeleteReservationController {
  constructor(private deleteReservationUseCase: DeleteReservationUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const reservation = await this.deleteReservationUseCase.execute(id);
      return res.status(200).json(reservation);
    } catch (err) {
      return res.status(400).json({ message: err.message || 'Unexpected error' });
    }
  }
}
