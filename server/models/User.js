const mongoose = require("mongoose");

    const UserSchema = mongoose.Schema(
      
      {
        email: {
          type: String,
          required: true,
          unique: true
        },

        firstName: {
          type: String,
          required: true
        },
        
        lastName: {
          type: String,
          required: true
        },
        password: {
          type: String,
          required: true
        }
        
      },

      {timestamps: true}
      
    );
  
    
  

  module.exports = User = mongoose.model("User", UserSchema)