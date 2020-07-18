import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  noticias: Article []= [];
  constructor( private _noticiasService: NoticiasService ) {

  }
  
  ngOnInit(){
    this.cargarNoticias();
  }

  cargarMas( evento ){
    this.cargarNoticias( evento );
  }
  
  cargarNoticias( evento? ){
    this._noticiasService.getTopHeadlines().subscribe( news => {
     
      if( news.articles.length === 0 ){
        evento.target.disabled = true;
        return;
      }

      this.noticias.push( ...news.articles );

      if( evento ){
        evento.target.complete();
      }
  });
  }
}
