import { Component, OnInit } from "@angular/core";

import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.dishService.getDishes().then(dishes => (this.dishes = dishes));
  }

  onSelect(dish: Dish) {
    if (dish === this.selectedDish) {
      this.selectedDish = null;
    } else {
      this.selectedDish = dish;
    }
  }
}
