import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsService: WebsocketService ) { }

  // Enviar mensaje al servidor
  enviarMensaje(mensaje: string) {

    // Datos para enviar al servidor
    const payloadData = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };

    this.wsService.emitir('mensaje', payloadData);

  }

  // Escuchar un mensaje desde el servidor llamada mensaje-nuevo
  escucharMensaje() {
    return this.wsService.escuchar('mensaje-nuevo');
  }

/* Escuchar los mensajes privados */
  getMessagesPrivate() {
    return this.wsService.escuchar('mensaje-privado');
  }


  getUsuariosActivos() {
    return this.wsService.escuchar('usuarios-activos');
  }

  emitirUsuarioActivos() {
    this.wsService.emitir('obtener-usuarios');
  }
}
