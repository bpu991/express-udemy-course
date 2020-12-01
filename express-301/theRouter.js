const express = require('express');
let router = express.Router();

//router.use is the same as app.use but onlt applies to this router
router.get('/', (req, res, next) => {
    res.json({
        msg: "Router works!"
    })
})

module.exports = router