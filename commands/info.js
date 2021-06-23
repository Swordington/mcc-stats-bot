const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args, level) => {
  const sword = await client.users.fetch('248540313059196928')
  const embed = new MessageEmbed()
    .setTitle('About MCC Stats Bot')
    .setDescription('MCC Stats Bot is a Discord bot to give people an accurate count of total MCC viewership')
    .addField('Language', 'Javascript', true)
    .addField('Developer', sword.tag, true)
    .addField('Support', 'DM the developer', true)
    .setColor(message.guild.me.displayColor)
    .setFooter(`${client.config.name} | ${client.config.description}`)
  if (level >= 8) {
    embed
      .addField('User Cache', client.users.cache.size, true)
      .addField('Server Cache', client.guilds.cache.size, true)
      .addField('Loaded Commands', client.commands.size, true)
  }

  message.channel.send(embed)
}

exports.conf = {
  aliases: [],
  permLevel: 0,
  enabled: true
}

exports.help = {
  name: 'info',
  category: 'System',
  description: 'Get more information about the bot',
  usage: 'info',
  example: 'info'
}
