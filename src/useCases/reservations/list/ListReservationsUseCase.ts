import { IReservationRepository } from '@IRepositories/IReservationRepository';
import { IListReservationsRequestDTO } from './ListReservationsDTO';

export class ListReservationsUseCase {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(data: IListReservationsRequestDTO) {
    const { pagination, dateRange } = data;

    return await this.reservationRepository.fetchAll(pagination, dateRange);
  }
}
