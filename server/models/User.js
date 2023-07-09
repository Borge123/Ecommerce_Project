const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not in a valid format");
        }
      },
    },

    firstName: {
      type: String,
      minLength: 1,
      required: true,
    },

    lastName: {
      type: String,
      minLength: 1,
      required: true,
    },
    password: {
      type: String,
      minLength: 3,
      required: true,
    },

    role: {
      type: String,
      required: true,
      validate(role) {
        const validRoles = ["admin", "user"];
        if (!validRoles.includes(role.toLowerCase())) {
          throw new Error("Not a valid role");
        }
      },
    },
  },

  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
