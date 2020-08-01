// Simple reload command
exports.run = (client, message, args) => {
    if(message.author.id !== client.config.ownerid) return;
      if(!args || args.length < 1) return message.reply("Provide a command name to reload.");
      const commandName = args[0];
      // Checks if command exists and is valid
      if(!client.commands.has(commandName)) {
        return message.channel.send("That command does not exist");
      }
      delete require.cache[require.resolve(`./${commandName}.js`)];
      // Deletes and reloads the command from the Discord Collections
      client.commands.delete(commandName);
      const props = require(`./${commandName}.js`);
      client.commands.set(commandName, props);
      message.channel.send(`The command **${commandName}** has been reloaded`);
    };