import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import OrderService from '../Shared/api/order.service';
import Order from '../Shared/models/Order';
import OrderDetail from '../Shared/models/OrderDetail';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  providers: [OrderService]
})
export class CartListComponent implements OnInit, OnDestroy  {
  cartListItem: any;
  grandTotal: number;
  sub: Subscription;
  order: Order = new Order();
  orderDetail: OrderDetail = new OrderDetail();
  loginDetail: any;
  constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {});
    this.cartListItem = JSON.parse(sessionStorage.getItem('CartList'));
    this.calculateGrandTotal(this.cartListItem);
  }

  removefromcart(productId) {
    this.cartListItem = JSON.parse(sessionStorage.getItem('CartList'));
    this.findAndRemove(this.cartListItem, 'ProductId', productId);
    sessionStorage.setItem('CartList', JSON.stringify(this.cartListItem));
  }

  findAndRemove(array, property, value) {
    // tslint:disable-next-line:only-arrow-functions
    array.forEach(function(result, index) {
      if (result[property] === value) {
        // Remove from array
        array.splice(index, 1);
      }
    });
    this.calculateGrandTotal(this.cartListItem);
  }

  addquantity(productId) {
    this.findElementById(this.cartListItem, 'ProductId', productId, 'Add');
    this.calculateGrandTotal(this.cartListItem);
  }

  removequantity(productId) {
    this.findElementById(this.cartListItem, 'ProductId', productId, 'Remove');
    this.calculateGrandTotal(this.cartListItem);
  }

  findElementById(array, property, value, type) {
    if (type === 'Add') {
      // tslint:disable-next-line:only-arrow-functions
      array.forEach(function(result, index) {
        if (result[property] === value) {
          result.Quantity = parseFloat(result.Quantity) + 1;
          result.TotalPrice = parseFloat(result.Quantity) * parseFloat(result.UnitPrice);
        }
      });
    } else if (type === 'Remove') {
      // tslint:disable-next-line:only-arrow-functions
      array.forEach(function(result, index) {
        if (result[property] === value) {
          result.Quantity = parseFloat(result.Quantity) - 1;
          result.TotalPrice = parseFloat(result.Quantity) * parseFloat(result.UnitPrice);
        }
      });
    }
  }

  calculateGrandTotal(array) {
    this.grandTotal = 0;
    if (array  !== null && array !== undefined) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < array.length; i++) {
        this.grandTotal = this.grandTotal + parseFloat(array[i].TotalPrice);
      }
    }
  }

  placeOrder() {
    // tslint:disable-next-line:no-debugger
    if (sessionStorage.getItem('LoginDetails') !== null && sessionStorage.getItem('LoginDetails') !== undefined) {
      this.cartListItem = JSON.parse(sessionStorage.getItem('CartList'));
      this.loginDetail = JSON.parse(sessionStorage.getItem('LoginDetails'));

      this.order.Amount = this.grandTotal;
      this.order.BillingAddressId = null;
      this.order.ShippingAddressId = null;
      this.order.PaymentTypeId = null;
      this.order.StatusId = null;
      this.order.CustomerId = this.loginDetail.CustomerId;

      this.orderService.MakeNewOrder(this.order).subscribe(
        result => {
          // tslint:disable-next-line:prefer-for-of
          if(result) {
            for (let i = 0; i < this.cartListItem.length; i++) {
              this.orderDetail.OrderId = result.OrderId;
              this.orderDetail.ProductId = this.cartListItem[i].ProductId;
              this.orderDetail.Quantity = this.cartListItem[i].Quantity;
              this.orderDetail.TotalPrice = this.cartListItem[i].TotalPrice;
  
              this.orderService.InsertOrderDetails(this.orderDetail).subscribe(data => {
  
              });
            }
            sessionStorage.removeItem('CartList');
            this.router.navigate(['/order-list']);
          }
        },
        error => console.error(error)
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/cart-list']);
  }
}
