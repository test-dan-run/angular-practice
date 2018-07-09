import { Component, OnInit, Inject } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comment } from "../shared/comment";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.css"],
  animations: [
    trigger("visibility", [
      state(
        "shown",
        style({
          transform: "scale(1.0)",
          opacity: 1
        })
      ),
      state(
        "hidden",
        style({
          transform: "scale(0.5)",
          opacity: 0
        })
      ),
      transition("* => *", animate("0.5s ease-in-out"))
    ])
  ]
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;
  visibility = "shown";

  // Create comment form variables
  commentForm: FormGroup;
  comment: Comment;
  formErrors = {
    author: "",
    comment: ""
  };
  // Create validation messages for comment form
  validationMessages = {
    author: {
      required: "Author's name is required.",
      minlength: "Author's name must be at least 2 characters long",
      maxlength: "Author's name cannot exceed 25 characters"
    },
    comment: {
      required: "Comment is required.",
      minlength: "Comment must be at least 2 characters long"
    }
  };

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject("BaseURL") private BaseURL
  ) {}

  ngOnInit() {
    this.createForm();

    this.dishservice
      .getDishIds()
      .subscribe(dishIds => (this.dishIds = dishIds));

    this.route.params
      .switchMap((params: Params) => {
        this.visibility = "hidden";
        return this.dishservice.getDish(+params["id"]);
      })
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = "shown";
      }, errmess => (this.errMess = <any>errmess));
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }
  // Create form for comments
  createForm() {
    this.commentForm = this.fb.group({
      author: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      rating: 5,
      comment: ["", [Validators.required, Validators.minLength(2)]]
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = "";
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + " ";
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment["date"] = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save().subscribe(dish => (this.dish = dish));

    this.commentForm.reset({
      author: "",
      rating: 5,
      comment: ""
    });
  }

  goBack(): void {
    this.location.back();
  }
}
