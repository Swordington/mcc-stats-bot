const mongoose = require('mongoose')

const Schema = mongoose.Schema

const guildSchema = new Schema({
  _id: {
    type: String
  },
  editChannelId: {
    type: String,
    default: ''
  },
  editMsgId: {
    type: String,
    default: ''
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true
  },
  guildType: {
    default: 0, // 0: Normal, 1: Dev
    type: Number,
    required: true
  }
},
{
  timestamps: true
})

const Guild = mongoose.model('Guild', guildSchema)
module.exports = Guild
