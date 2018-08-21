import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel', 'A super-tasty Schnitzel - just awesome!', 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
    new Recipe('Big Fat Burger', 'What else you need to say', 'http://bk-latam-prod.s3.amazonaws.com/sites/burgerkingaw.com/files/ANGUS-STEAKHOUSE.png', [new Ingredient('Buns', 2), new Ingredient('Meat', 1)])
  ];

  constructor(private slService: ShoppingListService) {

  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe( index: number ) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
    // console.log(ingredients);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
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
}
