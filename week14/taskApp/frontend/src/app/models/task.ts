export default class Task {
    _id?: string;
    title?: string;
    _listId?: string;
    completed?: boolean;

    constructor(title: string, completed: boolean){
        this.title = title;
        this.completed = completed;
    }
}