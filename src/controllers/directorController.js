import db from '#src/models/index'

const Director = db.Director
const Movie = db.Movie

export const get = async (req, res, next) => {
  try {
    const directors = await Director.findAll({
      include: [{ all: true }],
      order: [['firstName', 'ASC']],
    })
    res
      .status(200)
      .json({ success: true, data: { count: directors.length, directors } })
  } catch (err) {
    const errors = err?.errors?.map((error) => error.message) || []
    res.status(500).json({ success: false, errors })
  }
}

export const create = async (req, res, next) => {
  const director = await Director.create(req.body, { include: [Movie] })
  res.status(201).json({ success: true, data: director })
}
