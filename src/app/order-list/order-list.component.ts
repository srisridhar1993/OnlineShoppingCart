import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import OrderService from '../Shared/api/order.service';
import SearchOrder from '../Shared/models/SearchOrder';
import { MatTableDataSource, MatPaginator, MatSort, MatBottomSheet } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import OrderMaster from '../Shared/models/OrderMaster';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService]
})
export class OrderListComponent implements OnInit, OnDestroy {
  orderMaster: OrderMaster[];
  search: SearchOrder = new SearchOrder();
  logindetails: any;
  displayedColumns: string[] = ['CustomerName', 'OrderNumber', 'OrderDate', 'BillingAddress','Amount', 'Action'];
  dataSource = new MatTableDataSource<OrderMaster>(this.orderMaster);
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private route: ActivatedRoute
    , private router: Router
    , private orderService: OrderService
    , private bottomSheet: MatBottomSheet) { }
  sub: Subscription;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {});
    if (sessionStorage.getItem('LoginDetails') !== null && sessionStorage.getItem('LoginDetails') !== undefined) {
      this.logindetails = JSON.parse(sessionStorage.getItem('LoginDetails'));

      this.search.CustomerId=this.logindetails.CustomerId;
      this.orderService.GetOrderList(this.search).subscribe(orderList=>{
        if(orderList) {
          this.orderMaster = orderList.OrderMasters;
          this.dataSource = new MatTableDataSource<OrderMaster>(this.orderMaster);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })

    } else {
      this.router.navigate(['/login']);
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openBottomSheet(orderId): void {
    this.bottomSheet.open(OrderDetailsComponent,{
      data: { OrderId: orderId },
      ariaLabel: "Jitendra Dubey",
      panelClass: 'custom-width-modal',
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
