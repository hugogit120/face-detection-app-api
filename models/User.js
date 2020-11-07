const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        entries: { type: Number, default: 0 },
    },
    {
        timestamps: {
            joined: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
