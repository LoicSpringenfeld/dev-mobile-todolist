export class TodoItem {
    id: number;
    title: string;
    category: string;
    endDate: Date;
    //Utile ?
    isComplete: boolean;

    constructor(id: number, title: string, category: string, endDate: Date, isComplete: boolean) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.endDate = endDate;
        this.isComplete = this.isComplete;
    }

    public get getId(): number {
        return this.id;
    }

    public get getTitle(): string {
        return this.title;
    }

    public get getCategory(): string {
        return this.category;
    }

    public get getEndDate(): Date {
        return this.endDate;
    }

    public get getIsComplete(): boolean {
        return this.isComplete;
    }

    public set setId(id: number) {
        this.id = id;
    }

    public set setTitle(title: string) {
        this.title = title;
    }

    public set setCategory(category: string) {
        this.category = category;
    }

    public set setEndDate(endDate: Date) {
        this.endDate = endDate;
    }

    public set setIsComplete(isComplete: boolean) {
        this.isComplete = isComplete;
    }
}
