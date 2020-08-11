import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Note = new Schema({
  body: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  bug: { type: ObjectId, ref: "Bug", required: true },
}, { timestamps: true, toJSON: { virtuals: true } })


// Note.virtual("creator",
//   {
//     localField: "creatorEmail",
//     ref: "Profile",
//     foreignField: "email",
//     justOne: true
//   })

  export default Note