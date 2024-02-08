import { Recipe } from './recipe.model';
import { faker } from '@faker-js/faker';

export class RecipeService {
  private recipes: Recipe[] = [];

  constructor() {
    this.generateRecipes();
  }

  getRecipes() {
    // New array with the same elements
    return this.recipes.slice();
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
