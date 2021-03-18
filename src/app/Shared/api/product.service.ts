import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import SearchProduct from '../models/SearchProduct';
import ProductDetails from '../models/ProductDetails';
import M_ProductImage from '../models/M_ProductImage';

@Injectable()
export default class ProductService {
  public API = 'http://localhost:64861/api';
  // public API = 'http://10.22.28.5:1993/api';
  public PRODUCT_API = `${this.API}/Product/`;
  public PRODUCT_IMGAPI = `${this.API}/Product/UploadProductImage`;
  public PRODUCT_SAVEAPI = `${this.API}/Product/SaveProductDetails`;
  public PRODUCT_DELETAPI = `${this.API}/Product/SaveEmployee`;

  constructor(private http: HttpClient) {}

  GetAllProductList(searchProduct: SearchProduct): Observable<ProductDetails> {
    // let result: Observable<ProductDetails>;
    return this.http.post<ProductDetails>(this.PRODUCT_API + 'GetAllProductList/', searchProduct);
  }

  geAllCategory(categoryId: number, parentCategoryId: number) {
    return this.http.get(`${this.PRODUCT_API}/GetAllCategoryList?categoryId=${categoryId.toString()}&parentCategoryId=${parentCategoryId.toString()}`);
  }
  geAllbrand(brandId: number) {
    return this.http.get(`${this.PRODUCT_API}/GetAllBrandList?brandId=${brandId.toString()}`);
  }
  save(product: ProductDetails): Observable<ProductDetails> {
    let result: Observable<ProductDetails>;
    if (product.ProductId) {
      result = this.http.post<ProductDetails>(`${this.PRODUCT_SAVEAPI}`, product);
    } else {
      result = this.http.post<ProductDetails>(this.PRODUCT_SAVEAPI, product);
    }
    return result;
  }
  uploadProductImages(image: M_ProductImage): Observable<M_ProductImage> {
    let result: Observable<M_ProductImage>;
    if (image.ProductImageId) {
      result = this.http.post<M_ProductImage>(`${this.PRODUCT_IMGAPI}`, image);
    } else {
      result = this.http.post<M_ProductImage>(this.PRODUCT_IMGAPI, image);
    }
    return result;
  }
  remove(id: number) {
    return this.http.delete(`${this.PRODUCT_DELETAPI}/${id.toString()}`);
  }
}
