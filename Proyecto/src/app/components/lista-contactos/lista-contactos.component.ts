import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lista-contactos',
  templateUrl: './lista-contactos.component.html',
  styleUrls: ['./lista-contactos.component.css']
})
export class ListaContactosComponent implements OnInit {

  @Input() contact:any;

  @Output() onConversacionContact = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cargarConversacion(id:string){

    this.onConversacionContact.emit(id);
  }

}
