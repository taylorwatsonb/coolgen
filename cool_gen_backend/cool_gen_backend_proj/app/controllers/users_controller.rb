class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users, include: [:name, :birthday]
        
    end

def show
    @user = User.find(params[:id])
    render json: @user, include: [:name, :birthday]
   
end

  def new
    @user = User.new
    render json: @user
   end

def create

        @user = User.new(user_params)
        if @user.save
            render json: @user
        else
            render json: {errors: @user.errors.full_messages}
        end 
    end

def destroy
    @user = User.find(params[:id])
     @user.destroy
     render json: {message: "Deleted in the backend"}
end
private 



    
def user_params
    params.permit(:name, :birthday) 
end

end


