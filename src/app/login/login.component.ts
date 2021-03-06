import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatFormField,
  MatInput
} from "@angular/material";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user = { remember: false };
  constructor(private dialogRef: MatDialogRef<LoginComponent>) {}

  ngOnInit() {}

  onSubmit() {
    console.log("User: ", this.user);
    this.dialogRef.close();
  }
}
