import { Component, OnInit, Renderer2 } from '@angular/core';
import { product } from '../products/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

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
    private router: Router) {

    this.id = this.route.snapshot.paramMap.get("id");
    this.categoryId = this.route.snapshot.paramMap.get("category");
    this.Id = this.route.snapshot.paramMap.get("id");
    this.userId = localStorage.getItem('id')
  }

  ngOnInit(): void {
    this.getData();
    this.getProductCategory();
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



  scrollLeft() {
    const scrollContainer = document.querySelector('.product-container');
    scrollContainer!.scrollBy(-200, 0);
  };

  scrollRight() {
    const scrollContainer = document.querySelector('.product-container');
    scrollContainer!.scrollBy(200, 0);
  };

  goToItem(id: number, category: number) {
    this.router.navigate(['/details', id, category]);
    window.scrollTo(0, 0);

  };

}
