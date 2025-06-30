import mongoose, { Schema, models, model } from "mongoose";

const ReminderSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    repeat: { type: String, enum: ["none", "daily", "weekly", "monthly"], default: "none" },
    isDone: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Reminder = models.Reminder || model("Reminder", ReminderSchema);

export default Reminder;
