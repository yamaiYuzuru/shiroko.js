let { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const ShirokoClient = require("./ShirokoClient");

let commandOptions = {
  data: SlashCommandBuilder,
  category: "",
  /**
   * @param {ShirokoClient} shiroko
   * @param {CommandInteraction} int
   */
  run: (shiroko, int) => Promise.any,
  /**
   * @type Set<String>
   */
  cooldown: new Set(),
  /**@type Number */
  coolTime,
  /**
   * @param {String} userID
   */
  startCooldown: (userID) => {
    commandOptions.cooldown.add(userID);
    setTimeout(() => {
      commandOptions.cooldown.delete(userID);
    }, commandOptions.coolTime);
  },
};

class Command {
  /**
   * @param {commandOptions} options
   */
  constructor(options) {
    this.data = options.data;
    this.run = options.run;
    this.cooldown = options.cooldown;
    this.coolTime = options.coolTime;
    this.startCooldown = options.startCooldown;
    this.category = options.category;
  }

  data;
  run;
  coolTime;
  cooldown;
  startCooldown;
  category;
}

module.exports = Command;
