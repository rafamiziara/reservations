import { MongooseReservationRepository } from "@repositories/MongooseReservationRepository";
import { DeleteReservationController } from "./DeleteReservationController";
import { DeleteReservationUseCase } from "./DeleteReservationUseCase";

const mongooseReservationRepository = new MongooseReservationRepository();

const deleteReservationUseCase = new DeleteReservationUseCase(mongooseReservationRepository);
const deleteReservationController = new DeleteReservationController(deleteReservationUseCase);

export { deleteReservationController };
