import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private htpp:HttpClient) { }

  getAllProducts() {
    return this.htpp.get('https://localhost:44322/api/Products/GetAllProducts')
  }

  getAllCategories() {
    return this.htpp.get('https://localhost:44322/api/Products/GetAllCategories')
  }

  getProductsByCategory(keyword:string) {
    return this.htpp.get('https://localhost:44322/api/Products/category/' +keyword)
  }

  getProductByCategoryId(id: number) {
    return this.htpp.get('https://localhost:44322/api/Products/category/' + id).pipe();
  };

  getProductById(id:number) {
    return this.htpp.get('https://localhost:44322/api/Products/GetProduct'+id).pipe();
  }
}
