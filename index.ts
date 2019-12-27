import Server from "./classes/Server";
import router from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();

// BodyParser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Cors
server.app.use(cors({origin: true, credentials: true}));

// Routes
server.app.use('/', router);

server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
