import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { faker } from '@faker-js/faker';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { EdmanRecipe } from '../shared/data-storage.service';

@Injectable()
export class RecipeService {
  private recipes: Array<Recipe | EdmanRecipe['recipe']> = [];
  private dataBaseRecipes: Recipe[] = [];

  recipesChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {}

  setRecipes(
    recipes: Array<Recipe | EdmanRecipe['recipe']>,
    dataBaseRecipes: Recipe[]
  ) {
    this.recipes = recipes;
    this.dataBaseRecipes = dataBaseRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    // New array with the same elements
    return this.recipes.slice();
  }

  getDataBaseRecipes() {
    return this.dataBaseRecipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.dataBaseRecipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    // Update the database recipe
    this.dataBaseRecipes.forEach((recipe, i) => {
      if (this.recipes[index].label === recipe.label) {
        this.dataBaseRecipes[i] = newRecipe;
      }
    });
    // Update bundled recipes array
    this.recipes[index] = newRecipe;

    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    // Delete the database recipe
    this.dataBaseRecipes.forEach((recipe, i) => {
      if (this.recipes[index].label === recipe.label) {
        this.dataBaseRecipes.splice(i, 1);
      }
    });
    this.recipes.splice(index, 1);

    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // Add ingredients to shopping list
    this.slService.addIngredients(ingredients);
  }
}
