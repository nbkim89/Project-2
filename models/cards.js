module.exports = function(sequelize, DataTypes) {
  // eslint-disable-next-line no-var
  var Card = sequelize.define("Card", {
    term: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    definition: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    topic: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Card;
};
