import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { category } from 'src/app/products/models/category';
import { product } from 'src/app/products/models/product';
import { ProductsService } from 'src/app/products/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [JwtHelperService]
})
export class HeaderComponent implements OnInit {

  products: product[] = [];
  filteredProducts: product[] = [];
  categories: category[] = [];
  loading: boolean = false;
  cartproducts: any[] = []
  public fullName: string = "";
  private user: any = {};

  constructor(private service: ProductsService, private route: Router, public userStore: UserStoreService, private auth: AuthService) { }

  ngOnInit(): void {
    console.log('Retrieving user from UserStoreService...');
    this.user = this.userStore.getUserName();
    console.log('User:', this.user);
    

    this.getProducts()
    this.getCategories()
  }

  getCategories() {
    this.loading = true
    this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res
      this.loading = false
    }, error => {
      this.loading = false
      alert(error)

    })
  };

  filter(event: any) {
    let value = event.target.value;
    console.log(value);

    if (value == 'all') {
      this.getProducts()
    } else {
      this.getProductsCategory(value);
    }


  };

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

}
