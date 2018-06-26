import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
  MatGridListModule,
  MatListModule,
  MatCardModule
} from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";

import "hammerjs";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { DishdetailComponent } from './dishdetail/dishdetail.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, DishdetailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
