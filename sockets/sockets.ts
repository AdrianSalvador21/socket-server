import {Socket} from "socket.io";
import socketIO from "socket.io";
import {UsuariosLista} from "../classes/usuarios-lista";
import {Usuario} from "../classes/usuario";

// creamos una instancia para la lista de usuarios
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('cliente desconectado');
    usuariosConectados.borrarUsuario(cliente.id);
  });
};

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
    // Recibimos
    console.log('Mensaje recibido', payload);
    // Emitimos
    io.emit('mensaje-nuevo', payload);
  });
};


// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
    // Recibimos
    console.log('Usuario recibido', payload);
    usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
    // Podemos enviar error o confirmar correcto -> recibido en el front
    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre} configurado`
    })
  });
};
