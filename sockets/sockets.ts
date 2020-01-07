import {Socket} from "socket.io";
import socketIO from "socket.io";
import {UsuariosLista} from "../classes/usuarios-lista";
import {Usuario} from "../classes/usuario";

// creamos una instancia para la lista de usuarios
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('disconnect', () => {
    console.log('cliente desconectado');
    usuariosConectados.borrarUsuario(cliente.id);

    io.emit('usuarios-activos', usuariosConectados.getLista());

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
    io.emit('usuarios-activos', usuariosConectados.getLista());
    // Podemos enviar error o confirmar correcto -> recibido en el front
    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre} configurado`
    })
  });
};

// Configurar usuario
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('obtener-usuarios', () => {

    io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    // Podemos enviar error o confirmar correcto -> recibido en el front
  });
};
