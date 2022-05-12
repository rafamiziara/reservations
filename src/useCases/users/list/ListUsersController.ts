import { UserModel } from '@models/User';
import { Request, Response } from 'express';
import { ListUsersUseCase } from './ListUsersUseCase';

export class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { page, pageSize } = req.query as any;

    try {
      const pagedResult = await this.listUsersUseCase.execute({ page, pageSize });

      const pagedResponse: PagedResponse<UserModel> = {
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
