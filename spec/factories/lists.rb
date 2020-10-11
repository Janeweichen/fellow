FactoryBot.define do
  factory :list do
    name { "MyString" }
    user { nil }
    position { 1 }
    has_many { "" }
  end
end
