exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  // Make sure that there's an actual command to reload
  if (!args || args.length < 1) return message.reply("is stupid and didn't provide a command to reload.")
  // Don't try to reload reload ffs (this is 100% because one of my team members took down the bot doing that)
  if (args[0] === 'reload') return message.reply('you deserve the worst that hell has to offer.')
  // Get the command, if not by name then by aliase
  const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))
  // Unload the command and hope there's no response
  let response = await client.unloadCommand(args[0])
  if (response) return message.channel.send(`Error Unloading: \`${response}\``)

  // load the command and hope there's no response
  response = client.loadCommand(command.help.name)
  if (response) return message.channel.send(`Error Loading: \`${response}\``)

  // Woo hoo, it's done.
  message.channel.send(`The command \`${command.help.name}\` has been reloaded`)
}

exports.conf = {
  aliases: ['re'],
  permLevel: 10,
  enabled: true,
  requires: ['SEND_MESSAGES']
}

exports.help = {
  name: 'reload',
  category: 'System',
  description: 'Reloads a command.',
  usage: 'reload [command]'
}
