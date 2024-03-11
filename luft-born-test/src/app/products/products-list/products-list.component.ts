import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  @Input() products: any;
  @Output() editProduct: EventEmitter<any> = new EventEmitter();
  @Output() deleteProductEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void{
    console.log(this.products);
  }

  updateProduct(product: any){
    this.editProduct.emit(product);
  }

  deleteProduct(product: any){
    this.deleteProductEvent.emit(product)
  }
}
