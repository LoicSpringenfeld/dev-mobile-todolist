import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { TodoComponent } from "./todolist/todo.component";
import { TodoItemComponent } from "./todolist/todoItem.component";

const routes: Routes = [
    { path: "", redirectTo: "/todos", pathMatch: "full" },
    { path: "todos", component: TodoComponent },
    { path: "todo/:id", component: TodoItemComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
