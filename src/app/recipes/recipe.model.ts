import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public label: string;
  public image: string;
  public source: string;
  public url: string;
  public shareAs: string;
  public dietLabels: string[];
  public ingredientLines: string[];
  public ingredients: Ingredient[];
  public calories: number;
  public totalWeight: number;
  public totalTime: number;
  public cuisineType: string[];
  public mealType: string[];
  public dishType: string[];
  public tags: string[];

  constructor(label: string, image: string, ingredients: Ingredient[]) {
    this.label = label;
    this.image = image;
    this.ingredients = ingredients;
  }
}
