import { Request, Response } from 'express';
import { DeleteUserUseCase } from './DeleteUserUseCase';

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const user = await this.deleteUserUseCase.execute(id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ message: err.message || 'Unexpected error' });
    }
  }
}
