const router = require('express').Router();
const Database = require('../data/db');

//endpoints
router.get('/', (req, res) => {
    Database.find()
        .then(posts => {
            console.log('posts found', posts);
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'The posts information could not be retrieved' });
        })
})

module.exports = router;