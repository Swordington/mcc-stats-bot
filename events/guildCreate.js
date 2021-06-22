const GuildModel = require('../models/guild')

module.exports = async (client, guild) => {
  console.log('New Guild!')
  console.log(`${guild.name} (${guild.id}), ${guild.members.cache.size} cached members`)

  GuildModel.create({ _id: guild.id, type: 0 })
    .then((g) => {
      console.log(`${guild.name} (${guild.id}) added le bot`)
    })
}
