import crypto from "crypto";
import { IReservationRepository } from "@IRepositories/IReservationRepository";
import { Reservation } from "@models/Reservation";
import { ICreateReservationRequestDTO } from "./CreateReservationDTO";
import { IUserRepository } from "@IRepositories/IUserRepository";
import { BadRequestError } from "@errors/BadRequestError";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { ALLOW_MIX_TABLES, OPENING_DURATION, OPENING_TIME, TABLES, TABLE_SEATS } from "@config/constants";

dayjs.extend(isBetween);

export class CreateReservationUseCase {
  constructor(private reservationRepository: IReservationRepository, private userRepository: IUserRepository) {}

  async execute(data: ICreateReservationRequestDTO) {
    const { userId, date, seats } = data;

    const user = await this.userRepository.findById(userId);
    if (!user) throw new BadRequestError("User not found");

    const requestedDate = dayjs(date).startOf("h"); // TODO USE SEATING_TIME
    const openingTime = OPENING_TIME.year(requestedDate.year()).month(requestedDate.month()).day(requestedDate.day()); // TODO MANAGE YESTERDAY
    const closingTime = openingTime.add(OPENING_DURATION);
    const validTime = requestedDate.isBetween(openingTime, closingTime, null, "[)");
    if (!validTime) throw new BadRequestError("The restaurant is closed this time");

    const reservations = await this.reservationRepository.fetchByDate(requestedDate.toISOString());
    const seatsAlreadyBooked = reservations.reduce((acc, cur) => acc + cur.seats, 0);
    const tablesAlreadyBooked = reservations.reduce((acc, cur) => acc + cur.tables, 0);

    const maximumCapicity = TABLES * TABLE_SEATS;
    const availableSeats = maximumCapicity - (ALLOW_MIX_TABLES ? seatsAlreadyBooked : tablesAlreadyBooked * TABLE_SEATS);

    if (availableSeats < seats) throw new BadRequestError("The requested seats are not available on this date");

    const reservation: Reservation = {
      ...data,
      tables: Math.ceil(seats / TABLE_SEATS),
      date: requestedDate.toISOString(),
      id: crypto.randomUUID(),
    };

    return await this.reservationRepository.insert(reservation);
  }
}
