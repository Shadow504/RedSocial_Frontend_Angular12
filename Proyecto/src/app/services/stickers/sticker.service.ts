import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StickerService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:3000/stickers";

  getStickers(){

    return this.http.get<any>(this.url);
  }
}
