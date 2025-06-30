import mongoose, { Schema, models, model } from "mongoose";

const Budgetschema = new Schema(
  {
    food: { type: Number, require: true },
    travel: { type: Number, require: true },
    rent: { type: Number, require: true },
    shopping: { type: Number, require: true },

    other: { type: Number, require: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const budget = models.budget || model("budget", Budgetschema);

export default budget;
