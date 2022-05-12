import { MongooseReservationRepository } from '@repositories/MongooseReservationRepository';
import { MongooseUserRepository } from '@repositories/MongooseUserRepository';
import { CreateReservationController } from './CreateReservationController';
import { CreateReservationUseCase } from './CreateReservationUseCase';

const mongooseReservationRepository = new MongooseReservationRepository();
const mongooseUserRepository = new MongooseUserRepository();

const createReservationUseCase = new CreateReservationUseCase(mongooseReservationRepository, mongooseUserRepository);
const createReservationController = new CreateReservationController(createReservationUseCase);

export { createReservationController };
