import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { faker } from '@faker-js/faker';

export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  ingredientAdded = new EventEmitter<Ingredient[]>();

  constructor() {}

  getIngredients() {
    // New array with the same elements
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // Remove all elements from the array
    this.ingredients = [];
    // Add ingredients to shopping list
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
