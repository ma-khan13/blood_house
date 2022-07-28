const router = require('express').Router()


router.get('/', (req, res)=> {
    res.send(req.user);
    console.log(req.user);

})

module.exports = router;