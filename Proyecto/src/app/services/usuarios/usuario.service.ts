import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  url="http://localhost:3000/usuarios/agregarContacto";


  getUsuariosFaltanAgregarContactos(idUser:string){

    let url2 = `http://localhost:3000/usuarios/${idUser}/faltanAgregarContactos`;

    return this.http.get<any>(url2);

  }

  agregarNuevoContacto(data:any){

    return this.http.put(this.url,data);
  }

  getContactos(id:string){
    let url3 = `http://localhost:3000/usuarios/${id}/contactos`;

    return this.http.get<any>(url3);

  }

  getChats(id:string){

    let url4 = `http://localhost:3000/usuarios/${id}/chats`;
    return this.http.get<any>(url4);
  }

  getUsuarios(){

    return this.http.get<any>("http://localhost:3000/usuarios");
    
  }


}
