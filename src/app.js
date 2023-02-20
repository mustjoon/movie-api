import express from 'express'
// eslint-disable-next-line no-unused-vars
import db from '#src/models/index'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import moviesRouter from '#src/routes/movies'

import directorRouter from '#src/routes/directors'
import actorRouter from '#src/routes/actors'
import genreRouter from '#src/routes/genres'

// Toggle these lines to reset the database
/*
await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
await db.sequelize.sync({ force: true })
await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
*/
await db.sequelize.sync()

dotenv.config()
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/movies', moviesRouter)

app.use('/directors', directorRouter)
app.use('/actors', actorRouter)
app.use('/genres', genreRouter)
app.get('/', (req, res) =>
  res.status(200).send({
    success: true,
    message: 'VGhpcyBhcHAgaXMgYnVpbHQgb24gRXhwcmVzcwo=',
  })
)
app.use('/*', (req, res) =>
  res.status(404).send({ success: false, error: 'Route not found' })
)

export default app
