import mongoose from "mongoose"
let Schema = mongoose.Schema

const Bug = new Schema({
    closed: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    title: { type: String, required: true },
    openedDate: { type: String },
    closedDate: { type: String },
    creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

// Bug.virtual("creator",
//     {
//         localField: "creatorEmail",
//         ref: "Profile",
//         foreignField: "email",
//         justOne: true
//     })

export default Bug