import Server from "./classes/Server";
import router from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';

// nos aseguramos de tener una sola instancia de server, singleton
const server = Server.instance;

// BodyParser - > formato de respuestas
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Cors - permite que sitios externos tengan acceso sin restricciones
server.app.use(cors({origin: true, credentials: true}));

// Routes -> rutas base -> las rutas individuales tienen sus rutas internas
server.app.use('/', router);

// inicializacion del servidor
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
