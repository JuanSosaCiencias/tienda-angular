import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root',
})

/**
 * Servicio de categorías.
 * 
 * Este servicio se encarga de realizar las solicitudes HTTP al servidor para obtener, crear, actualizar y eliminar categorías.
 */
export class CategoryService {
  private source = "/category";
  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista de categorías del servidor.
   * 
   * Esta función realiza una solicitud HTTP `GET` para obtener una lista de categorías.
   *
   * @returns {Observable<any>} - Un `Observable` que emite la respuesta del servidor con la lista de categorías.
  */
  getCategories(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }

  /**
   * Crea una nueva categoría en el servidor.
   * 
   * Esta función realiza una solicitud HTTP `POST` para crear una nueva categoría.
   * El objeto `category` contiene los datos de la nueva categoría que se enviarán al servidor.
   *
   * @param {Category} category - El objeto que contiene los datos de la nueva categoría.
   * @returns {Observable<any>} - Un `Observable` que emite la respuesta del servidor después de crear la categoría.
  */
  createCategory(category: Category): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, category);
  }

  /**
   * Obtiene una categoría específica del servidor.
   * 
   * Esta función realiza una solicitud HTTP `GET` para obtener una categoría con el ID proporcionado.
   *
   * @param {number} id - El ID de la categoría que se quiere obtener.
   * @returns {Observable<any>} - Un `Observable` que emite la respuesta del servidor con la categoría solicitada.
  */
  getCategory(id: number): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + id);
  }

  /**
   * Actualiza una categoría existente en el servidor.
   * 
   * Esta función realiza una solicitud HTTP `PUT` para actualizar una categoría con el ID proporcionado.
   * El objeto `category` contiene los datos actualizados que se enviarán al servidor.
   *
   * @param {number} id - El ID de la categoría que se quiere actualizar.
   * @param {Category} category - El objeto que contiene los datos actualizados de la categoría.
   * @returns {Observable<any>} - Un `Observable` que emite la respuesta del servidor después de la actualización.
  */
  updateCategory(category: any, id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + id, category);
  }
  
  /**
   * Elimina una categoría del servidor.
   * 
   * Esta función realiza una solicitud HTTP `DELETE` para eliminar una categoría con el ID proporcionado.
   *
   * @param {number} id - El ID de la categoría que se quiere eliminar.
   * @returns {Observable<any>} - Un `Observable` que emite la respuesta del servidor después de eliminar la categoría.
  */
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + id);
  }

  /**
   * Desactiva una categoría en el servidor.
   * 
   * Esta función realiza una solicitud HTTP `PUT` para desactivar una categoría con el ID proporcionado.
   *
   * @param {number} id - El ID de la categoría que se quiere desactivar.
   * @returns {Observable<any>} - Un `Observable` que emite la respuesta del servidor después de desactivar la categoría.
  */
  activateCategory(id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + id + "/activate", null)
  }

  /**
   * Consigue una lista de categorías activas.
   * 
   * @returns {Observable<any>} - Un `Observable` que emite la respuesta del servidor con la lista de categorías activas.
   */
  getActiveCategories(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/active" );
  }
}
