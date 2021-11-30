import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListadoChatsComponent } from './components/listado-chats/listado-chats.component';
import { ListaContactosComponent } from './components/lista-contactos/lista-contactos.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { ListaStickersComponent } from './components/lista-stickers/lista-stickers.component';
import { WhatsappVistaPrincipalComponent } from './whatsapp-vista-principal/whatsapp-vista-principal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from "@angular/common/http";



@NgModule({
  declarations: [
    AppComponent,
    ListadoChatsComponent,
    ListaContactosComponent,
    ListaUsuariosComponent,
    ListaStickersComponent,
    WhatsappVistaPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
