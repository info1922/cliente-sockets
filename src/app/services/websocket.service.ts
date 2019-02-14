import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(private socket: Socket) {
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
}
