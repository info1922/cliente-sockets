import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../model/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket) {
    this.cargarStorage();
    this.revisaStatus();
   }

  revisaStatus() {

    // Escucha el connect
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor servidor');
      this.socketStatus = false;
    });

  }


  // Esto envia la comunicación hacia el servidor (emite cualquier evento)
  // tslint:disable-next-line:ban-types
  emitir(evento: string, payload?: any, callback?: Function) {
    console.log('Emitiendo evento', evento);
    // Emitir -> emit('EVENTO', payload, callback?)
    this.socket.emit(evento, payload, callback);
  }

  // Escucha cualquier evento que emita el servidor
  escuchar(evento: string) {
    return this.socket.fromEvent(evento);
  }

  // Emitimos un nuevo evento que lleva el nombre
  loginWs(nombre: string) {

    return new Promise ( (resolve, reject) => {

      this.emitir('configurar-usuario', {nombre}, resp => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });

    });

  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWs(this.usuario.nombre);
    }
  }

}
