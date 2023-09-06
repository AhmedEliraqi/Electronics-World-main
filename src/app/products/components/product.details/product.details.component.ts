import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Comment } from 'src/app/comment';
import { FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-product.details',
  templateUrl: './product.details.component.html',
  styleUrls: ['./product.details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  name: any;
  image: any;
  categoryId: any;
  data: any = {};
  loading: boolean = false;
  cartproducts: any[] = [];
  product: any;
  detail: any;
  details: any;
  Id: any;
  userId: any;
  comment: string = '';



  constructor(private route: ActivatedRoute, private service: ProductsService, private http: HttpClient, private renderer: Renderer2,
    private router: Router, private auth: AuthService) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.categoryId = this.route.snapshot.paramMap.get("category");
    this.Id = this.route.snapshot.paramMap.get("id");
    this.userId = localStorage.getItem('id')


  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.getProductCategory();
    this.getData();


  }

  addComment() {
    const payload = {
      productId: this.Id,
      userId: this.userId,
      commentText: this.comment
    };
    this.http
      .post("https://localhost:44322/api/Comment/AddComment", payload)
      .subscribe(response => {
        console.log(response);

      });
  }

  getProductCategory() {
    if (this.categoryId == 1) {
      this.http.get('https://localhost:44322/api/Products/category/1').subscribe((res: any) => {
        this.cartproducts = res;
      })
    } else if (this.categoryId == 2) {
      this.http.get('https://localhost:44322/api/Products/category/2').subscribe((res: any) => {
        this.cartproducts = res;
      })
    } else {
      this.http.get('https://localhost:44322/api/Products/category/3').subscribe((res: any) => {
        this.cartproducts = res;
      })
    }

  };

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartproducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartproducts.find(item => item.item.id == event.item.id)
      if (exist) {
        alert("product is already in your cart")
      } else {
        this.cartproducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartproducts))


      }

    } else {
      this.cartproducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartproducts))
    }
  };

  getData() {

    this.http.get('https://localhost:44322/api/Products/GetAllProducts').subscribe((details: any) => {
      this.details = details;
      let index = details.findIndex(
        (detail: { id: number }) => detail.id == this.id);
      if (index > -1) {
        this.detail = this.details[index];
      }
    });
  };

  goToItem(id: number, category: number) {
    this.router.navigate(['/detail', id, category]);
    window.scrollTo(0, 0);

  };

  scrollLeft() {
    const scrollContainer = document.querySelector('.product-container');
    scrollContainer!.scrollBy(-200, 0);
  };

  scrollRight() {
    const scrollContainer = document.querySelector('.product-container');
    scrollContainer!.scrollBy(200, 0);
  }



}
