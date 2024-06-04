export type DayType = {
    day: string
    month: string
    year: string
    type: string
}

export type ToDoType = {
    id: number
    name: string
    status: string
}

export type MonthsType = {
    [key: string]: DayType[];
};

export type TodosType = {
    [key: string]: ToDoType[];
};