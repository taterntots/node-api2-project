const server = require('./api/server.js');

const port = 8001;
server.listen(port, () => {
    //start watching for connections on the port specified
    console.log(`**Server running on port: ${port}**`)
})