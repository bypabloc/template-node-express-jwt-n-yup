const faker = require('faker');

const users = [...Array(100)].map((user) => (
    {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
        phone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }
))

module.exports = users;