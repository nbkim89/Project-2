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
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Card;
};
