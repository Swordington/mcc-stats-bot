const { MessageEmbed, Client, Message } = require('discord.js') // eslint-disable-line no-unused-vars

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  // Prevent execution by bots
  if (message.author.bot) return

  // Ignore DMs for now
  if (!message.guild) return

  // checks for messages without the prefix.
  if (!message.content.startsWith(client.config.prefix)) return

  // Create arguments and command from message.
  const args = message.content.slice(client.settings.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  // Fetches the user.
  if (message.guild && !message.member) await message.guild.fetchMember(message.author)

  // Get the level.
  const level = client.permlevel(message)

  // Retrieve command
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

  if (!cmd) return // if command does now exist do nothing

  if (level < client.levelCache[cmd.conf.permLevel]) return // If a user tries to do something they aren't allowed to then don't let them
  message.author.permLevel = level

  if (cmd.conf.enabled !== true) return

  const missingPerms = await message.channel.permissionsFor(message.guild.me).missing(cmd.conf.requires)

  if (missingPerms.length > 0) {
    const failPermsEmbed = new MessageEmbed()
      .setTitle('Missing permissions')
      .setDescription(`I do not have adequate permissions to run the command \`${cmd.help.name}\`.\nPlease grant me: \`${missingPerms.join(', ')}\``)
      .setColor('RED')
      .setFooter(`${client.config.name} | Permissions Checks | Triggered in ${message.guild.name}`)
      .setTimestamp()
    message.react('‼')
    if (level >= 5) message.member.createDM().then(c => c.send(failPermsEmbed))
    return
  }

  message.flags = []
  while (args[0] && args[0][0] === '-') {
    message.flags.push(args.shift().slice(1))
  }

  client.logger.cmd(`(${client.config.permLevels.find(l => l.level === level).level}) | ${message.author.username} [${message.author.id}] ran command ${cmd.help.name}`)
  cmd.run(client, message, args, level)
}
