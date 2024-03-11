import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // _http = inject(HttpService);
  constructor(private _http: HttpService) { }

  getAllProducts(body: any) {
    return this._http.post(Config.getProducts, body);
  }

  createProduct(body: any) {
    return this._http.post(Config.createProducts, body);
  }

  updateProduct(body: any) {
    return this._http.put(Config.updateProducts, body);
  }

  deleteProduct(id: any) {
    return this._http.delete(Config.deleteProducts + "/" + id);
  }
  
}
