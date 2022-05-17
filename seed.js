const { db } = require("./backend/db");
const User = require("./backend/db/Users");
const Workout = require("./backend/db/Workouts");
const Exercise = require("./backend/db/Exercises");

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
  },
  {
    name: "Back",
  },
];

const exercises = [
  { name: "squats", sets: 4, reps: 10, workoutId: 1 },
  { name: "push-ups", sets: 3, reps: 15, workoutId: 1 },
  { name: "pull-ups", sets: 2, reps: 12, workoutId: 1 },
  { name: "deadlifts", sets: 4, reps: 10, workoutId: 2 },
  { name: "sit-ups", sets: 4, reps: 10, workoutId: 2 },
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

    await Promise.all(
      exercises.map((exercise) => {
        return Exercise.create(exercise);
      })
    );
    console.log("Seeding Successful!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;

// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
