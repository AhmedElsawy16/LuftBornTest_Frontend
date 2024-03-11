import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '../config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get<T>(path: string, params: any = new HttpParams()): Observable<any> {
    return this.http.get<T>(`${Config.apiUrl}${path}`, { params })
  }

  getLocal<T>(path: string, params: any = new HttpParams()): Observable<any> {
    return this.http.get<T>(path, { params })
  }
  post(path: string, body: Object = {}, headers?: any): Observable<any> {
    return this.http.post(`${Config.apiUrl}${path}`, body, { headers })
  }
  postByparams(path: string, params: any = new HttpParams()): Observable<any> {
    return this.http.post(`${Config.apiUrl}${path}`, null, { params })
  }
  delete(path: string, params: any = new HttpParams()): Observable<any> {
    return this.http.delete(`${Config.apiUrl}${path}`, params)
  }
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${Config.apiUrl}${path}`, body)
  }
}
