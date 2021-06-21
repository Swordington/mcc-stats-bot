const creatorChannelArray = require('../streamersLinks.json').testChannel
const axios = require('axios')

module.exports = (client) => {
  creatorChannelArray.forEach(async creatorChannel => {
    let liveVideos
    try {
      liveVideos = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${creatorChannel.id}&eventType=live&maxResults=25&type=video&key=${process.env.GAPITOKEN}`)
    } catch (e) {
      console.log('I done did a goof \n' + e)
      return
    }
    if (liveVideos.data.items.length === 0) {
      client.livestreams.set(creatorChannel.id, { streaming: false })
      console.log(`${creatorChannel.username} (${creatorChannel.id}) was not livestreaming`)
      return
    }
    client.livestreams.set(creatorChannel.id, { streaming: true, streamId: liveVideos.data.items[0].id.videoId })
    console.log(`${creatorChannel.username} (${creatorChannel.id}) is livestreaming with an id of ${liveVideos.data.items[0].id.videoId}`)
  })
}
