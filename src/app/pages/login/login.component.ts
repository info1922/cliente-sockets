import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = '';
  password = '';
  remember = true;

  constructor(
    public wsService: WebsocketService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  ingresar() {
    this.wsService.loginWs(this.nombre)
      .then(() => {
        this.router.navigateByUrl('/mensajes');
      });
  }

}
