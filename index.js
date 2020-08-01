const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");

client.config = config;

// Event Handler
fs.readdir("./events", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
});

/Command Handler
client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Loading command: ${commandName}`);
      client.commands.set(commandName, props);
    });
});
// Shut Down (CTRL + C)
process.on( "SIGINT", function() {
	console.log("\nShutting down")
	client.destroy()
	process.exit()
})

client.login(config.token);
