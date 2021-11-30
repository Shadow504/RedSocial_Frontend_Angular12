import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConversacionService {

  constructor(private http:HttpClient) { }


  getConversacionChat(idContact:string){
    let url = `http://localhost:3000/conversaciones/${idContact}`;

    return this.http.get<any>(url);
  }
  getAllConversaciones(){
    return this.http.get<any>("http://localhost:3000/conversaciones/");
  }
  
  guardarNuevoMensaje(data:any){
    let url = 'http://localhost:3000/conversaciones/nuevoMensaje';

    return this.http.put(url,data);
  }

  cargarConversacionContacto(idUsuario:string,idContacto:string){
    let url = `http://localhost:3000/conversaciones/usuarios/${idUsuario}/${idContacto}`;

    return this.http.get<any>(url);
  }

}
