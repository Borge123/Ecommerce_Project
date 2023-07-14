const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not in a valid format");
        }
      },
    },

    firstName: {
      type: String,
      minLength: 2,
      required: true,
    },

    lastName: {
      type: String,
      minLength: 2,
      required: true,
    },
    password: {
      type: String,
      minLength: 5,
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
UserSchema.post("save", function (doc) {
  console.log("%s has been saved", doc._id);
});
UserSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

UserSchema.virtual("fullName").set(function (name) {
  let str = name.split(" ");

  this.firstName = str[0];
  this.lastName = str[1];
});

module.exports = User = mongoose.model("User", UserSchema);
