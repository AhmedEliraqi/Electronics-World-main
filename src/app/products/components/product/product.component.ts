import { Component, EventEmitter, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() data!:product
  @Output() item = new EventEmitter();
  addButton:boolean = false;
  amount:number = 0;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  add() {
this.item.emit({item:this.data ,quantity:this.amount})
  };

  goToItem(id:number,category:number) {
    this.router.navigate(['/details',id,category]);
    window.scrollTo(0, 0);
      };

}
