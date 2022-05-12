import { MongooseUserRepository } from '../../../repositories/implementations/MongooseUserRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const mongooseUserRepository = new MongooseUserRepository();

const createUserUseCase = new CreateUserUseCase(mongooseUserRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
