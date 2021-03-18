export default class Order {
    OrderId: number;
    CustomerId: number;
    StatusId: number;
    ShippingAddressId: number;
    BillingAddressId: number;
    Amount: number;
    CreatedDate: Date;
    UpdatedDate: Date;
    PaymentTypeId: number;
    OrderNumber: string;
}
