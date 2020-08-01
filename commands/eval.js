const { MessageEmbed } = require("discord.js");
exports.run = (client, message, args) => {
    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }
        if(message.author.id !== client.config.ownerid) return;
        try {
            let evalStart = process.hrtime()
            let evalDiff;
            var code = args.join(" ");
            var evaled = eval(code);
            evalDiff = process.hrtime(evalStart)

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            const evalEmbed = new MessageEmbed()
                .setColor('#00d166')
                .setTitle('Success!')
                .addField('Output:', `\`\`\`JavaScript\n${evaled}\n\`\`\``)
                .addField('Evaled in:', `${evalDiff[0] > 0 ? `${evalDiff[0]}s` : ''}${evalDiff[1] / 1000000}ms.`)
                .setTimestamp()
            message.channel.send(evalEmbed)
//           message.channel.send(`\Success :D | Evaled in ${evalDiff[0] > 0 ? `${evalDiff[0]}s` : ''}${evalDiff[1] / 1000000}ms.\ \`\`\`JavaScript\n${evaled}\n\`\`\``);
        } catch(err) {
            const evalFailEmbed = new MessageEmbed()
                .setColor('#f93a2f')
                .setTitle('Error :c')
                .addField('Output:', `\`\`\`JavaScript\n${clean(err)}\n\`\`\``)
                .setTimestamp()
            message.channel.send(evalFailEmbed)
//            message.channel.send(`\ERROR\ \`\`\`JavaScript\n${clean(err)}\n\`\`\``);
        }
}
