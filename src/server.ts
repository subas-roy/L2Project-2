import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// Unhandled Rejection
// process.on('unhandledRejection', () => {
//   console.log('unhandledRejection is detected');
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// Uncaught Exception
// process.on('uncaughtException', () => {
//   console.log('uncaughtException is detected');
//   process.exit(1);
// });
