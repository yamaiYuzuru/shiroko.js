let { Schema, model } = require("mongoose");

let GuildSchema = new Schema({
  guildID: { type: String, default: undefined },
  language: { type: String, default: "en_US" },
});

module.exports = model("guild", GuildSchema);
