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
      de: 'Ivan',
      cuerpo: mensaje
    };

    this.wsService.emitir('mensaje', payloadData);

  }

  // Escuchar un mensaje desde el servidor llamada mensaje-nuevo
  escucharMensaje() {
    return this.wsService.escuchar('mensaje-nuevo');
  }
}
