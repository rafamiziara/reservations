import { MongooseReservationRepository } from '@repositories/MongooseReservationRepository';
import { MongooseUserRepository } from '@repositories/MongooseUserRepository';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const mongooseUserRepository = new MongooseUserRepository();
const mongooseReservationRepository = new MongooseReservationRepository();

const deleteUserUseCase = new DeleteUserUseCase(mongooseUserRepository, mongooseReservationRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserController };
