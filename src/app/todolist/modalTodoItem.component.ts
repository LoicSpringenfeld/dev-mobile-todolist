import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { EventData } from "tns-core-modules/data/observable";
import { LocalStorage } from "./localStorage";
import { TodoItemComponent } from "./todoItem.component";

@Component({
    selector: "Modal",
    templateUrl: "./modalTodoItem.component.html",
    moduleId: module.id
})
export class ModalTodoItemComponent implements OnInit {

    localStorage: LocalStorage;
    categories: Array<string> = ["Nourriture", "Sport", "Loisir", "Apprentissage", "Global"];
    title: string;
    endDate: Date;
    category: string;
    titleIsNull: boolean;
    endDateIsNull: boolean;

    constructor(private modalDialogParams: ModalDialogParams, private todoItemComponent: TodoItemComponent) {}

    ngOnInit() {
        this.localStorage = new LocalStorage();
    }

    public onSelectedIndexChanged(args: EventData) {
        const picker = <ListPicker>args.object;
    }

    addTodoItem() {
        this.titleIsNull = false;
        this.endDateIsNull = false;
        if(this.title == null) {
            this.titleIsNull = true;
        } else if(this.endDate == null) {
            this.endDateIsNull = true;
        } else {
        this.localStorage.addTodoItem(this.modalDialogParams.context.todoId, this.title, this.endDate, this.categories[this.category]);
        this.modalDialogParams.closeCallback();
        this.todoItemComponent.refreshListView();
        }
    }

}
