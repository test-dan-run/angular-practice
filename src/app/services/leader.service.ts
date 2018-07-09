import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";

import { map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { Restangular } from "ngx-restangular";

@Injectable({
  providedIn: "root"
})
export class LeaderService {
  constructor(private restangular: Restangular) {}
  getLeaders(): Observable<Leader[]> {
    return this.restangular.all("leaders").getList();
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one("leaders", id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular
      .all("leaders")
      .getList({ featured: true })
      .pipe(map(leaders => leaders[0]));
  }
}
