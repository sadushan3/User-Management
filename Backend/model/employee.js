import mongoose from "mongoose";

const EmpSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => /\S+@\S+\.\S+/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 18,
    },
    birthday: {
      type: Date,
      required: [true, "Birthday is required"],
    },
    maritalStatus: {
      type: String,
      required: [true, "Marital status is required"],
      enum: ["Married", "Single"], // Limited to "Married" or "Single"
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
    workType: {
      type: String,
      required: [true, "Work type is required"],
      enum: ["Part Time", "Full Time"], // Limited to "Part Time" or "Full Time"
    },
    emergencyNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
      validate: {
        validator: (v) => /^[0-9]{10}$/.test(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const EMP = mongoose.model("Employee", EmpSchema);

export default EMP;
