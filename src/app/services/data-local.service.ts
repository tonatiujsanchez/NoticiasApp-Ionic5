import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  
  noticias:Article[] = [];

  constructor( private storage: Storage,
               public toastCtrl: ToastController  ) {
    this.cagarFavoritos();
   }

  async presentToast( mensaje:string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'bottom',
      color: 'primary',
      animated: true,
      duration: 1000
    });
    toast.present();
  }



  guardarNoticia( noticia:Article ){

    const existe = this.noticias.find( noti => noti.title === noticia.title );
    
    if( !existe ){
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias);
      this.presentToast( 'Nota agregada a tus favoritos' );
    }
  }

  async cagarFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    
    if(favoritos){
      this.noticias = favoritos;    
    }
  }

  borrarNoticia( noticia: Article ){
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this.storage.set('favoritos', this.noticias);
    this.presentToast( 'Nota borrada de favoritos' );
  }

}
