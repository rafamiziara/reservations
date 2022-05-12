import { Reservation, ReservationModel } from '@models/Reservation';

export interface IReservationRepository {
  findById(id: string): Promise<ReservationModel | null>;
  fetchAll(pagination: PaginationRequest, dateRange: DateRangeRequest): Promise<PagedResult<ReservationModel>>;
  fetchByDate(date: string): Promise<ReservationModel[]>;
  deleteById(id: string): Promise<ReservationModel | null>;
  insert(reservation: Reservation): Promise<ReservationModel>;
  count(conditions: Object): Promise<number>;
}
