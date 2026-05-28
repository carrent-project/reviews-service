import { Controller } from "@nestjs/common";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { ReviewsService } from "./reviews.service";
import { CreateNewReviewDto } from "@carrent/shared";

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @MessagePattern("reviews.get-review-by-id")
  async getReviewById(@Payload() data: { id: string }) {
    try {
      return await this.reviewsService.getReviewById(data.id);
    } catch (error: any) {
      console.log("[Reviews Microservice] getReviewById error:", error);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || "Internal server error",
      });
    }
  }

  @MessagePattern("reviews.get-review-by-booking-id")
  async getReviewByBookingId(@Payload() data: { bookingId: string }) {
    try {
      return await this.reviewsService.getReviewByBookingId(data.bookingId);
    } catch (error: any) {
      console.log("[Reviews Microservice] getReviewByBookingId error:", error);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || "Internal server error",
      });
    }
  }

  @MessagePattern("reviews.get-car-reviews-by-car-id")
  async getCarReviewsByCarId(@Payload() data: { carId: string }) {
    try {
      return await this.reviewsService.getCarReviewsByCarId(data.carId)
    } catch (error: any) {
      console.log("[Reviews Microservice] getCarReviewsByCarId error:", error);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || "Internal server error",
      });
    }
  }

  @MessagePattern("reviews.get-cars-average-rating")
  async getCarsAverageRating(@Payload() data: { carIds: string[] }) {
    try {
      return await this.reviewsService.getCarsAverageRating(data.carIds)
    } catch (error: any) {
      console.log("[Reviews Microservice] getCarsAverageRating error:", error);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || "Internal server error",
      });
    }
  }

  @MessagePattern("reviews.get-car-reviews-by-id")
  async getCarReviewsById(@Payload() data: { carId: string, page: number, limit: number }) {
    try {
      return await this.reviewsService.getCarReviewsById(data.carId, data.page, data.limit)
    } catch (error: any) {
      console.log("[Reviews Microservice] getCarReviewsById error:", error);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || "Internal server error",
      });   
    }
  }

  @MessagePattern("reviews.create-review")
  async createNewReview(
    @Payload() data: { dto: CreateNewReviewDto; userId: string },
  ) {
    try {
      return await this.reviewsService.createNewReview(data.dto, data.userId);
    } catch (error: any) {
      console.log("[Reviews Microservice] createNewReview error:", error);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || "Internal server error",
      });
    }
  }

  @MessagePattern("reviews.remove-review-by-id")
  async removeReviewById(@Payload() data: { id: string }) {
    try {
      return await this.reviewsService.removeReviewById(data.id)
    } catch (error: any) {
      console.log("[Reviews Microservice] removeReviewById error:", error);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || "Internal server error",
      });
    }
  }

  @MessagePattern("reviews.remove-review-by-booking-id")
  async removeReviewByBookingId(@Payload() data: { bookingId: string }) {
    try {
      return await this.reviewsService.removeReviewByBookingId(data.bookingId)
    } catch (error: any) {
      console.log("[Reviews Microservice] removeReviewById error:", error);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || "Internal server error",
      });
    }
  }

  @MessagePattern("reviews.approve-review")
  async approveReview(@Payload() data: { id: string, isApproved: boolean }) {
    try {
      return await this.reviewsService.approveReview(data.id, data.isApproved)
    } catch (error: any) {
      console.log("[Reviews Microservice] approveReview error:", error);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || "Internal server error",
      });
    }
  }
}
