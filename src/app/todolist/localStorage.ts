import * as ApplicationSettings from 'tns-core-modules/application-settings'

import { Todo } from "./todo";
import { TodoItem } from "./todoItem";

export class LocalStorage {
    constructor() {}

    getTodos(): Array<Todo> {
        var todos = ApplicationSettings.getString("todos");
        return todos == null ? new Array<Todo>() : JSON.parse(todos);
    }

    setTodos(todos: Array<Todo>) {
        ApplicationSettings.setString("todos", JSON.stringify(todos));
    }

    addTodo(title: string) {
        var todos = this.getTodos();
        var nextId = this.getTodoNextId();
        todos.push(new Todo(nextId, title, new Array<TodoItem>()));
        ApplicationSettings.setNumber("todoCurrentId", nextId);
        ApplicationSettings.setString("todos", JSON.stringify(todos));
    }

    getTodoNextId(): number {
        var currentId = ApplicationSettings.getNumber("todoCurrentId");
        if (currentId == null) {
            ApplicationSettings.setNumber("todoCurrentId", 0);
            return currentId = 0;
        } else {
            return currentId + 1;
        }
    }

    getTodoPosition(id: number): number {
        var todos = this.getTodos();
        var position;
        for (var i in todos) {
            if (id == todos[i]["id"]) {
                position = i;
            }
        }
        return position;
    }

    removeTodo(id: number) {
        var todos = this.getTodos();
        todos.splice(this.getTodoPosition(id), 1);
        this.setTodos(todos);
    }

    editTodo(id: number, newTitle: string) {
        var todos = this.getTodos();
        todos[this.getTodoPosition(id)]["title"] = newTitle;
        this.setTodos(todos);
    }

    getTodo(id: number): Todo {
        var todos = this.getTodos();
        var todo = todos[this.getTodoPosition(id)];
        return todo;
    }

    addTodoItem(todoId: number/*, title: string, endDate: Date, category: string*/) {
        var todos = this.getTodos();
        var todo = this.getTodo(todoId);
        //console.log(todo["todoItem"]);
        todo["todoItem"].push(new TodoItem(0, "title", "category", new Date(), false));
        todos[this.getTodoPosition(todoId)] = todo;
        //console.log("-----------------" + todos[this.getTodoPosition(todoId)]["todoItem"][0]["endDate"]);
        this.setTodos(todos);
    }

    //test
    removeAll() {
        ApplicationSettings.clear();
    }



    /*getTodo(id: number): Todo {
        return
    }


    public static set todos(todo: Array<Todo>) {
        ApplicationSettings.setString("todos", JSON.stringify(todo));
    }

    public static get todos(): Array<Todo> {

    }

    public static set categories(category: string) {
        ApplicationSettings.setString("categories", JSON.stringify(category));
    }

    public static get categories(): string {
        var categories = ApplicationSettings.getString("categories");
        return categories == null ? new String() : JSON.parse(categories);
    }*/
}
