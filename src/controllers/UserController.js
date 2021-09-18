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
    res.send(200, sortedUsers)
  },

  getUserById(req, res) {
    const { id } = req.params

    const user = users.find(user => user.id === Number(id))

    if(!user) {
      return res.send(200, { error: 'User not found' })
    }

    res.send(200, user)
  },

  createUser(req, res) {
    let body = ''

    req.on('data', chunk => {
      body += chunk
    })
    //adiciona ao body os dados recebidos

    req.on('end', () => {
      body = JSON.parse(body)
      //Quando receber o último pedaço da mensagem, converte a string
      //em um objeto Javascript

      const lastUserId = users[users.length - 1].id
      const newUser = {
        id: lastUserId + 1,
        name: body.name
      }

      users.push(newUser)

      res.send(200, newUser)
    })
  }
}