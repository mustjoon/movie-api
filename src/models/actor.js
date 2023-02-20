import { Model } from "sequelize";

export default function (sequelize, DataTypes) {
  class Actor extends Model {
    static associate(models) {
      models.Actor.belongsToMany(models.Movie, { through: 'ActorMovies' });
    }
  }
  Actor.init({
    firstName: {type:DataTypes.STRING, allowNull: false},
    lastName: {type:DataTypes.STRING, allowNull: false},
  }, {
    sequelize,
    modelName: 'Actor',
  });
  return Actor;
};
