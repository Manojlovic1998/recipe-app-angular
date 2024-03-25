import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { faker } from '@faker-js/faker';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {
    this.generateRecipes();
  }

  getRecipes() {
    // New array with the same elements
    console.log('getRecipes');
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // Add ingredients to shopping list
    this.slService.addIngredients(ingredients);
  }

  private generateRecipes() {
    for (let i = 0; i < 3; i++) {
      this.recipes.push(this.generateRecipe(i));
    }
  }

  private generateRecipe(id: number) {
    return new Recipe(
      id,
      faker.lorem.words(),
      faker.lorem.paragraph(),
      faker.image.urlLoremFlickr({ category: 'food', width: 300, height: 300 }),
      this.generateIngredients()
    );
  }

  private generateIngredients() {
    const ingredients: Ingredient[] = [];
    for (let i = 0; i < 3; i++) {
      ingredients.push(this.generateIngredient());
    }

    return ingredients;
  }

  private generateIngredient() {
    return new Ingredient(
      faker.lorem.word(5),
      faker.number.int({ min: 1, max: 10 })
    );
  }
}
