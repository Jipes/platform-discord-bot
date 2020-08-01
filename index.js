const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");

client.config = config;

fs.readdir("./events", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
});

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
// graceful shutdown :)
process.on( "SIGINT", function() {
	console.log("\nShutting down :c")
	client.destroy()
	process.exit()
})

client.login(config.token);