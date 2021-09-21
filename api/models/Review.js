module.exports = function(sequelize, DataTypes){
  var Review = sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    writtenBy: {
      type: DataTypes.INTEGER
    },
    bookId: {
      type: DataTypes.INTEGER
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
        
        validate: {
            notEmpty: {msg: "How many stars?"}
        }
    }
  }, 
  {
    
    sequelize,
    modelName: 'Review'
  });
  return Review;
}