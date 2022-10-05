let { Client, Collection } = require("discord.js");
let fs = require("fs");
let ShirokoGiveawayManager = require("./ShirokoGiveawayManager");
let Command = require("./Command");
class ShirokoClient extends Client {
  constructor() {
    super({
      intents: 2939839,
    });

    /**
     * Collection of Commands for the Yuna Bot
     * @type Collection<String, Command>
     */
    this.command = new Collection();

    /**
     * All modules which Shiroko have.
     */
    this.modules = {
      lang: null,
      version: require("../../package.json").version,
    };

    this.giveawayManager = new ShirokoGiveawayManager();

    /**
     * Shiroko config file.
     */
    this.settings = require("../settings");

    /**
     *  A map for the users who are AFK.
     * @type Set<String>
     */
    this.afkList = new Set();

    /**
     * @type Array<Object>
     */
    this.commandArray = [];
  }

  /**
   *
   * @param {String} token
   */
  login(token) {
    super.login(token);
    return this;
  }

  loadCommands() {
    require("")(this);
    return this;
  }

  loadEvents() {
    fs.readdir("./src/events", (err, files) => {
      if (err) console.error(err);
      files.forEach((file) => {
        let event = new (require(`../events/${file}`))(this);
        super.on(file.split(".")[0], (...args) => event.run(...args));
      });
      console.log(`[EventHandler] Loaded ${files.length} Events.`);
    });
  }
}

module.exports = ShirokoClient;
