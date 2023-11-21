const { faker } = require('@faker-js/faker');

mongoose.connect(process.env.DB_URL);

const User = require('../models/User');
const Hobby = require('../models/Hobby');

require('dotenv').config();

const userData = [];
const hobbyData = [];

let amount = 10;

while (amount--) {
    userData.push({
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    hobbyData.push({
        name: faker.word.noun()
    });
}

async function seedData() {
    await User.deleteMany();
    await Hobby.deleteMany();

    const users = await User.insertMany(userData);
    console.log('Users seeded successfully');

    const hobbies = await Hobby.insertMany(hobbyData);
    console.log('Hobbies seeded successfully');

    const user = users[1]

    user.hobbies = hobbies.map(hobby => hobby._id);

    await user.save();

    console.log('User hobbies saved successfully');
}

seedData();