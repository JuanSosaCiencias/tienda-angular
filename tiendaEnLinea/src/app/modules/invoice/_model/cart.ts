import { Product } from "../../product/_model/product";

export class Cart{
    cart_id: number = 0;
    gtin: string = "";
    image: string = "";
    product: Product = new Product();
    quantity: number = 0;
}