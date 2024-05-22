import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, switchMap, tap } from 'rxjs';
import { Ingredient } from './ingredient.model';
import { environment } from '../../environments/environment';

export type EdmanRecipes = {
  from: number;
  to: number;
  count: number;
  _links: {
    next: {
      href: string;
      title: string;
    };
  };
  hits: [] | EdmanRecipe[];
};

export type EdmanRecipe = {
  recipe: {
    uri: string;
    label: string;
    image: string;
    images: {
      THUMBNAIL: {
        url: string;
        width: number;
        height: number;
      };
      SMALL: {
        url: string;
        width: number;
        height: number;
      };
      REGULAR: {
        url: string;
        width: number;
        height: number;
      };
    };
    source: string;
    url: string;
    shareAs: string;
    yield: number;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    ingredients: Ingredient[];
    calories: number;
    totalCO2Emissions: number;
    co2EmissionsClass: string;
    totalWeight: number;
    totalTime: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    totalNutrients: any;
    totalDaily: any;
    digest: any;
    tags: string[];
  };
  _links: {
    self: {
      href: string;
      title: string;
    };
  };
};

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private tempRecipes: Array<Recipe | EdmanRecipe['recipe']> = [];
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getDataBaseRecipes();
    // Overwrite the existing data with the new data
    this.http
      .put(environment.firebase.recipesDatabaseUrl, recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.http
      .get<EdmanRecipes>(environment.edamam.apiUrl, {
        params: new HttpParams({
          fromObject: {
            type: 'public',
            app_id: environment.edamam.appId,
            app_key: environment.edamam.appKey,
            q: 'chicken',
          },
        }),
      })
      .pipe(
        map((response) => response.hits.map((hit) => hit.recipe)),
        tap((recipes) => {
          this.tempRecipes.push(...recipes);
        }),
        switchMap(() =>
          this.http.get<Recipe[]>(environment.firebase.recipesDatabaseUrl)
        ),
        map((recipes) => {
          if (!recipes) {
            return [];
          }
          return recipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          }));
        }),
        tap((recipes) => {
          this.tempRecipes.push(...recipes);
          this.recipeService.setRecipes(this.tempRecipes, recipes);
          this.tempRecipes = [];
        })
      );
  }
}
