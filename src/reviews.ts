import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ReviewsModule } from './app.module';

async function reviews() {
  const PORT = process.env.PORT;
  const port = PORT ? +PORT : 5005;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReviewsModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port,
      },
    },
  );

  await app.listen();
  console.log(`🚀 reviews microservice is listening on port ${port}`);
}
reviews();