import { BadRequestError } from "@errors/BadRequestError";
import { IReservationRepository } from "@IRepositories/IReservationRepository";
import { IUserRepository } from "@IRepositories/IUserRepository";

export class DeleteUserUseCase {
  constructor(private usersRepository: IUserRepository, private reservationRepository: IReservationRepository) {}

  async execute(id: string) {
    const userReservations = await this.reservationRepository.count({ userId: id });
    if (userReservations) throw new BadRequestError("Before cancelling the user, you must cancel his reservations");

    const user = await this.usersRepository.deleteById(id);
    if (user) return user;
    throw new BadRequestError(`User not found for id ${id}`);
  }
}
