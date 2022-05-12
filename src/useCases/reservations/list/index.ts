import { MongooseReservationRepository } from '@repositories/MongooseReservationRepository';
import { ListReservationController } from './ListReservationController';
import { ListReservationsUseCase } from './ListReservationsUseCase';

const mongooseReservationRepository = new MongooseReservationRepository();

const listReservationsUseCase = new ListReservationsUseCase(mongooseReservationRepository);
const listReservationsController = new ListReservationController(listReservationsUseCase);

export { listReservationsController };
