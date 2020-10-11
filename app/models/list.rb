class List < ApplicationRecord
  acts_as_list scope: :user
  belongs_to :user

  has_many :cards, -> { order(positon: :asc)}, dependent: :destroy
  validates :name, presence: true
end
