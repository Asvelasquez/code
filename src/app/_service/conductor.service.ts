import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Conductor } from '../_model/conductor';
@Injectable({
  providedIn: 'root'
})
export class ConductorService{
  private url: string = `${environment.HOST}/usuarios`;
  private rol:number=4;
  constructor(private http: HttpClient) { }
  public listarconductor(page:number, size: number) {
    return this.http.get<any>(`${this.url}/pageablePorRol/${this.rol}/${page}/${size}`);
  }
  public guardar_conductor(conductor: Conductor){
    return this.http.post(`${this.url}/guardar`, conductor);
}
}
