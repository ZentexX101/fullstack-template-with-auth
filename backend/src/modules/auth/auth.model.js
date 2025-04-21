const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    googleId: { type: String, default: null, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    country: { type: String, default: null },
    phone: { type: String, default: null },
    subscriptions: [
      {
        planId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SubscriptionPlan",
          required: true,
        },
        status: {
          type: String,
          enum: ["active", "expired"],
          default: "expired",
        },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        renewalCount: { type: Number, default: 0 },
      },
    ],

    currentSubscription: {
      planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubscriptionPlan",
        default: null,
      },
      status: { type: String, enum: ["active", "expired"], default: "expired" },
      startDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
