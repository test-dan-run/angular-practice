import { Component, OnInit, Input } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comment } from "../shared/comment";

import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.css"]
})
export class DishdetailComponent implements OnInit {
  @Input() dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

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
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice
      .getDishIds()
      .subscribe(dishIds => (this.dishIds = dishIds));

    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params["id"]))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
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
    this.comment["date"] = Date.now().toString();
    this.dish.comments.push(this.comment);

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
