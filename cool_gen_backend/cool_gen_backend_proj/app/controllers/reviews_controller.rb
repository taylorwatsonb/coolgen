class ReviewsController < ApplicationController

    def index 
        @reviews = Review.all
        render json: @reviews
    end
    def show
        @review = Review.find(params[:id])
        render json: @review
    end
    
    def create

        @review = Review.new(review_params)
        if @review.save
            render json: @review
        else
            render json: {errors: @review.errors.full_messages}
        end 
    end
     
   def update 
    @review = Review.find(params[:id])
    @review.update(update_review_params)
    render json: @review
   end 

   def destroy
    @review = Review.find(params[:id])
    @review.destroy 
    render json: {message: "Deleted in the backend"}
   end 
    private

    def review_params
        params.permit(:user_id, :body)
    end
   
    def update_review_params 
        params.permit(:body)
    end
end
