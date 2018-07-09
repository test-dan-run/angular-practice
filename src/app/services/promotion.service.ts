import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Restangular } from "ngx-restangular";

import { map } from "rxjs/operators";
import { Promotion } from "../shared/promotion";

@Injectable({
  providedIn: "root"
})
export class PromotionService {
  constructor(private restangular: Restangular) {}
  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all("promotions").getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one("promotions", id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular
      .all("promotions")
      .getList({ featured: true })
      .pipe(map(promotions => promotions[0]));
  }
}
