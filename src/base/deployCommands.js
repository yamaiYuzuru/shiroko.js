const fs = require("fs");

const { Routes } = require("discord-api-types/v10");
const { REST } = require("@discordjs/rest");

const ShirokoClient = require("./ShirokoClient");

const TOKEN = process.env.TOKEN;

const rest = new REST({ version: "10" }).setToken(TOKEN);

/**
 *
 * @param {ShirokoClient} client
 */
module.exports = (client) => {
  const slashCommands = [];
  let slashCommand;
  fs.readdirSync("./src/command/").forEach(async (dir) => {
    const files = fs
      .readdirSync(`./src/command/${dir}/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      slashCommand = require(`../command/${dir}/${file}`);
      slashCommands.push(slashCommand.data);
      //slashCommand.data.category = dir;
      client.slashCommands.set(slashCommand.data.name, slashCommand);
    }
    console.log(
      `[CommandHandler] The category ${dir} was loaded with ${files.length} commands.`
    );
  });

  (async () => {
    try {
      await rest.put(Routes.applicationGuildCommands("", ""), {
        body: slashCommands,
      });
      console.log("Slash Commands • Registered");
    } catch (error) {
      console.log(error);
    }
  })();
};
