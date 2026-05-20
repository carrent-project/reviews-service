import { Injectable, HttpException, Inject } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { internalErrorHandler } from "./utils";
import { CreateNewReviewDto } from "@carrent/shared";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { Review } from "@prisma/client";

@Injectable()
export class ReviewsService {
  constructor(
    @Inject("CARS_SERVICE") private carsClient: ClientProxy,
    @Inject("BOOKING_SERVICE") private bookingClient: ClientProxy,
    private prisma: PrismaService,
  ) {}

  async getReviewById(id: string): Promise<Review> {
    try {
      const foundReview = await this.prisma.review.findUnique({ where: { id } })
      if (!foundReview) {
        throw internalErrorHandler(404, `Review with id: ${id} is not found`);
      }
      return foundReview
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error("Unexpected error during getting review by id:", error);
      throw internalErrorHandler(500, "Getting review by id failed");
    }
  }

  async createNewReview(
    dto: CreateNewReviewDto,
    userId: string,
  ): Promise<Review> {
    try {
      const foundCar = await firstValueFrom(
        this.carsClient.send("cars.get-car-by-id", { id: dto.carId }),
      );

      if (!foundCar) {
        throw internalErrorHandler(404, "Car is not found");
      }

      const foundBooking = await firstValueFrom(
        this.bookingClient.send("booking.get-booking-by-id", {
          id: dto.bookingId,
        }),
      );

      if (!foundBooking) {
        throw internalErrorHandler(404, "Booking is not found");
      }

      const newReview = await this.prisma.review.create({
        data: { ...dto, userId },
      });

      return newReview;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error("Unexpected error during creating review:", error);
      throw internalErrorHandler(500, "Create new review failed");
    }
  }

  async removeReviewById(id: string): Promise<string> {
    try {
      const foundReview = await this.prisma.review.findUnique({ where: { id } })
      if (!foundReview) {
        throw internalErrorHandler(404, `Review with id: ${id} is not found`);
      }
      const removable = await this.prisma.review.delete({where: { id }});
      return removable.id
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error("Unexpected error during removing review by id:", error);
      throw internalErrorHandler(500, "Remove review by id failed");
    }
  }
}
