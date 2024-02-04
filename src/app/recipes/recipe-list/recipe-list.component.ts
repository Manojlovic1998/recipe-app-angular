import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() {
    this.generateRecipes();
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

  private generateRecipes() {
    for (let i = 0; i < 3; i++) {
      this.recipes.push(this.generateRecipe());
    }
  }

  private generateRecipe() {
    return new Recipe(
      faker.lorem.words(),
      faker.lorem.paragraph(),
      faker.image.urlLoremFlickr({ category: 'food', width: 300, height: 300 })
    );
  }
}
