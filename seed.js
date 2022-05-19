const { db } = require("./backend/db");
const User = require("./backend/db/Users");
const Workout = require("./backend/db/Workouts");
const Exercise = require("./backend/db/Exercises");
const Diet = require("./backend/db/Diets");
const Meal = require("./backend/db/Meals");

const users = [
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

const userWithWorkouts = {
  firstName: "John",
  lastName: "Doe",
  password: "hello123",
  email: "johndoe@fitness.com",
  image:
    "https://www.cheatsheet.com/wp-content/uploads/2019/04/Tom-Holland-2-939x1024.jpg",
};

const workouts = [
  {
    name: "Legs",
  },
  {
    name: "Back",
  },
];

const usersWorkout = { name: "johns leg day" };

const exercises = [
  { name: "squats", sets: 4, reps: 10, workoutId: 1 },
  { name: "push-ups", sets: 3, reps: 15, workoutId: 1 },
  { name: "pull-ups", sets: 2, reps: 12, workoutId: 1 },
  { name: "deadlifts", sets: 4, reps: 10, workoutId: 2 },
  { name: "sit-ups", sets: 4, reps: 10, workoutId: 2 },
];

const userWithDiets = {
  firstName: "Miguel",
  lastName: "Diaz",
  password: "cobrakai123",
  email: "migueldiaz@fitness.com",
  image:
    "https://yankeetv.com/wiki/wp-content/uploads/2019/06/Xolo-Mariduena-e1610789028308.jpg",
};

const usersDiet = { name: "Miguel's Diet Plan" };

const diets = [
  {
    name: "The Rock's Iron Nutrition",
  },
  {
    name: "Chris Hemsworth's Daily Meals",
  },
  {
    name: "John Doe's Unique Recipes",
  },
  {
    name: "The Titanium Gut Plan",
  },
  {
    name: "Vegan Dishes You'll Love",
  },
  {
    name: "The Krusty Krab's Secret Formulas",
  },
  {
    name: "Delicious Keto Recipes",
  },
  {
    name: "Healthy Desserts",
  },
];

const meals = [
  {
    mealType: "Breakfast",
    name: "Sweet Greek Yogurt",
    ingredients:
      "1/2 Cup Greek Yogurt, 2 Tbsp Strawberries, 2 Tbsp Blueberries",
    prepTime: "5 Minutes",
    calories: 150,
    imageUrl:
      "https://www.littlebroken.com/wp-content/uploads/2016/03/Vanilla-Greek-Yogurt-Chia-Seed-Pudding-3.jpg",
    dietId: 1,
  },
  {
    mealType: "Breakfast",
    name: "Whole Wheat Waffles",
    ingredients:
      "2 Whole Wheat Waffles, 2 Tbsp Strawberries, 2 Tbsp Blueberries, 1 Tbsp Butter, 1 Banana",
    instructions:
      "Put waffles in the toaster, place fruits on the waffles, dazzle waffles with some maple syrup",
    imageUrl:
      "https://inquiringchef.com/wp-content/uploads/2019/08/Whole-Wheat-Waffles_01.jpg",
    calories: 250,
    prepTime: "10 Minutes",
  },
  {
    mealType: "Lunch",
    name: "Spicy Salmon",
    ingredients:
      "4-6 oz Salmon, 1 Cup Asparagus, 2 Tbsp Butter, 2 tsp red pepper flakes",
    instructions:
      "preheat oven to 425 degrees, coat salmon with butter, cook for 20 minutes",
    imageUrl:
      "https://www.metabolicliving.com/blog/wp-content/uploads/2020/04/Garlic-Butter-Salmon-with-Lemon-Asparagus-Skillet.jpg",
    calories: 640,
    prepTime: "30 Minutes",
  },
  {
    mealType: "Lunch",
    name: "Organic Lamb Burger",
    ingredients:
      "1 Pound Ground Lamb, 2 Burger Buns, 2 Tsp Dried Oregano, 1/4 Tsp Salt",
    instructions:
      "Combine the ground lamb with oregano, sprinkle salt on the patty, grill on medium-high heat, put cooked burger in the buns",
    imageUrl:
      "https://data.thefeedfeed.com/static/2020/05/11/15892448525eb9f3b40230b.jpg",
    calories: 530,
    prepTime: "25 Minutes",
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

    const johnDoe = await User.create(userWithWorkouts);
    const johnsWorkout = await Workout.create(usersWorkout);

    await johnsWorkout.setAthlete(johnDoe);

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

    const miguelDiaz = await User.create(userWithDiets);
    const miguelsDiet = await Diet.create(usersDiet);
    await miguelsDiet.setUser(miguelDiaz);

    await Promise.all(
      diets.map((diet) => {
        return Diet.create(diet);
      })
    );

    await Promise.all(
      meals.map((meal) => {
        return Meal.create(meal);
      })
    );
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
      console.log("Seeding Successful!");
      db.close();
    })
    .catch((err) => {
      console.error("Oh noes! Something went wrong!");
      console.error(err);
      db.close();
    });
}
