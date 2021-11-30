import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listado-chats',
  templateUrl: './listado-chats.component.html',
  styleUrls: ['./listado-chats.component.css']
})
export class ListadoChatsComponent implements OnInit {

  @Input() chat:any;
  constructor() { }

  @Output() onConversacion = new EventEmitter();
  ngOnInit(): void {
  }

  cargarConversacion(id:string){
    this.onConversacion.emit(id);
  }
}
