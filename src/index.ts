import 'dotenv/config';
import { Mongoose } from '@config/database/implementations/MongooseDatabase';
import { app } from './app';
import { secrets } from './config/secrets';

const start = async () => {
  const mongoose = new Mongoose();
  await mongoose.connect();

  app.listen(secrets.port, () => {
    console.log(`Listening on port ${secrets.port}!`);
  });
};

start();
