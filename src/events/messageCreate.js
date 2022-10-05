let { Message, EmbedBuilder, ChannelType } = require("discord.js");
const ShirokoClient = require("../base/ShirokoClient");
const ShirokoSchema = require("../models/ShirokoSchema");
let request = require("request-promise");
let fs = require("fs");

function download(uri) {
  return request
    .get(uri)
    .on("error", console.error)
    .pipe(fs.createWriteStream("./image.png"));
}

/**
 *
 * @param {ShirokoClient} shiroko
 * @param {Message} msg
 */
module.exports = async (shiroko, msg) => {
  if (!msg.guild || msg.author.bot) return;

  let shirokoDB = await ShirokoSchema.findOne({ clientID: shiroko.user.id });

  if (msg.channel.type !== ChannelType.GuildText || !msg.channel.isTextBased())
    return;
  shiroko.guilds.cache.forEach((g) => {
    if (g === msg.guild) {
      let chat = g.channels.cache.find((ch) =>
        ch.name.includes("shiroko-chat")
      );
      if (!chat) return;

      let bannedEmbed = new EmbedBuilder()
        .setTitle("Banned")
        .setAuthor("Shiroko-Global Chat-SYSTEM")
        .setDescription(
          "Sorry, but you are banned from the global-chat. Join the [Shiroko Discord](https://discord.gg/) and ask if you can be unbanned."
        );
      if (shirokoDB.chatBannedUsers.includes(msg.author.id))
        return msg.channel.send({ embeds: [bannedEmbed] });
      let attachment = msg.attachments.first().url() || null;
    }
  });
};
