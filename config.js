const config = {
  devs: ['248540313059196928'], // Sword
  prefix: '=',
  devGuild: '700339616900972665',
  permLevels: [ // Permissions
    {
      level: 0, // Basic level command; return true automatically so all users can run.
      name: 'User',
      check: () => true
    },
    {
      level: 5,
      name: 'Server Admin',
      check: (message) => {
        try {
          const perms = message.member.permissions
          return (perms.has('MANAGE_SERVER', true))
        } catch (e) {
          return false
        }
      }
    },
    { // Dev
      level: 10,
      name: 'Dev',
      // checks if the message author is a member of the developers array.
      check: (message) => {
        if (config.devs.indexOf(message.author.id) > -1) return true
      }
    }
  ]
}

module.exports = config
