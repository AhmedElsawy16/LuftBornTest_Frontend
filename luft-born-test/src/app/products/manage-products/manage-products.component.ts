import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {
  filterForm: FormGroup;
  addEditForm: FormGroup;
  products: any;
  emptyProduct: any = {
    name: '',
    shortDescription: '',
    fullDescription: '',
    showOnHomepage: false
  }

  @ViewChild('myAddEditBtn') addEditBtn!: ElementRef<HTMLElement>;
  @ViewChild('myCloseAddEditModalBtn') closeAddEditModalBtn!: ElementRef<HTMLElement>;
  @ViewChild('deleteConfModalBtn') deleteConfModalBtn!: ElementRef<HTMLElement>;
  @ViewChild('closeDeleteConfModalBtn') closeDeleteConfModalBtn!: ElementRef<HTMLElement>;
  selectedProduct: any;

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.filterForm = fb.group({
      name: [''],
      pageNumber: [1],
      pageSize: [10]
    });

    this.addEditForm = fb.group({
      name: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
      fullDescription: ['', [Validators.required]],
      showOnHomepage: [false]
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    var body = this.filterForm.value;

    console.log(body);

    this.productsService.getAllProducts(body)
      .subscribe((res) => {
        console.log(res);
        this.products = res.data.products;
      });
  }

  onSubmit() {
    console.log("Submit", this.filterForm.value);
    this.getProducts();
  }

  addProduct() {
    this.selectedProduct = null;
    // this.addEditForm.reset();
    this.addEditForm.patchValue(this.emptyProduct);
    let el: HTMLElement = this.addEditBtn.nativeElement;
    el.click();
  }

  onAddEditSubmit() {
    let el: HTMLElement = this.closeAddEditModalBtn.nativeElement;
    if (this.selectedProduct && this.selectedProduct.id > 0) {
      // Edit
      var body = this.addEditForm.value;
      body['guid'] = this.selectedProduct.guid;
      console.log(body);

      this.productsService.updateProduct(body)
      .subscribe((res) => {
        console.log(res);
        if(res.succeeded){
          el.click();
          this.getProducts();
        }
      });
    }
    else {
      // Add
      console.log(this.addEditForm.value);
      this.productsService.createProduct(this.addEditForm.value)
      .subscribe((res) => {
        console.log(res);
        if(res.succeeded)
        {
          el.click();
          this.getProducts();
        }
      });
    }
  }

  editProduct(product: any) {
    this.selectedProduct = product;
    this.addEditForm.patchValue(product);
    let el: HTMLElement = this.addEditBtn.nativeElement;
    el.click();
  }

  clear(){
    console.log(this.filterForm);
    this.filterForm.controls['name'].patchValue('');
    this.getProducts();
  }

  deleteProduct(product: any){
    this.selectedProduct = product;
    let el: HTMLElement = this.deleteConfModalBtn.nativeElement;
    el.click();
  }

  confirmDelete(){
    let el: HTMLElement = this.closeDeleteConfModalBtn.nativeElement;
    this.productsService.deleteProduct(this.selectedProduct.guid)
    .subscribe((res) => {
      if(res.succeeded){
        el.click();
        this.getProducts();
      }
    });
  }
}
