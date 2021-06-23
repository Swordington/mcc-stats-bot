module.exports = (client) => {
  console.log(`==Connected to MongoDB==\n User: ${client.mongooseConnection.user}\n Port: ${client.mongooseConnection.port}\n Database: ${client.mongooseConnection.name}`)
}
