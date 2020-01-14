const express = require('express'); //import the express package
const postRouter = require('../routers/post-router'); //imports our router
const server = express(); //creates the server

server.use(express.json()); //middleware needed to parse JSON

//endpoints
server.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Danger Zone</h1>`)
})

//routes
server.use('/api/posts', postRouter)

module.exports = server;