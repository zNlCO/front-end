export interface Todo {
    id?: string;
    title: string;
    dueDate?: Date;
    completed: boolean;
    expired: boolean;
    createdBy: string;
    assignTo: string;
}