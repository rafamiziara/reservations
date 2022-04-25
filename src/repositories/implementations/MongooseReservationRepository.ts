import { model, Model } from "mongoose";
import { IReservationRepository } from "@IRepositories/IReservationRepository";
import { Reservation, ReservationModel, reservationSchema } from "@models/Reservation";

export class MongooseReservationRepository implements IReservationRepository {
  private model: Model<ReservationModel> = Object.create(null);

  constructor() {
    this.model = model<ReservationModel>("ReservationSchema", reservationSchema);
  }

  async findById(id: string): Promise<ReservationModel | null> {
    return await this.model.findOne({ id }).exec();
  }

  async findByEmail(email: string): Promise<ReservationModel | null> {
    return await this.model.findOne({ email }).exec();
  }

  async fetchByDate(date: string): Promise<ReservationModel[]> {
    return await this.model.find({ date }).exec();
  }

  async fetchAll(pagination: PaginationRequest, dateRange: DateRangeRequest): Promise<PagedResult<ReservationModel>> {
    const { page, pageSize } = pagination;
    const { startDate, endDate } = dateRange;

    const response = await Promise.all([
      this.model
        .find({ date: { $gte: startDate, $lte: endDate } })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      this.count({}),
    ]);

    return { items: response[0], totalCount: response[1] };
  }

  async insert(reservation: Reservation): Promise<ReservationModel> {
    return this.model.create(reservation);
  }

  async count(conditions: Object): Promise<number> {
    return this.model.count(conditions).exec();
  }

  async deleteById(id: string): Promise<ReservationModel | null> {
    return await this.model.findOneAndDelete({ id }).exec();
  }
}
