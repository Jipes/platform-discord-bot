
module.exports = (client, message) => {
    // Ignore all bot messages
    if (message.author.bot) return;
  
    // Ignore all messages what doesnt start with prefix
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Get command data from Discord collection
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args);
  };