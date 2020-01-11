import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { TodoItem } from "./todoItem";
import { Todo } from "./todo";
import { LocalStorage } from "./localStorage";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "todo",
    templateUrl: "./todoItem.component.html"
})
export class TodoItemComponent implements OnInit {
    localStorage: LocalStorage;
    todo: Todo;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.localStorage = new LocalStorage();
        this.refreshListView();
    }

    refreshListView() {
        this.todo = this.localStorage.getTodo(+this.route.snapshot.params.id);
    }

    public showModalNew() {
        //Créer un dialog custom pour entrer les infos (title, endDate et category)
        this.localStorage.addTodoItem(this.todo["id"]);
        this.refreshListView();
        /*dialogs.prompt({
            title: "Nouvelle tâche",
            message: "Entrez le titre de la nouvelle tâche",
            okButtonText: "Valider",
            cancelButtonText: "Annuler",
            inputType: dialogs.inputType.text
        }).then(r => {
            if (r.result && r.text != "") {
                this.localStorage.addTodoItem(this.todo["id"]);
                this.refreshListView();
            }
        });*/
    }
}
