module.exports = function(sequelize, DataTypes){
  var Review = sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    writtenBy: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false
    },
    bookId: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      
      validate: {
        notEmpty: {msg: "Title is required."}
      }
    },
    body: {
        type: DataTypes.TEXT,
        
        validate: {
            notEmpty: {msg: "You need to write a review."}
        }
    },
    stars: {
        type: DataTypes.INTEGER,
        
        // validate: {
        //     notEmpty: {msg: "How many stars?"}
        // }
    }
  }, 
  {
    
    sequelize,
    modelName: 'Review'
  });
  return Review;
}