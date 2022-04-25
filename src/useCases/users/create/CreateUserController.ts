import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Invalid arguments" });
    }

    try {
      const user = await this.createUserUseCase.execute({ email, name });

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
