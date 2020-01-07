import express from 'express';
import {SERVER_PORT} from "../global/enviroment";
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

  private static _instance: Server;

  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    // usamos httpServer para manejar nuestro servidor (y hacerlo compatible con socketio)
    this.httpServer = new http.Server(this.app);

    // io necesita la configuracion del server, pero express de manera directa no es compatible
    this.io = socketIO(this.httpServer);

    // al crear la instancia de nuestra clase Server, inicialiamos y empezamos a escuchar nuestros sockets
    this.escucharSockets();
  }

  public static get instance() {
    // singleton, nos permite tener una sola instancia de nuestra clase
    return this._instance || (this._instance = new this());
  }

  private escucharSockets() {
    console.log('escuchando conexiones - sockets');

    this.io.on('connection', cliente => {
      // io.on se ejecutara cada ves que un cliente nuevo se conecte, y se mantendrá escuchando
      console.log('cliente conectado');

      // cada cliente de sockets tendrá un id unico, con el que es posible identificarlo
      console.log(cliente.id);

      // conectar cliente
      socket.conectarCliente(cliente);

      // configurar usuario
      socket.configurarUsuario(cliente, this.io);

      // desconectar
      socket.desconectar(cliente);

      // mensajes
      socket.mensaje(cliente, this.io);

    });
  }

  start(callback: Function) {
    // @ts-ignore

    // nos permite empezar a escuchar el servidor en el puerto asignado
    this.httpServer.listen(this.port, callback);
    //this.app.listen(this.port, callback);
  }
}

