import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  hash: {type: String,require: true},
  userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User',require: true}
})

const userLinks = mongoose.model('link',linkSchema);
export default userLinks;
