import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import ProductDetails from '../Shared/models/ProductDetails';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import ProductService from '../Shared/api/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import SearchProduct from '../Shared/models/SearchProduct';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import M_ProductImage from '../Shared/models/M_ProductImage';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder
    ,         private productService: ProductService
    ,         private route: ActivatedRoute
    ,         private http: HttpClient) {
      this.files = [];
      this.BindDropDownList();
    }
  public progress: number;
  public message: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  // tslint:disable-next-line:member-ordering
  product: ProductDetails = new ProductDetails();
  // tslint:disable-next-line:member-ordering
  searchProduct: SearchProduct = new SearchProduct();
  // tslint:disable-next-line:member-ordering
  private router: Router;
  // tslint:disable-next-line:member-ordering
  firstFormGroup: FormGroup;
  // tslint:disable-next-line:member-ordering
  sub: Subscription;
  // tslint:disable-next-line:member-ordering
  categoryList: any;
  // tslint:disable-next-line:member-ordering
  brandList: any;
  // tslint:disable-next-line:member-ordering
  urls: Array<M_ProductImage> = [];
  // tslint:disable-next-line:member-ordering
  productImage: M_ProductImage = new M_ProductImage();
  files: any;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

    onFileChanged(event: any) {
      this.files = event.target.files;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.files.length; i ++) {
        if (event.target.files && event.target.files[i]) {
          const reader: FileReader = new FileReader();
          reader.readAsDataURL(event.target.files[i]); // read file as data url
          // tslint:disable-next-line:no-shadowed-variable
          reader.onload = (event: Event) => { // called once readAsDataURL is completed
            const img: M_ProductImage = new M_ProductImage();
            // img.ProductImage = event.target['result'];
            // img.ProductImage = event.target.result;
            this.urls.push(img);
            // this.url.push(reader.result);
          };
        }
      }
    }

    OnUploadImages() {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.urls.length; i++) {
        this.productImage.CreatedBy = 1;
        this.productImage.ProductId = this.product.ProductId;
        this.productImage.ProductImage = this.urls[i].ProductImage;
        this.productImage.IsDefault = i === 0 ? true : false;
        this.productImage.ProductImageId = this.urls[i].ProductImageId;
        this.productService.uploadProductImages(this.productImage).subscribe(result => {

        },
        error => console.error(error)
      );
      }
    }

  BindDropDownList() {
    this.productService.geAllCategory(0, 0).subscribe((category: any) => {
      if (category) {
        this.categoryList = category;
      } else {
        console.log(
          `Category not returning the list`
        );
      }
    });

    this.productService.geAllbrand(0).subscribe((brand: any) => {
      if (brand) {
        this.brandList = brand;
      } else {
        console.log(
          `Brand not returning the list`
        );
      }
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.searchProduct.ProductId = id;
        this.productService.GetAllProductList(this.searchProduct).subscribe((productDetail: any) => {
          if (productDetail) {
            this.product = productDetail[0];
            this.urls = this.product.ProductImage;
          } else {
            console.log(
              `Product with id '${id}' not found, returning to list`
            );
            this.gotoList();
          }
        });
      }
    });

    this.firstFormGroup = this.formBuilder.group({
      ProductName: ['', Validators.required],
      Tags: ['', Validators.required],
      Description: ['', Validators.required],
      ProductId: [],
      TaxExcludedPrice: ['', Validators.required],
      TaxIncludedPrice: [],
      TaxRate: ['', Validators.required],
      ComparedPrice: [],
      Width: ['', Validators.required],
      Height: ['', Validators.required],
      Length: ['', Validators.required],
      Depth: ['', Validators.required],
      Weight: ['', Validators.required],
      Color: ['', Validators.required],
      SKU: ['', Validators.required],
      Quantity: ['', Validators.required],
      CategoryId: ['', Validators.required],
      BrandId: ['', Validators.required],
      ExtraShippingFees: ['', Validators.required]
    });
  }
  SaveProductDetails() {
      this.product.ProductId = this.firstFormGroup.value.ProductId;
      this.product.ProductName = this.firstFormGroup.value.ProductName;
      this.product.CategoryId = this.firstFormGroup.value.CategoryId;
      this.product.BrandId = this.firstFormGroup.value.BrandId;
      this.product.Quantity = this.firstFormGroup.value.Quantity;
      this.product.SKU = this.firstFormGroup.value.SKU;
      this.product.Tags = this.firstFormGroup.value.Tags;
      this.product.Description = this.firstFormGroup.value.Description;
      this.product.TaxExcludedPrice = this.firstFormGroup.value.TaxExcludedPrice;
      this.product.TaxIncludedPrice = this.firstFormGroup.value.TaxIncludedPrice;
      this.product.TaxRate = this.firstFormGroup.value.TaxRate;
      this.product.Weight = this.firstFormGroup.value.Weight;
      this.product.Width = this.firstFormGroup.value.Width;
      this.product.Color = this.firstFormGroup.value.Color;
      this.product.Depth = this.firstFormGroup.value.Depth;
      this.product.ExtraShippingFees = this.firstFormGroup.value.ExtraShippingFees;
      this.product.Height = this.firstFormGroup.value.Height;
      this.product.CreatedBy = 1;
      this.product.ComparedPrice = 0; // this.firstFormGroup.value.ComparedPrice

      this.productService.save(this.product).subscribe(result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }
  remove(productId) {

  }
  gotoList() {
    this.router.navigate(['/product-list']);
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
}
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
