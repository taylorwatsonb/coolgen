class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body

  belongs_to :user
end
