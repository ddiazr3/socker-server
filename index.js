const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const dotenv = require('dotenv')
//var server = require("http").Server(app);
const app = express()
var server = require("http").Server(app);
var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: "*"
    }
});
dotenv.config()
// process.env.SMTP_PORT

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use(cors({
    origin: "*"
}));


const inicio = require('./routes/inicio')
app.use('/inicio',inicio) // /inicio/inicio/getmessage
app.get('/', (req, res) => {
    res.json({
        message: 'Mailer service is ready.'
    })
})

app.set('socketio', io); // este se pone una instancia
io.on("connection", function (socket) {

    /**
     * Aqui se colocan todos los eventos que van a escuchar
     * */
    socket.on("messageget", function (data){
        console.log(data)
        console.log("Mensaje recibiod de vu ")
    })
})

server.listen(app.get('port'), () => {
    const port = server.address().port
    console.log('Mailer service ejecutándose en http://localhost:' + port)
})


