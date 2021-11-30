import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  @Input() user:any;

  @Output() onSelectUser = new EventEmitter();

  // urlImage = `/assets/img/profile-pics/${this.user.imagen}`;
  constructor() { }

  ngOnInit(): void {
  }

  cargarInfoUsuario(dataUser:any){

    this.onSelectUser.emit(dataUser);

  }

  
}
