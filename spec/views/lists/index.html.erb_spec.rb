require 'rails_helper'

RSpec.describe "lists/index", type: :view do
  before(:each) do
    assign(:lists, [
      List.create!(
        name: "Name",
        user: nil,
        position: 2,
        has_many: ""
      ),
      List.create!(
        name: "Name",
        user: nil,
        position: 2,
        has_many: ""
      )
    ])
  end

  it "renders a list of lists" do
    render
    assert_select "tr>td", text: "Name".to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
    assert_select "tr>td", text: 2.to_s, count: 2
    assert_select "tr>td", text: "".to_s, count: 2
  end
end
