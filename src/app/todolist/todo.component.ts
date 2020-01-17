import { Component, OnInit } from "@angular/core";

import { Todo } from "./todo";
import { LocalStorage } from "./localStorage";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "todos",
    templateUrl: "./todo.component.html"
})
export class TodoComponent implements OnInit {
    localStorage: LocalStorage;
    todos: Array<Todo>;

    ngOnInit(): void {
        this.localStorage = new LocalStorage();
        this.refreshListView();
    }

    refreshListView() {
        this.todos = this.localStorage.getTodos();
    }

    showModalNew() {
        dialogs.prompt({
            title: "Nouvelle liste de tâches",
            message: "Entrer le titre de la nouvelle liste",
            okButtonText: "Valider",
            cancelButtonText: "Annuler",
            inputType: dialogs.inputType.text
        }).then(r => {
            if (r.result && r.text != "") {
                this.localStorage.addTodo(r.text);
                this.refreshListView();
            }
        });
    }

    showModalDelete(todo: Todo){
        dialogs.confirm({
            title: "Supprimer \"" + todo["title"] + "\" ?",
            message: "La suppression de cette liste entraînera aussi celle de ses données.",
            okButtonText: "Supprimer",
            cancelButtonText: "Annuler"
        }).then(r => {
            if(r) {
                this.localStorage.removeTodo(todo["id"]);
                this.refreshListView();
            }
        })
    }
    showModalEdit(todo: Todo){
        dialogs.prompt({
            title: "Modifier " + todo["title"],
            message: "Modifier le titre de la tâche.",
            okButtonText: "Modifier",
            cancelButtonText: "Annuler",
            defaultText: todo["title"],
            inputType: dialogs.inputType.text
        }).then(r => {
            if (r.result && r.text != "") {
                this.localStorage.editTodo(todo["id"], r.text);
                this.refreshListView();
            }
        })
    }
}
