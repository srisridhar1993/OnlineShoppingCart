import M_ProductImage from './M_ProductImage';

export default class ProductDetails {
    ProductId: number;
    ProductName: string;
    CategoryId: number;
    CategoryName: string;
    BrandId: number;
    BrandName: string;
    Tags: string;
    DefaultImage: string;
    Description: string;
    InStock: boolean;
    CreatedBy: number;
    CreatedDate: Date;
    UpdatedBy: number;
    UpdatedDate: Date;
    Quantity: number;
    ProductInventoryId: number;
    SellQuantity: number;
    SKU: string;
    AvailableQuantity: number;
    ProductPriceId: number;
    TaxExcludedPrice: number;
    TaxIncludedPrice: number;
    TaxRate: number;
    ComparedPrice: number;
    ExtraShippingFees: number;
    ProductShippingId: number;
    Height: number;
    Width: number;
    Depth: number;
    Color: string;
    Weight: number;
    RowNumber: number;
    ProductImage: Array<M_ProductImage>;
}
