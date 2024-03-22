import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  name: string;
  amount: string;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem(f: NgForm) {
    console.log(f);
    const name = f.value.name;
    const amount = Number(f.value.amount);
    const ingredient = new Ingredient(name, amount);

    this.shoppingListService.addIngredient(ingredient);
  }
}
