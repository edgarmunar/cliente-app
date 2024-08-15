import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  //Retorna un listado
  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES); uso local

    // Uso con url 1
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => {
        let clientes = response as Cliente[];
        return clientes.map(cliente =>{
          cliente.nombre = cliente.nombre.toLocaleUpperCase();
          //cliente.createAt = formatDate(cliente.createAt,'EEEE dd, MMMM yyyy','es-CO');
          return cliente;
        })
      })             
      );
     
    // uso 2 mas comun
    //return this.http.get<Cliente[]>(this.urlEndPoint);  
  }

  //Retorna el cliente del id enviado
  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        Swal.fire('Error al editar',e.error.mensaje,'error');
        return throwError(() => e);
      })
    );
  }

  create(cliente: Cliente) : Observable<any>{
    //ruta, objeto y encabezado
    return this.http.post<any>(this.urlEndPoint,cliente,{headers:this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(() => e);
        }

        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente) : Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(() => e);
        }

        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(() => e);
      })
    );
  }
}