import { Controller } from "@nestjs/common";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { ReviewsService } from "./reviews.service";
import { CreateNewReviewDto } from "@carrent/shared";

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @MessagePattern("reviews.say-hi")
  async sayHi() {
    try {
      return await this.reviewsService.sayHi();
    } catch (error: any) {
      console.log("[Reviews Microservice] sayHi error:", error);
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
    } catch (error) {
      console.log("[Reviews Microservice] removeReviewById error:", error);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || "Internal server error",
      });
    }
  }
}
