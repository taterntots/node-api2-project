const router = require('express').Router();
const Database = require('../data/db');

//endpoints
router.post('/', (req, res) => {
    const postData = req.body; //for this to work you need the server.use(express.json()); above

    if (!postData.title || !postData.contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post' });
    } else {
        Database.insert(postData)
            .then(post => {
                console.log('added post', post);
                res.status(201).json(post);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ errorMessage: 'There was an error while saving the post to the database' });
            })
    }
})

router.post('/:id/comments', (req, res) => {
    // const id = req.params.id;
    const comment = req.body;
    // console.log('LOOK HERE', id);
    console.log('LOOK HERE', comment);

    if (!comment.text) {
        res.status(400).json({ errorMessage: 'Please provide text for the comment' });
    } else {
        Database.insertComment(comment)
            .then(post => {
                if (post) {
                    console.log('post edited', comment);
                    res.status(201).json(post);
                } else {
                    res.status(404).json({ errorMessage: 'The post with the specified ID does not exist' });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ errorMessage: 'There was an error while saving the comment to the database' });
            })
    }
})

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
            if (post.length > 0) {
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

router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;

    Database.findPostComments(postId)
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
            res.status(500).json({ errorMessage: 'The comments information could not be retrieved' });
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Database.remove(id)
        .then(post => {
            if (post) {
                console.log('post deleted', post);
                res.status(200).json(post);
            } else {
                res.status(404).json({ errorMessage: 'The post with the specified ID does not exist' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'The post could not be removed' });
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    if (!changes.title || !changes.contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post' });
    } else {
        Database.update(id, changes)
            .then(post => {
                if (post) {
                    console.log('post edited', post);
                    res.status(200).json(post);
                } else {
                    res.status(404).json({ errorMessage: 'The post with the specified ID does not exist' });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ errorMessage: 'The post information could not be modified' });
            })
    }
})

module.exports = router;