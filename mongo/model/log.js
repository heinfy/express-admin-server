/** 日志信息 */
const mongoose = require('../');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  userid: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, required: true },
  params: { type: Object, required: false },
  query: { type: Object, default: {} },
  body: { type: Object, default: {} },
  content: { type: Object, default: {} },
  headers: { type: Object, required: false },
  _startTime: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', LogSchema);
