import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/services/products.service';
import { category } from '../products/models/category';
import { product } from '../products/models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: category[] = [];
  loading: boolean = false;
  products: product[] = [];

  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getProductsCategory(id: number) {
    this.loading = true
    this.service.getProductByCategoryId(id).subscribe((res: any) => {
      this.loading = false
      this.products = res

    })
  };

  getProducts() {
    this.loading = true
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res
      this.loading = false
    })
  }

  getCategories() {
    this.loading = true
    this.service.getAllCategories().subscribe((res:any) => {
      this.categories = res
      this.loading = false
    } , error => {
      this.loading = false
    alert(error)

    })
  };

  filter(event:any){
    let value = event.target.value;
    if(value == 'all'){
      this.getProducts()
    }else{
      this.getProductsCategory(value);
    }


      };
}
