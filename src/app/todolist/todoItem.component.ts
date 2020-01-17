import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { TodoItem } from "./todoItem";
import { Todo } from "./todo";
import { LocalStorage } from "./localStorage";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ModalTodoItemComponent } from "./modalTodoItem.component";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: "todo",
    templateUrl: "./todoItem.component.html",
    styleUrls: ["./todoItem.component.css"]
})
export class TodoItemComponent implements OnInit {
    localStorage: LocalStorage;
    todo: Todo;
    todoItemComplete: Array<TodoItem>;
    todoItemNotComplete: Array<TodoItem>;

    constructor(private route: ActivatedRoute, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef, private router : RouterExtensions) {}

    ngOnInit(): void {
        this.localStorage = new LocalStorage();
        this.refreshListView();
    }

    refreshListView() {
        this.todo = this.localStorage.getTodo(+this.route.snapshot.params.id);
        this.todoItemComplete = this.localStorage.getTodoItemComplete(+this.route.snapshot.params.id);
        this.todoItemNotComplete = this.localStorage.getTodoItemNotComplete(+this.route.snapshot.params.id);
    }

    back() {
        this.router.back();
    }

    public showModalNew() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { todoId: +this.route.snapshot.params.id }
        };
        this.modalService.showModal(ModalTodoItemComponent, options);
    }

    showModalDelete(todoItem: TodoItem) {
        dialogs.confirm({
            title: "Supprimer la tâche \"" + this.todo["title"] + todoItem["title"] + "\" ?",
            message: "La tâche sera supprimer de la liste \"" + this.todo["title"] + "\" ?",
            okButtonText: "Supprimer",
            cancelButtonText: "Annuler"
        }).then(r => {
            if(r) {
                this.localStorage.removeTodoItem(this.todo["id"], todoItem["id"]);
                this.refreshListView();
            }
        })
    }

    changeStatTodoItem(todoItem: TodoItem) {
        this.localStorage.changeStatTodoItem(this.todo["id"], todoItem["id"]);
        this.refreshListView();
    }
}
