import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { TodoComponent } from "./todolist/todo.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { TodoItemComponent } from "./todolist/todoItem.component";

const routes: Routes = [
    { path: "", redirectTo: "/todos", pathMatch: "full" },
    { path: "todos", component: TodoComponent },
    { path: "todo/:id", component: TodoItemComponent }

    /*{ path: "", redirectTo: "/items", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent }*/
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
