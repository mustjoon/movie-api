import db from '#src/models/index'

const Movie = db.Movie
const Director = db.Director
const Actor = db.Actor
const Genre = db.Genre

export const get = async (req, res, next) => {
  try {
    const where = {}
    const { q } = req.query
    if (q) {
      where.name = {
        [db.Sequelize.Op.substring]: q,
      }
    }

    const movies = await Movie.findAll({
      where,
      include: [
        {
          model: Actor,
          as: 'actors',
          through: {
            attributes: [],
          },
        },
        {
          model: Director,
          as: 'director',
        },
        {
          model: Genre,
          as: 'genres',
          through: {
            attributes: [],
          },
        },
      ],
    })

    res
      .status(200)
      .json({ success: true, data: { count: movies.length, movies } })
  } catch (err) {
    const errors = err?.errors?.map((error) => error.message) || []
    res.status(500).json({ success: false, errors })
  }
}

export const getSingle = async (req, res, next) => {
  const { id } = req.params
  try {
    const movie = await Movie.findByPk(id, {
      include: [
        {
          model: Actor,
          as: 'actors',
          through: {
            attributes: [],
          },
        },
        {
          model: Director,
          as: 'director',
        },
        {
          model: Genre,
          as: 'genres',
          through: {
            attributes: [],
          },
        },
      ],
    })

    if (!movie) {
      return res
        .status(404)
        .json({ success: false, errors: ['Movie not found'] })
    }

    res.status(200).json({ success: true, data: movie })
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, errors: ['Something went wrong!'] })
  }
}

export const create = async (req, res, next) => {
  try {
    const data = req.body
    const actorIds = [...(data.actorIds || [])]
    const genreIds = [...(data.genreIds || [])]

    delete data.actorIds
    delete data.genreIds
    delete data.director

    const movie = await Movie.create(req.body, { include: [{ all: true }] })
    await movie.setActors(actorIds)
    await movie.setGenres(genreIds)
    await movie.setDirector(data.DirectorId)

    res.status(201).json({ success: true, data: movie })
  } catch (err) {
    const errors = err?.errors?.map((error) => error.message) || []
    res.status(500).json({ success: false, errors })
  }
}
