import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Branch", BranchSchema);