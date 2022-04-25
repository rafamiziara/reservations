import { TABLES, TABLE_SEATS } from "@config/constants";
import { validateRequest } from "@middlewares/validate-request";
import dayjs from "dayjs";
import express, { Request, Response } from "express";
import { body, param, query } from "express-validator";
import { secrets } from "./config/secrets";
import { createReservationController } from "./useCases/reservations/create";
import { deleteReservationController } from "./useCases/reservations/delete";
import { listReservationsController } from "./useCases/reservations/list";
import { createUserController } from "./useCases/users/create";
import { deleteUserController } from "./useCases/users/delete";
import { listUsersController } from "./useCases/users/list";

const router = express.Router();

// USERS ROUTES
router.post(
  `/${secrets.apiVersion}/users`,
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("name").trim().isLength({ min: 3, max: 30 }).withMessage("name must be between 3 and 30 characters"),
  ],
  validateRequest,
  (req: Request, res: Response) => createUserController.handle(req, res)
);

router.delete(
  `/${secrets.apiVersion}/users/:id`,
  [param("id").trim().isUUID().withMessage("userId is not a valid UUID")],
  validateRequest,
  (req: Request, res: Response) => deleteUserController.handle(req, res)
);

router.get(
  `/${secrets.apiVersion}/users`,
  [
    query("page").toInt().isInt({ min: 1 }).withMessage("page is not a valid number"),
    query("pageSize").toInt().isInt({ min: 1 }).withMessage("pageSize is not a valid number"),
  ],
  validateRequest,
  (req: Request, res: Response) => listUsersController.handle(req, res)
);

// RESERVATIONS ROUTES
router.post(
  `/${secrets.apiVersion}/reservations`,
  [
    body("seats")
      .isInt({ min: 1 })
      .withMessage("seats is not a valid number")
      .isInt({ max: TABLES * TABLE_SEATS })
      .withMessage(`The maximum number of seats is ${TABLES * TABLE_SEATS}`),
    body("date")
      .custom((date: Date) => dayjs(date).isValid() && dayjs(date).isAfter(dayjs()))
      .withMessage("date is not a valid date"),
    body("userId").trim().isUUID().withMessage("userId is not a valid UUID"),
  ],
  validateRequest,
  (req: Request, res: Response) => createReservationController.handle(req, res)
);

router.delete(
  `/${secrets.apiVersion}/reservations/:id`,
  [param("id").trim().isUUID().withMessage("reservationId is not a valid UUID")],
  validateRequest,
  (req: Request, res: Response) => deleteReservationController.handle(req, res)
);

router.get(
  `/${secrets.apiVersion}/reservations`,
  [
    query("page").toInt().isInt({ min: 1 }).withMessage("page is not a valid number"),
    query("pageSize").toInt().isInt({ min: 1 }).withMessage("pageSize is not a valid number"),
    query("startDate")
      .notEmpty()
      .custom((date: Date) => dayjs(date).isValid())
      .withMessage("startDate is not a valid date"),
    query("endDate")
      .notEmpty()
      .custom((endDate: Date, { req }) => dayjs(endDate).isValid() && dayjs(endDate).isAfter(dayjs(req.query.startDate)))
      .withMessage("endDate is not a valid date"),
  ],
  validateRequest,
  (req: Request, res: Response) => listReservationsController.handle(req, res)
);

export { router };
