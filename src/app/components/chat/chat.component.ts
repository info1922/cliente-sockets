import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  size = 'large';
  loading = false;
  texto = '';
  dato = '';
  data: any[] = [];
  mensajeSubscription: Subscription;

  elemento: HTMLElement;

  isTyping: HTMLElement;

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    // listener que escucha los mensajes
    this.isTyping = document.getElementById('indicador');
    this.isTyping.hidden = true;
    this.elemento = document.getElementById('chatmensaje');
    this.mensajeSubscription = this.chatService.escucharMensaje().subscribe(msg => {
      console.log('Mensaje: ', msg);
      this.data.push(msg);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 10);

    });
  }

  ngOnDestroy() {
    this.mensajeSubscription.unsubscribe();
  }


  enviar() {
    if (this.texto.trim().length === 0) {
      return;
    }
    this.chatService.enviarMensaje(this.texto);
    console.log(this.texto);
    this.texto = '';
  }

  event(algo) {

    if (this.texto.trim().length === 0) {
      return;
    }
    const valor = algo.replace(/\r?\n/g, '');
    this.chatService.enviarMensaje(valor);
    algo = '';
    this.texto = '';
    console.log(this.data);
  }

}
