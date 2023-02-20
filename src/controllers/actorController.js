import db from '#src/models/index'

const Actor = db.Actor
const Movie = db.Movie

export const get = async (req, res, next) => {
  try {
    const actors = await Actor.findAll({
      include: [{ all: true }],
      order: [['firstName', 'ASC']],
    })
    res
      .status(200)
      .json({ success: true, data: { count: actors.length, actors } })
  } catch (err) {
    const errors = err?.errors?.map((error) => error.message) || []
    res.status(500).json({ success: false, errors })
  }
}

export const create = async (req, res, next) => {
  const actor = await Actor.create(req.body, { include: [Movie] })
  res.status(201).json({ success: true, data: actor })
}
