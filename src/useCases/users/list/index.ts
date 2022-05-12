import { MongooseUserRepository } from '@repositories/MongooseUserRepository';
import { ListUsersController } from './ListUsersController';
import { ListUsersUseCase } from './ListUsersUseCase';

const mongooseUserRepository = new MongooseUserRepository();

const listUsersUseCase = new ListUsersUseCase(mongooseUserRepository);
const listUsersController = new ListUsersController(listUsersUseCase);

export { listUsersController };
