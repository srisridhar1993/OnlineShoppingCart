import { Component, OnInit } from '@angular/core';
import SearchProduct from '../Shared/models/SearchProduct';
import ProductService from '../Shared/api/product.service';
import ProductDetails from '../Shared/models/ProductDetails';

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.css']
})
export class ProductShopComponent implements OnInit {
  searchProduct: SearchProduct = new SearchProduct();
  products: ProductDetails[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.GetAllProductList(this.searchProduct).subscribe(data => {
      this.products = data as unknown as ProductDetails[];
    });
  }

}
