

taylor = User.create(name: "Taylor", birthday: "May 14")
marcia = User.create(name: "Marcia", birthday: "September 18")

Review.create(user_id: taylor.id, body: "fun website")
Review.create(user_id: marcia.id, body: "cool colors")

puts "seeded"