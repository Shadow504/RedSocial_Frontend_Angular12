export interface Mensajes{
    emisor:String,
    hora: String,
    receptor: String,
    tipo: String,
    _id: String,
    mensaje: String,
    stiker:Number
}

export interface Stiker{
    _id:String,
    sticker:String
}

export interface UsuarioAvatar{
    nombre:String,
    imagen:String
}