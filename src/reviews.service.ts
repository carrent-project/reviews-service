import { Injectable, HttpException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { internalErrorHandler } from "./utils";

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async sayHi() {
    try {
      return 'Hi, im first method for test'
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error("Unexpected error during saing hi:", error);
      throw internalErrorHandler(500, "Saing hi failed");
    }
  }
}
