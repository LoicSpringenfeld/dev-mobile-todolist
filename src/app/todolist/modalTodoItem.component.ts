import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { EventData } from "tns-core-modules/data/observable";
import { LocalStorage } from "./localStorage";
import { TodoItemComponent } from "./todoItem.component";
//import { DataService } from "../../shared/data.service";
//import { Todo, TodoItem } from "~/app/shared/todo";

@Component({
    selector: "Modal",
    templateUrl: "./modalTodoItem.component.html",
    moduleId: module.id
})
export class ModalTodoItemComponent implements OnInit {

    //todoItemComponent: TodoItemComponent;
    localStorage: LocalStorage;
    categories: Array<string> = ["Nourriture", "Sport", "Loisir", "Apprentissage", "Global"];
    title: string;
    endDate: Date;
    category: string;
    titleIsNull: boolean;
    endDateIsNull: boolean;

    constructor(private modalDialogParams: ModalDialogParams, private todoItemComponent: TodoItemComponent) {}

    ngOnInit() {
        /*if(this.params.context.todoid != undefined){
            let todoItem = this.todoservice.getItem(this.params.context.todoid)
            this.nameTodo = todoItem.name;
            this.descTodo = todoItem.desc;
            this.modif = true;
            this.nouveau = false;
            this.id = this.params.context.todoid;
            console.log(this.id)
        }else{
            this.id = this.params.context.newId
            console.log(this.id)

        }*/
        this.localStorage = new LocalStorage();
    }

    public onSelectedIndexChanged(args: EventData) {
        const picker = <ListPicker>args.object;
        //console.log(`index: ${picker.selectedIndex}; item" ${this.categories[picker.selectedIndex]}`);
    }

    addTodoItem() {
        this.titleIsNull = false;
        this.endDateIsNull = false;
        if(this.title == null) {
            console.log("--- Title is null");
            this.titleIsNull = true;
        } else if(this.endDate == null) {
            this.endDateIsNull = true;
        } else {
        this.localStorage.addTodoItem(this.modalDialogParams.context.todoId, this.title, this.endDate, this.categories[this.category]);
        //this.todoItemComponent.addTodoItem(this.title, this.endDate, this.category);
        this.modalDialogParams.closeCallback();
        this.todoItemComponent.refreshListView();
        }
    }

}
