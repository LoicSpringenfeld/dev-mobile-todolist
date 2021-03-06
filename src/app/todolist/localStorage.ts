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

    addTodoItem(todoId: number, title: string, endDate: Date, category: string) {
        var todos = this.getTodos();
        var todo = this.getTodo(todoId);
        var nextId = this.getTodoItemNextId();
        todo["todoItem"].push(new TodoItem(nextId, title, category, endDate, false));
        ApplicationSettings.setNumber("todoItemCurrentId", nextId);
        todos[this.getTodoPosition(todoId)] = todo;
        this.setTodos(todos);
    }

    getTodoItemNextId(): number {
        var currentId = ApplicationSettings.getNumber("todoItemCurrentId");
        if (currentId == null) {
            ApplicationSettings.setNumber("todoItemCurrentId", 0);
            return currentId = 0;
        } else {
            return currentId + 1;
        }
    }

    getTodoItemPosition(todo: Todo, todoItemid: number): number {
        var position;
        for (var i in todo["todoItem"]) {
            if (todoItemid == todo["todoItem"][i]["id"]) {
                position = i;
            }
        }
        return position;
    }

    removeTodoItem(todoId: number, todoItemId: number) {
        var todo = this.getTodo(todoId);
        todo["todoItem"].splice(this.getTodoItemPosition(todo, todoItemId), 1);
        this.setTodo(todo);
    }

    setTodo(todo: Todo) {
        var todos = this.getTodos();
        todos[this.getTodoPosition(todo["id"])] = todo;
        this.setTodos(todos);
    }

    changeStatTodoItem(todoId: number, todoItemId: number) {
        var todo = this.getTodo(todoId);
        todo["todoItem"][this.getTodoItemPosition(todo, todoItemId)]["isComplete"] = !todo["todoItem"][this.getTodoItemPosition(todo, todoItemId)]["isComplete"];
        this.setTodo(todo);
    }

    getTodoItemComplete(todoId: number): Array<TodoItem> {
        var todo = this.getTodo(todoId);
        var todoItemComplete = new Array<TodoItem>();
        for(var i in todo["todoItem"]) {
            if(todo["todoItem"][i]["isComplete"]) {
                todoItemComplete.push(todo["todoItem"][i]);
            }
        }
        return todoItemComplete;
    }

    getTodoItemNotComplete(todoId: number): Array<TodoItem> {
        var todo = this.getTodo(todoId);
        var todoItemNotComplete = new Array<TodoItem>();
        for(var i in todo["todoItem"]) {
            if(!todo["todoItem"][i]["isComplete"]) {
                todoItemNotComplete.push(todo["todoItem"][i]);
            }
        }
        return todoItemNotComplete;
    }
}
