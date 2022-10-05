let Command = require("../../base/Command");
let { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = new Command({
  data: new SlashCommandBuilder().setName("info"),
  category: "main",
  coolTime: 1500,
  run: async (shiroko, int) => {
    let embed = new EmbedBuilder();
  },
});
