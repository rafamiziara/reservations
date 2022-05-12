import crypto from 'crypto';
import { User } from 'src/models/User';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('Email already in use!');
    }

    const user: User = {
      ...data,
      id: crypto.randomUUID(),
    };

    return await this.usersRepository.insert(user);
  }
}
