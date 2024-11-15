const { faker } = require("@faker-js/faker");
const links = require("./links");

const fakeSongsData = (n = 1000) => {
  return Array.from({ length: n }, () => ({
    title: faker.music.songName(),
    artist: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.music.artist()
    ).join(", "),
    album: faker.music.album(),
    genre: faker.music.genre(),
    url: links[faker.number.int({ min: 0, max: 10 })],
    coverImage: faker.image.url({ width: 300, height: 300 }),
    downloads: faker.number.int({ min: 0, max: 1000000 }),
  }));
};

module.exports = fakeSongsData;
