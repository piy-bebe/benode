const { Schema, model } = require('mongoose')

orderSchema = new Schema({
  courses: [
    {
      courseId: {
        type: Object,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = model('Orders', orderSchema)
