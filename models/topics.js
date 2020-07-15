module.exports = function(sequelize, DataTypes) {
  // eslint-disable-next-line no-var
  var Topic = sequelize.define("Topic", {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Topic;
};
