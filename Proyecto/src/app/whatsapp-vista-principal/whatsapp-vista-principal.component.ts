import { Contacto } from './../models/contactos/modelContactos';
import { Usuario } from './../models/users/modelUsers';
import { Mensajes, Stiker } from './../models/conversaciones/modelsConversaciones';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuarios/usuario.service';
import { StickerService } from '../services/stickers/sticker.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConversacionService } from '../services/conversaciones/conversacion.service';
import { Chat } from '../models/chats/modelsChats';

@Component({
  selector: 'app-whatsapp-vista-principal',
  templateUrl: './whatsapp-vista-principal.component.html',
  styleUrls: ['./whatsapp-vista-principal.component.css']
})
export class WhatsappVistaPrincipalComponent implements OnInit {

  styleNavLinkChats = '3px solid #18AC96';
  styleNavLinkContacts = 'none';
  idContactoAgregar = "";
  viewChats = true;
  viewListUsers = false;
  viewStickers = false;
  verConversacion = false;
  oncargarChatsUsuario = false;
  userSelect = "assets/img/profile-pics/noUsuario.jpg";
  conversacionActual = '';
  users: Usuario[] = []
  mensajeNuevo:string = '';
  userSelectId = "";
  activarBtnConversacion = false
  chatsUsuario:Chat [] = [];
  mensajesConversacion: Mensajes[]=[];
  stickers: Stiker[] = []

  contactosUsuario:Contacto [] = [];

  usuarioConversacion = {
    nombre:'',
    imagen:'noUsuario.jpg',
    id:''
  }

  usuariosNuevosAggModal = [{
    nombre: "",
    _id: "",
    imagen: ""
  }]


  constructor(private usersServices:UsuarioService, private stickersService:StickerService,private modalService:NgbModal, private conversacionesService:ConversacionService ) { }

  ngOnInit(): void {

    /* MOSTRAR LOS USUARIOS EXISTENTES AL USUARIO PARA QUE SELECCIONE EL DE SU PREFERENCIA */
    this.usersServices.getUsuarios().subscribe(result =>{
      this.users = result;

      if(this.userSelectId != ''){

        let newLista:any[] = []
        this.users.forEach(usuario => {
          if(usuario._id != this.userSelectId){
            newLista.push(usuario)
          }
          
        });
        this.users = newLista;   
      }

    })

    if(this.userSelectId != ""){
      /* CARGAR CONTACTOS EXISTENTES */
      this.usersServices.getContactos(this.userSelectId).subscribe(result =>{

        this.contactosUsuario = result;
        // console.log(this.contactosUsuario);
      });

      /* CARGAR USUARIOS QUE AUN NO TENEMOS AGREGADOS DE CONTACTOS PARA MOSTRARLOS */
      this.usersServices.getUsuariosFaltanAgregarContactos(this.userSelectId).subscribe(result =>{

        // console.log(result);
        this.usuariosNuevosAggModal = result;

      })
    }

    this.stickersService.getStickers().subscribe(result =>{
      this.stickers = result;

    })

  }

  /* VER CHATS QUE TIENE ACTIVOS EL USUARIO */
  verChatsUsuario(){
    this.styleNavLinkChats = '3px solid #18AC96';
    this.styleNavLinkContacts = 'none';
    this.viewChats = true;
    this.verConversacion = false;
  }

  /* VER LOS CONTACTOS QUE TIENE EL USUARIO */
  verContactosUsuario(){
    this.styleNavLinkContacts = '3px solid #18AC96';
    this.styleNavLinkChats = 'none';
    this.viewChats = false;
    this.verConversacion = false;
    this.activarBtnConversacion = false;
    this.ngOnInit();

    // this.verConversacion ? this.verConversacion = false : this.verConversacion = true;

  }

  /* VISUALIZAR DIV CONTENEDOR LISTA DE USUARIOS */
  verListaUsuarios(){
    this.viewListUsers? this.viewListUsers = false:this.viewListUsers = true;
  }

