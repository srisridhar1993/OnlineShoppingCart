import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';
import { Observable } from 'rxjs';
import SearchOrder from '../models/SearchOrder';
import OrderList from '../models/OrderList';

@Injectable()
export default class OrderService {
    public API = 'http://localhost:64861/api/Order';
    // public API = 'http://10.22.28.5:1993/api';
    public ORDER_API = `${this.API}/GetOrderList`;
    public ORDER_EDITAPI = `${this.API}/SaveCustomer?id=`;
    public ORDER_SAVEAPI = `${this.API}/MakeNewOrder`;
    public ORDER_DETAPI = `${this.API}/AddOrderDetails`;

    constructor(private http: HttpClient) {}

    MakeNewOrder(order: Order) {
        let result: Observable<Order>;
        if (order) {
            result = this.http.post<Order>(`${this.ORDER_SAVEAPI}`, order);
        }
        return result;
    }

    InsertOrderDetails(order: OrderDetail) {
        let result: Observable<OrderDetail>;
        if (order) {
            result = this.http.post<OrderDetail>(`${this.ORDER_DETAPI}`, order);
        }
        return result;
    }

    GetOrderList(search: SearchOrder) {
        let result: Observable<OrderList>;
        if (search) {
            result = this.http.post<OrderList>(`${this.ORDER_API}`, search);
        }
        return result;
    }
}
