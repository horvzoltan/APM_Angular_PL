import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {StarComponent} from '../shared/star.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProductDetailGuard} from './product-detail.guard';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    StarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
    ])
  ]
})
export class ProductModule {
}
