import {Usuario} from "./usuario";

export class UsuariosLista {

  // en caso de manejo de crud en base de datos, desde aqui lo podriamos gestionar
  private lista: Usuario[] = [];

  constructor() {}

  // Agregar un usuario
  public agregar(usuario: Usuario) {
    this.lista.push(usuario);
    console.log(this.lista);
    return usuario;
  }

  // actualizamos nombre de usuario
  public actualizarNombre(id: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }
    console.log('Actualizando nombre de usuario');
    console.log(this.lista);
  }

  // obtenemos lista
  public getLista() {
    return this.lista;
  }

  // obtenemos usuario por id
  public getUsuario(id: string) {
    return this.lista.find(usuario => usuario.id === id);
  }

  // obtener usuarios de una sala en particular
  public getUsuariosEnSala(sala: string) {
    return this.lista.filter(usuario => usuario.sala === sala);
  }

  // borrar un usuario (al dejar la comunicacion de sockets)
  public borrarUsuario(id: string) {
    const tmpUsuario = this.getUsuario(id);
    this.lista = this.lista.filter(usuario => usuario.id !== id);
    console.log(this.lista);
    return tmpUsuario;
  }
}
