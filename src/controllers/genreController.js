import db from '#src/models/index'

const Genre = db.Genre
const Movie = db.Movie

export const get = async (req, res, next) => {
  try {
    const genres = await Genre.findAll({ order: [['name', 'ASC']] })
    res.status(200).json({
      success: true,
      data: { count: genres.length, genres },
    })
  } catch (err) {
    const errors = err?.errors?.map((error) => error.message) || []
    res.status(500).json({ success: false, errors })
  }
}

export const create = async (req, res, next) => {
  const genre = await Genre.create(req.body, { include: [Movie] })
  res.status(201).json({ success: true, data: genre })
}
