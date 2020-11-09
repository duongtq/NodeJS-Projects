const express = require('express');
const InMemoryNotesStore = require('../models/notes-memory');
const notes = new InMemoryNotesStore();

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const keylist = await notes.keylist();
        // console.log(`keylist ${util.inspect(keylist)}`);
        const keyPromises = keylist.map(key => {
            return notes.read(key);
        });
        const notelist = await Promise.all(keyPromises);
        // console.log(util.inspect(notelist));
        res.render('index', { title: 'Notes', notelist: notelist });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
