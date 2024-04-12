import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

export const RecipesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (inject(RecipeService).getRecipes().length === 0) {
    // Fetch recipes only if there are no recipes
    return inject(DataStorageService).fetchRecipes();
  }
  // Return local copy of recipes
  return inject(RecipeService).getRecipes();
};
