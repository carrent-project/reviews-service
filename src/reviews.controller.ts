import { Controller } from "@nestjs/common";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { ReviewsService } from "./reviews.service";

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
}
