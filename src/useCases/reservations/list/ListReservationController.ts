import { ReservationModel } from '@models/Reservation';
import { Request, Response } from 'express';
import { ListReservationsUseCase } from './ListReservationsUseCase';

export class ListReservationController {
  constructor(private listReservationUseCase: ListReservationsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { page, pageSize, startDate, endDate } = req.query as any;
    const pagination = { page, pageSize };
    const dateRange = { startDate: new Date(startDate).toISOString(), endDate: new Date(endDate).toISOString() };

    try {
      const pagedResult = await this.listReservationUseCase.execute({ pagination, dateRange });

      const pagedResponse: PagedResponse<ReservationModel> = {
        total: pagedResult.totalCount,
        page: {
          index: page,
          size: pageSize,
          items: pagedResult.items,
        },
      };

      return res.status(200).json(pagedResponse);
    } catch (err) {
      return res.status(400).json({ message: err.message || 'Unexpected error' });
    }
  }
}
