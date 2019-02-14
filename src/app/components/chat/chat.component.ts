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
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  size = 'large';
  loading = false;
  texto = '';
  data: any[] = [];
  mensajeSubscription: Subscription;
  constructor(public chatService: ChatService) { }

  ngOnInit() {
    // listener que escucha los mensajes
    this.mensajeSubscription = this.chatService.escucharMensaje().subscribe(msg => {
      console.log('Mensaje: ', msg);
      this.data.push(msg);
    });
  }

  ngOnDestroy() {
    this.mensajeSubscription.unsubscribe();
  }


  enviar() {
    this.chatService.enviarMensaje(this.texto);
    console.log(this.texto);
    this.texto = '';
  }

  event(algo) {
    const valor = algo.replace(/\r?\n/g, '');
    this.chatService.enviarMensaje(valor);
    algo = '';
    this.texto = '';
    console.log(this.data);
  }




}
