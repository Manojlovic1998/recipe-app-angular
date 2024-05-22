import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  index: number;
  editIngredient: Ingredient;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientSelected.subscribe(
      (index: number) => {
        this.index = index;
        this.editMode = true;
        this.editIngredient = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          text: this.editIngredient.text,
          quantity: this.editIngredient.quantity,
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(f: NgForm) {
    const text = f.value.text;
    const quantity = f.value.quantity;
    const ingredient = new Ingredient(text, quantity);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.index, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    f.reset();
    this.editMode = false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.index);
    this.onClear();
  }
}
