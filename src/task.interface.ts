export interface TaskStructure {
    taskId?: String;
    task?: String,
    parentTask?: String,
    startDate?: Date,
    endDate?: Date,
    complete?: Boolean,
    priority?: Number
}

export interface PostTaskStructure {
    task?: String,
    parentTask?: String,
    startDate?: Date,
    endDate?: Date,
    complete?: Boolean,
    priority?: Number
}