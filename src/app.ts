import express from "express";
import "express-async-errors";
import * as swaggerUiExpress from "swagger-ui-express";
import { json } from "body-parser";
import swaggerDocument from "./swagger.json";
import { router } from "./routes";
import { errorHandler } from "@middlewares/error-handler";
import { NotFoundError } from "@errors/NotFoundError";

const app = express();

app.use(json());
app.use(router);

app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
