import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  cartproducts: any[]=[];
total:any = 0;
success:boolean = false;

  constructor(private service:CartsService) { }

  ngOnInit(): void {
    this.getCartproducts();
  }


  getCartproducts() {
    if ("cart" in localStorage) {
      this.cartproducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }

  addAmount(index:number) {
this.cartproducts[index].quantity++
this.getCartTotal()
localStorage.setItem("cart", JSON.stringify(this.cartproducts))
  }

  minsAmount(index:number) {
    this.cartproducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartproducts))
  }
 
  detectChange() {
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartproducts))
  }
  deleteProduct(index:number) {
    this.cartproducts.splice(index, 1)
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartproducts))
  }

  clearcart() {
   this.cartproducts = []  
   this.getCartTotal()
   localStorage.setItem("cart", JSON.stringify(this.cartproducts))
  }

getCartTotal() {
  this.total = 0
  for(let x in this.cartproducts) {
    this.total += this.cartproducts[x].item.price * this.cartproducts[x].quantity;
  }
}

addCart() {
  let products = this.cartproducts.map(item =>{
  return  {productID:item.item.id , quantity:item.quantity}
  })
  let Model = {
    userID:5,
    date: new Date(),
    products:[]
  }
this.service.createNewCart(Model).subscribe(res => {
this.success = true
})

  console.log(Model);
  
}

}
