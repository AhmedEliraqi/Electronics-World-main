import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartsComponent } from './carts/component/carts/carts.component';
import { ProductDetailsComponent } from './products/components/product.details/product.details.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"products", component:AllProductsComponent},
  {path:"details/:id/:category", component:ProductDetailsComponent},
  {path:'detail/:id/:category',component:DetailComponent},
  {path:"cart", component:CartsComponent},
  {path:"", redirectTo:"signup", pathMatch:"full"},
  {path:'navbar',component:NavbarComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
