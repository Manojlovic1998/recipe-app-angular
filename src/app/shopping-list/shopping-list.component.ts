import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [];

  constructor() {
    this.generateIngredients();
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  private generateIngredients() {
    for (let i = 0; i < 3; i++) {
      this.ingredients.push(this.generateIngredient());
    }
  }

  private generateIngredient() {
    return new Ingredient(
      faker.lorem.word(5),
      faker.number.int({ min: 1, max: 10 })
    );
  }
}
