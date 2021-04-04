import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cars:Car[] = [];
  cartItems:CartItem[];
  constructor(private carService:CarService, private cartService:CartService) { }

  ngOnInit(): void {
  }

  getCart(){
    this.cartItems = this.cartService.list();
  }
}
