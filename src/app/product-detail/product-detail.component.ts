import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import ProductService from '../Shared/api/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import SearchProduct from '../Shared/models/SearchProduct';
import ProductDetails from '../Shared/models/ProductDetails';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  sub: Subscription;
  cartDetails = {ProductId: 0, ProductName: '', ProductImage: '', Quantity: 0, UnitPrice: 0, TotalPrice: 0};
  cartList = [];
  productQuantity: any;
  isAvailabele = false;
  lblMessage: string;
  product: ProductDetails = new ProductDetails();
  searchProduct: SearchProduct = new SearchProduct();
  constructor(private productService: ProductService
    ,         private route: ActivatedRoute
    ,         private router: Router
    ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.searchProduct.ProductId = id;
        this.productService.GetAllProductList(this.searchProduct).subscribe((productDetail: any) => {
          if (productDetail) {
            this.product = productDetail[0];
          } else {
            console.log(
              `Product with id '${id}' not found, returning to list`
            );
          }
        });
      }
    });
  }

  SelectedImage(image) {
    this.product.DefaultImage = image;
  }

  addTocart(productId) {
    this.cartDetails.ProductId = productId;
    this.cartDetails.ProductImage = this.product.DefaultImage;
    this.cartDetails.ProductName = this.product.CategoryName + ' - ' + this.product.BrandName;
    this.cartDetails.Quantity = this.productQuantity;
    this.cartDetails.UnitPrice = this.product.TaxIncludedPrice;
    this.cartDetails.TotalPrice = (this.product.TaxIncludedPrice) * (parseFloat(this.productQuantity));
    if ( sessionStorage.getItem('CartList') !== null && sessionStorage.getItem('CartList') !== undefined) {
      this.cartList = JSON.parse(sessionStorage.getItem('CartList'));
      this.cartList.push(this.cartDetails);
    } else {
      this.cartList.push(this.cartDetails);
    }
    sessionStorage.setItem('CartList', JSON.stringify(this.cartList));
    this.gotoList();
  }

  validatequantity() {
    if (parseFloat(this.productQuantity) > this.product.AvailableQuantity) {
      this.lblMessage = 'Invalid';
      this.isAvailabele = false;
    } else {
      this.lblMessage = '';
      this.isAvailabele = true;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/cart-list']);
  }
}
