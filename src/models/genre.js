import { Model } from 'sequelize'

export default function (sequelize, DataTypes) {
  class Genre extends Model {
    static associate(models) {
      models.Genre.belongsToMany(models.Movie, { through: 'GenreMovies' })
    }
  }
  Genre.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Genre',
    }
  )
  return Genre
}
