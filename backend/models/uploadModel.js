import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const uploadSchema = mongoose.Schema(
  {
    filepath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Upload = mongoose.model('Upload', uploadSchema)

export default Upload
