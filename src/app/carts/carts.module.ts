import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsComponent } from './component/carts/carts.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from '../products/components/product/product.component';



@NgModule({
  declarations: [
    CartsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CartsModule { }
