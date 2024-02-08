import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { faker } from '@faker-js/faker';

export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  ingredientAdded = new EventEmitter<Ingredient[]>();

  constructor() {
    this.generateIngredients();
  }

  getIngredients() {
    // New array with the same elements
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
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
