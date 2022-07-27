const { Schema, model } = require('mongoose');

const registerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: [18, "Required Age is 18, Your age : {VALUE}"],
    max: 40,
  },
  city: {
    type: String,
    required: true,
  },
  blood: {
    type: String,
    required: true,
    enum: {
      values: ["A+", "A-", "AB+", "O+", "O-", "AB-"],
      message: "{VALUE} Blood is not supported",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    min: [10, "Phone number min 11 characters"],
    // max: [11, "Phone number max 11 characters"],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(v);
      },
      message: "Minimum 6 characters, at least one letter and one number",
    },
  },
});

const User = model("User", registerSchema);

module.exports = User;