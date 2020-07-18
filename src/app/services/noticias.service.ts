import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  topHeadlinesPage: number = 0;  

  categoriaActual = '';
  categoriaPage = 0;
  constructor( private http: HttpClient  ) { }

  private ejecutarQuery<T>( query: string ){
    return this.http.get<T>(`${apiUrl}${query}`, {headers});
  }

  getTopHeadlines(){
    this.topHeadlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=mx&page=${this.topHeadlinesPage}`);
  }

  getTopHeadlinesCategoria( categoria:string ){
    if( this.categoriaActual === categoria ){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=mx&category=${categoria}&page=${this.categoriaPage}`);
  }
  

}
