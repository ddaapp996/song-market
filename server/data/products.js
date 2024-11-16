const { faker } = require("@faker-js/faker");

const fakeProducts = (n = 200) => {
  return Array.from({ length: n }, () => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price({ min: 10, max: 100000, dec: 0 }),
    quantity: faker.number.int({ min: 1, max: 1000 }),
    description: faker.commerce.productDescription(),
    image: faker.image.url({ width: 300, height: 300, }),
  }));
};

module.exports = fakeProducts;
