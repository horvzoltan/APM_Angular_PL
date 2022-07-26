import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {IProduct} from '../../interfaces/product';
import {ProductService} from './product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'pm-products',
  templateUrl: 'product-list.component.html',
})

export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {
  pageTitle: string = 'Product List ';
  imageWidth: number = 50;
  imageMargin: number = 2;
  hideImage: boolean = true;
  private _listFilter: string = '';
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private productService: ProductService) {
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => this.products = products,
      error: err => this.errorMessage = err,
      complete: () => this.filteredProducts = this.products
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
  }

  toggleImage() {
    this.hideImage = !this.hideImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List ' + message;
  }
}
