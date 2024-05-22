import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { th } from '@faker-js/faker';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  private id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    // Navigate back
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        text: new FormControl(null, [Validators.required]),
        quantity: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    // Sensible defaults
    let label = '';
    let image = '';
    let source = ''; // Not used
    let url = ''; // Not used
    let shareAs = ''; //  Not used
    let dietLabels = []; // Not used
    let ingredientLines = []; // Not used
    let ingredients = new FormArray([], Validators.required);
    let calories = ''; // Not used
    let totalWeight = ''; // Not used
    let totalTime = ''; // Not used
    let cuisineType = ''; // Not used
    let mealType = ''; // Not used
    let dishType = ''; // Not used
    let tags = ''; // Not used

    if (this.editMode) {
      // Get the recipe from the recipe service
      const recipe = this.recipeService.getRecipe(this.id);
      // Set the recipe values to the form
      label = recipe.label;
      image = recipe.image;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              text: new FormControl(ingredient.text, [Validators.required]),
              quantity: new FormControl(ingredient.quantity, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      label: new FormControl(label, [Validators.required]),
      image: new FormControl(image, [Validators.required]),
      ingredients: ingredients,
    });
  }
}
