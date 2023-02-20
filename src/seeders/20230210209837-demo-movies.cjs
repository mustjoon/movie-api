const sampleData = require('../../sample.cjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    const db = await (await import('../models/index.js')).default

    const { Genre, Actor, Director, Movie } = db

    for (const movie of sampleData) {
      const { name, year, ageLimit, rating, synopsis, director, genres } = movie

      const dbMovie = await Movie.create({
        name,
        year,
        ageLimit,
        rating,
        synopsis,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      for (const genre of genres) {
        const dbGenre = await Genre.findOrCreate({ where: { name: genre } })
        await dbMovie.addGenre(dbGenre[0])
      }

      for (const actor of movie.actors) {
        const dbActor = await Actor.findOrCreate({
          where: { firstName: actor.firstName, lastName: actor.lastName },
        })
        await dbMovie.addActor(dbActor[0])
      }

      const dbDirector = await Director.findOrCreate({
        where: { firstName: director.firstName, lastName: director.lastName },
      })

      await dbMovie.setDirector(dbDirector[0])
    }
  },

  async down(queryInterface, Sequelize) {},
}
