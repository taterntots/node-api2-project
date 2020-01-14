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

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Database.findById(id)
        .then(post => {
            if (post) {
                console.log('find post', post);
                res.status(200).json(post);
            } else {
                res.status(404).json({ errorMessage: 'The post with the specified ID does not exist' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'The post information could not be retrieved' });
        })
})

module.exports = router;