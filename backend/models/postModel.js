const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Titulli është i detyrueshëm'],
    },
    content: {
      type: String,
      required: [true, 'Përmbajtja është e detyrueshme'],
    },
    category: {
      type: String,
      default: 'Të përgjithshme',
    },
    image: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
