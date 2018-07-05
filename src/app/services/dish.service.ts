import { Injectable } from "@angular/core";
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";

import { Observable } from "rxjs/observable";
import "rxjs/add/operator/delay";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DishService {
  constructor() {}
  getDishes(): Observable<Dish[]> {
    return of(DISHES).delay(2000);
  }

  getDish(id: number): Observable<Dish> {
    return of(DISHES.filter(dish => dish.id === id)[0]).delay(2000);
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter(dish => dish.featured)[0]).delay(2000);
  }
}
