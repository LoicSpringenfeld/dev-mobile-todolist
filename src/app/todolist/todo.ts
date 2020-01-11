import { TodoItem } from "./todoItem";

export class Todo {
    private id: number;
    private title: string;
    private todoItem: Array<TodoItem>;

    constructor(id: number, title: string, todoItem: Array<TodoItem>) {
        this.id = id;
        this.title = title;
        this.todoItem = todoItem;
    }

    public get getId(): number {
        return this.id;
    }

    public get getTitle(): string {
        return this.title;
    }

    public get getTodoItem(): Array<TodoItem> {
        return this.todoItem;
    }

    public set setId(id: number) {
        this.id = id;
    }

    public set setTitle(title: string) {
        this.title = title;
    }

    public set setTodoItem(todoItem: Array<TodoItem>) {
        this.todoItem = todoItem;
    }
}
