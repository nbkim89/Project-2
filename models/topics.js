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

  Topic.associate = function(models) {
    Topic.hasMany(models.Card, {
      onDelete: "cascade"
    });
  };
  return Topic;
};
