let { Schema, model } = require("mongoose");

let ShirokoSchema = new Schema({
  clientID: { type: String, required: true },
  usedCommands: { type: Number },
  botBannedUsers: { type: [String], default: undefined },
  sendedMails: { type: Number, default: 0 },
  chatBannedUsers: { type: [String], default: undefined },
});

module.exports = model("shiroko", ShirokoSchema, "shiroko");
