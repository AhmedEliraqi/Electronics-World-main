import { Component, OnInit } from '@angular/core';
import { product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { category } from '../../models/category';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products: product[] = [];
  filteredProducts: product[] = [];
  categories: category[] = [];
  loading: boolean = false;
  cartproducts: any[] = []
  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }
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
  }

  filter(event:any){
    let value = event.target.value;
    if(value == 'all'){
      this.getProducts()
    }else{
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

  addToCart(event:any) {
    if("cart" in localStorage) {
      this.cartproducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartproducts.find(item => item.item.id == event.item.id)
      if(exist) {
        alert("product is already in your cart")
      }else{
        this.cartproducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartproducts))


      }

    } else {
      this.cartproducts.push(event)
       localStorage.setItem("cart", JSON.stringify(this.cartproducts))


    }



      }

    }




