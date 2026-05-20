import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "CARS_SERVICE",
        transport: Transport.TCP,
        options: { port: 5003 },
      },
    ]),
    ClientsModule.register([
      {
        name: "BOOKING_SERVICE",
        transport: Transport.TCP,
        options: { port: 5004 },
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService],
})
export class ReviewsModule {}
