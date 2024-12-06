import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
 //Url del API almacenada de forma privada
 apiUrl= "https://localhost:7007/api/Values";

 constructor(private http: HttpClient) { }

 // Observable es un objeto que representa un flujo de datos que se pueden manejar 
 // de forma asíncrona. Los Observables son parte de la biblioteca RxJS (Reactive Extensions for JavaScript) 
 // y se utilizan principalmente para manejar eventos o flujos de datos que pueden ocurrir en el futuro, 
 // como respuestas de peticiones HTTP, eventos del usuario - se controla con HttpClientModule

 register(username:string, cedula:string, codigo:string):Observable<any> {
   return this.http.post(`${this.apiUrl}/register`,{username, cedula, codigo});
 }

 deleteUser (codigo: string): Observable<any> {
   return this.http.delete(`${this.apiUrl}/delete/${codigo}`);
 }

 update(username: string, cedula: string,codigo:string): Observable<any> {
   const body = { username, cedula };
   return this.http.put(`${this.apiUrl}/update/${codigo}`, body);
}

 
getUsers (): Observable<any[]> {
 return this.http.get<any[]>(`${this.apiUrl}/getusers`);
}
//Obtener usuario por su codigo
getUserById(codigo: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/getUserById/${codigo}`);
}

}
