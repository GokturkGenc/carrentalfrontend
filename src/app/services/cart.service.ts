import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car:Car){
    let item = CartItems.find(c=>c.car.carId===car.carId)
    let cartItem = new CartItem();
    cartItem.car=car;
    CartItems.push(cartItem)
  }

  list():CartItem[]{
    return CartItems;
  }

  
}
