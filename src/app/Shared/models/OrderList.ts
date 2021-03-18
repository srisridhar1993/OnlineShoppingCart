import OrderMaster from './OrderMaster';
import OrderChild from './OrderChild';

export default class OrderList {
    OrderMasters: Array<OrderMaster>;
    OrderDetails: Array<OrderChild>;
}
