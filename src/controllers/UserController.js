const users = require('../mocks/users')

module.exports = {
  listUsers(req, res) {
    console.log(req.query)
    const { order } = req.query
    const sortedUsers = users.sort((a, b) => {
      if(order === "desc") {
        return a.id < b.id ? 1 : -1
      }

      return a.id > b.id ? 1 : -1
    })
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(sortedUsers))
  }
}