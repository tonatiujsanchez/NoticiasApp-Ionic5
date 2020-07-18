import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { ActionSheetController } from '@ionic/angular';

//plugins
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  
  @Input() noticia: Article; 
  @Input() idx: number;
  @Input() enFavoritos;
  

  constructor( private iabrowser: InAppBrowser,
               public actionSheetCtrl: ActionSheetController,
               private socialSharing: SocialSharing,
               private _dataLocalService: DataLocalService) { }

  ngOnInit() {}
  
  abrirNoticia(){
     const browser =  this.iabrowser.create( this.noticia.url, '_system');
  }


  async mostarOpciones(){
    
    let guardarBorrar;

    if( this.enFavoritos ){
    //borrar favorito
      guardarBorrar = {
        text: 'Borrar de Favoritos',
        icon: 'trash',
        cssClass:'action-dark',
        handler: () => {
          this._dataLocalService.borrarNoticia( this.noticia );
        }
      }
    }else{
    //guardar favorito
      guardarBorrar = {
        text: 'Agregar a Favoritos',
        icon: 'heart',
        cssClass:'action-dark',
        handler: () => {
          this._dataLocalService.guardarNoticia( this.noticia );
        }
      }
    }



    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass:'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBorrar,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass:'action-dark',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
