import { Model } from 'sequelize'

export default function (sequelize, DataTypes) {
  class Director extends Model {
    static associate(models) {
      Director.hasMany(models.Movie, {
        as: 'movies',
      })
    }
  }
  Director.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Director',
    }
  )
  return Director
}
