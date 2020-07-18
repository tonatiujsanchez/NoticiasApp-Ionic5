import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  categorias = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];
  noticias: Article[] = [];
  
  constructor( private _noticiasService: NoticiasService ) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value);
  }

  cambioCategoria( evento ){
    this.noticias = [];
    this.cargarNoticias( evento.detail.value );
  }

  cargarNoticias( categoria:string, evento? ){
    this._noticiasService.getTopHeadlinesCategoria(categoria).subscribe( newsCat =>{

        this.noticias.push( ...newsCat.articles );

        if( evento ){
          evento.target.complete();
        }
    });
  }
  
  cargarMas( evento ){
    this.cargarNoticias( this.segment.value, evento );
  }

  
}
