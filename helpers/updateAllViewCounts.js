const Discord = require('discord.js') // eslint-disable-line no-unused-vars
const axios = require('axios')

/**
 * @param {Discord.Client} client
 */
module.exports = async (client) => {
  const livestreamsArray = Array.from(client.livestreams)
  const logChannel = await client.guilds.cache.get(client.config.devGuild).channels.cache.get(client.config.logChannel)
  const logEmbed = new Discord.MessageEmbed()
    .setTitle('Fetched Livestream Viewer Count')
    .setFooter('MCC Stats Bot - updateAllViewCounts helper')
    .setTimestamp()

  livestreamsArray.forEach(async livestreamer => {
    const videoInfo = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CliveStreamingDetails&id=${livestreamer[1].streamId}&key=${process.env.GAPITOKEN}`)
    const livestreamObject = {
      streaming: true,
      streamId: livestreamer[1].streamId,
      viewerCount: videoInfo.data.items[0].liveStreamingDetails.concurrentViewers,
      updateTimestamp: Date.now()
    }
    client.livestreams.set(livestreamer[0], livestreamObject)
    logEmbed
      .addField('Streamer', `${videoInfo.data.items[0].snippet.channelTitle} (${livestreamer[0]})`)
      .setAuthor(videoInfo.data.items[0].snippet.channelTitle)
      .addField('Video', `${videoInfo.data.items[0].snippet.title} (${livestreamer[1].streamId})`)
      .addField('View Count', videoInfo.data.items[0].liveStreamingDetails.concurrentViewers, true)
      .setThumbnail(videoInfo.data.items[0].snippet.thumbnails.default.url)
    await logChannel.send(logEmbed)
    console.log(`Fetched vewer count for ${livestreamer[0]} - video ${livestreamer[1].streamId} | ${videoInfo.data.items[0].liveStreamingDetails.concurrentViewers}`)
  })
}
