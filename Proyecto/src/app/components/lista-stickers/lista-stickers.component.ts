import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lista-stickers',
  templateUrl: './lista-stickers.component.html',
  styleUrls: ['./lista-stickers.component.css']
})
export class ListaStickersComponent implements OnInit {

  @Input() stickerr:any;

  @Output() onClickSticker = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  enviarMensaje(sticker:any){
    this.onClickSticker.emit(sticker);
  }


}