  /* CARGAMOS LOS DATOS DEL USUARIO MEDIANTE EL SERVICIO, CUANDO SE SELECCIONA UN USUARIO DE LOS QUE SE MUESTRAN. */
  onCargarDatosUsuario(event:any){

    this.oncargarChatsUsuario = true;
    let DatosUsuario = {
      nombre: "",
      _id: "",
      imagen: ""
    }
    
    DatosUsuario = event;

    this.userSelectId=DatosUsuario._id;

    this.userSelect = `assets/img/profile-pics/${DatosUsuario.imagen}`;
    this.viewListUsers = false;

    this.usersServices.getChats(DatosUsuario._id).subscribe(result =>{
      this.chatsUsuario = result;
      
    })
    
    this.ngOnInit();
    
  }


  /* MONSTRAR TODOS LOS MENSAJES DE LA CONVERSACION. */
  cargarConversacionUsr(event:any){
    
    this.viewChats = false;
    if(this.verConversacion){
      
      this.verConversacion = false;
      
    }else{
      
      this.verConversacion = true;

      this.conversacionesService.getConversacionChat(event._id).subscribe(result =>{
        
        result.emisor._id == this.userSelectId?this.usuarioConversacion.id=result.receptor._id:this.usuarioConversacion.id=result.emisor._id
        
        this.mensajesConversacion = result.mensajes;
        this.usuarioConversacion.nombre = event.nombreDestinatario;
        this.usuarioConversacion.imagen = event.imagenDestinatario;
        this.conversacionActual = event._id;
      })

    }

  }

  

  cargarConversacionContacto(event:any){

    this.mensajesConversacion = [];
    this.activarBtnConversacion = true;
    
    this.verConversacion ? this.verConversacion = false : this.verConversacion = true;
    this.usuarioConversacion.nombre = event.nombre;
    this.usuarioConversacion.imagen = event.imagen;
    this.usuarioConversacion.id = event._id
    
    this.conversacionesService.cargarConversacionContacto(this.userSelectId,event._id).subscribe(result =>{
      if(result){
        this.mensajesConversacion = result.mensajes;

      }
      
    })
  }

  mostrarListaStickers(){
    this.viewStickers?this.viewStickers = false:this.viewStickers = true
  }

  /* ENVIAMOS EL STICKER SELECCIONADO */
  sendSticker(event:any){
    
    this.conversacionesService.guardarNuevoMensaje({
      idConversacion:this.conversacionActual,
      emisor:this.userSelectId,
      receptor:this.usuarioConversacion.id,
      stiker:event.sticker.split('.')[0],
      tipo:'sticker',
      hora:'10:25 PM'
    }).subscribe(result =>{
      
      this.mostrarListaStickers();
      this.mostrarMensaje({
          emisor: this.userSelectId,
          hora: "10:25 PM",
          receptor: this.usuarioConversacion.id,
          tipo: "sticker",
          stiker:event.sticker.split('.')[0],
      })

    })
  }
  
  /* ENVIAR MENSAJE A CONTACTO */
  enviarMensaje(){
        
    this.conversacionesService.guardarNuevoMensaje({
      idConversacion:this.conversacionActual,
      emisor:this.userSelectId,
      receptor:this.usuarioConversacion.id,
      mensaje:this.mensajeNuevo,
      tipo:'text',
      hora:'10:30 PM'

    }).subscribe(result =>{
      
      this.mostrarMensaje({
          emisor: this.userSelectId,
          hora: "10:30 PM",
          mensaje: this.mensajeNuevo,
          receptor: this.usuarioConversacion.id,
          tipo: "text",
      })
  
      this.mensajeNuevo = '';
    })


  }


  /* MOSTRAMOS LA VENTANA MODAL */
  open(myModal:any){
    this.modalService.open(myModal);
  }

  mostrarMensaje(mensaje:any){
    this.mensajesConversacion.push(mensaje);
  }

  /* CERRAR VENTANA MODAL */
  close(){
    this.modalService.dismissAll();
  }

  /* GUARDAMOS LOS DATOS DEL USUARIO A AGREGAR COMO CONTACTO */
  setContactoAgregar(user:any){

    let userr= {
      _id:"",
      nombre:"",
      imagen:""
    }
    userr = user;
    this.idContactoAgregar = userr._id;
  }

  /* AGREGAMOS EL NUEVO CONTACTO. */
  agregarContacto(){  
    this.usersServices.agregarNuevoContacto({idContacto:this.idContactoAgregar,id:this.userSelectId}).subscribe(result =>{
      // console.log(result);
      this.ngOnInit();
    })
  }


}
