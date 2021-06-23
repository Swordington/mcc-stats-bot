const { MessageEmbed } = require('discord.js')
const GuildModel = require('../models/guild')

exports.run = async (client, message, args, level) => {
  const embed = new MessageEmbed()
    .setTitle('MCC COUNTER EMBED!')
    .setDescription('This message will update when MCC starts')
    .setColor(message.guild.me.displayColor)
    .setTimestamp()
    .setFooter('MCC Stats Bot')
  const statusMsg = await message.channel.send('<a:loadingspinner:836247075397828678> Gimme a sec')

  const mongoGuild = await GuildModel.findById(message.guild.id)
  if (mongoGuild === null) {
    const errEmbed = new MessageEmbed()
      .setTitle('⚠ A MAJOR ERROR OCCURRED')
      .setDescription('Please contact Sword#0042 and provide the information below in order to resolve this.')
      .addField('Type', 'mongoGuild null', true)
      .addField('ID', message.guild.id, true)
      .setFooter('MCC Stats Bot')
      .setColor('RED')
      .setTimestamp()
    statusMsg.edit('', errEmbed)
    return
  }
  mongoGuild.editChannelId = message.channel.id
  mongoGuild.editMsgId = statusMsg.id
  mongoGuild.save()

  await statusMsg.edit('', embed)
  client.uwuImAnTestVar = statusMsg.id
}

exports.conf = {
  aliases: ['stb'],
  permLevel: 5,
  enabled: true
}

exports.help = {
  name: 'setupbot',
  category: 'System',
  description: 'Get the bot setup',
  usage: 'setupbot',
  example: 'setupbot'
}
