import { BadRequestError } from "@errors/BadRequestError";
import { IReservationRepository } from "@IRepositories/IReservationRepository";

export class DeleteReservationUseCase {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(id: string) {
    const reservation = await this.reservationRepository.deleteById(id);

    if (reservation) return reservation;
    throw new BadRequestError("Reservation not found");
  }
}
