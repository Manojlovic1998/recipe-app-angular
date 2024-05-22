import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    // All the components, directives, and pipes that are required in this module
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    // All the modules that are required in this module
    FormsModule,
    CommonModule,
    ShoppingListRoutingModule,
  ],
})
export class ShoppingListModule {}
