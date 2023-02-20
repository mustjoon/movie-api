import { Model } from 'sequelize'

export default function (sequelize, DataTypes) {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsToMany(models.Actor, {
        through: 'ActorMovies',
        as: 'actors',
      })

      Movie.belongsTo(models.Director, {
        foreignKey: 'DirectorId',
        as: 'director',
      })

      Movie.belongsToMany(models.Genre, {
        through: 'GenreMovies',
        as: 'genres',
      })
    }
  }
  Movie.init(
    {
      DirectorId: DataTypes.INTEGER,
      name: { type: DataTypes.STRING, allowNull: false },
      ageLimit: { type: DataTypes.INTEGER, allowNull: false, min: 0, max: 18 },
      year: { type: DataTypes.INTEGER, allowNull: false, min: 1900, max: 2077 },
      rating: { type: DataTypes.INTEGER, allowNull: false, min: 0, max: 5 },
      synopsis: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Movie',
    }
  )
  return Movie
}
