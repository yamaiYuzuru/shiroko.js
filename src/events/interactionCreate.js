let { Interaction, EmbedBuilder, ChannelType } = require("discord.js");
let ShirokoClient = require("../base/ShirokoClient");

/**
 * @param {ShirokoClient} shiroko
 * @param {Interaction} int
 */
module.exports = async (shiroko, int) => {
  if (int.isCommand()) {
    let cmd = shiroko.command.get(int.commandName);
    if (!cmd) return;
    let channel = int.channel;
    if (!channel.isTextBased()) return;
    if (channel.type !== ChannelType.GuildText) return;
    if (cmd.category === "nsfw" && !channel.nsfw)
      return channel.sendTyping().then(() => {
        int.reply({
          embeds: [new EmbedBuilder().setDescription()],
          ephemeral: true,
        });
      });
    if (
      cmd.category === "admin" &&
      !shiroko.settings.admins.includes(int.user.id)
    )
      return channel.sendTyping().then(() => {
        int.reply({
          embeds: [new EmbedBuilder().setDescription()],
          ephemeral: true,
        });
      });
  }
};
