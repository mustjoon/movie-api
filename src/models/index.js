import { Sequelize } from 'sequelize'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import data from '../config/config.js'

function fileDirName(meta) {
  const __filename = fileURLToPath(meta.url)

  const __dirname = dirname(__filename)

  return { __dirname, __filename }
}

const { __dirname, __filename } = fileDirName(import.meta)
const config = data[process.env.NODE_ENV || 'development']

const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
)

const models = path.join(__dirname)

const modelFiles = fs.readdirSync(models).filter(function (file) {
  return (
    file.indexOf('.') !== 0 &&
    !__filename.includes(file) &&
    file.slice(-3) === '.js'
  )
})

for (const file of modelFiles) {
  const m = await import(path.join(models, file))
  const fn = m.default
  const model = fn(sequelize, Sequelize.DataTypes)
  db[model.name] = model
}

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.Sequelize = Sequelize
db.sequelize = sequelize

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default db
