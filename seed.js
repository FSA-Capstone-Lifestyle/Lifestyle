const { db } = require("./backend/db");
const User = require("./backend/db/Users");
const Workout = require("./backend/db/Workouts");

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    password: "hello123",
    email: "johndoe@fitness.com",
  },
  {
    firstName: "Tom",
    lastName: "Holland",
    password: "tonystark123",
    email: "totallynotspiderman@fitness.com",
    image:
      "https://www.cheatsheet.com/wp-content/uploads/2019/04/Tom-Holland-2-939x1024.jpg",
  },
  {
    firstName: "Michael",
    lastName: "Jackson",
    password: "thriller123",
    email: "mj@fitness.com",
    image:
      "https://www.allthetests.com/quiz33/picture/pic_1485780139_1.jpg?1510041252",
  },
];

const workouts = [
  {
    name: "Legs",
    exercises: [
      { name: "squats", sets: 4, reps: 10, videoUrl: "e" },
      { name: "push-ups", sets: 3, reps: 15, videoUrl: "e" },
      { name: "pull-ups", sets: 2, reps: 12, videoUrl: "e" },
    ],
  },
  {
    name: "Back",
    exercises: [
      { name: "deadlifts", sets: 4, reps: 10, videoUrl: "e" },
      { name: "sit-ups", sets: 4, reps: 10, videoUrl: "e" },
    ],
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    await Promise.all(
      workouts.map((workout) => {
        return Workout.create(workout);
      })
    );
    console.log("Seeding Successful!");
  } catch (err) {
    console.log(err);
  }
};
seed();

module.exports = seed;
