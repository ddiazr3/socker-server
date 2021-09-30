const express = require('express')
const router = express.Router();

router.post('/getmessage', (req, res, next) => {

    /**
     * Si nos consumen una url y se necesita disparar un socket hacia fronted
     * */
    var io =  req.app.get('socketio');
    io.emit("message-post","mensaje enviado desde node "+req.body.message)
    res.send('Saludando desde '+req.body.message)
})
router.get('/nueva', (req, res, next) => {

    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
})
module.exports  = router
