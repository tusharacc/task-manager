export interface TaskStructure {
    taskId?: string;
    task?: string,
    parentTask?: string,
    startDate?: Date,
    endDate?: Date,
    complete?: boolean,
    priority?: number
}

export interface PostTaskStructure {
    task?: string,
    parentTask?: string,
    startDate?: Date,
    endDate?: Date,
    complete?: boolean,
    priority?: number
}

export interface AddedTaskStructure extends PostTaskStructure  {
    status?: string;
    comment?: string;
}