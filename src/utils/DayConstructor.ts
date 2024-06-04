type TaskType = {
    id: number
    name: string
    status: string
}

export class DayConstructor {

    day: string
    month: string
    year: string
    tasks: TaskType[] 
    
    constructor(day: string, month: string, year: string, tasks: []){
        this.day = day
        this.month = month
        this.year = year
        this.tasks = tasks
    }

    getFullDate(){
        return `${String(this.day)}. ${String(this.month)}. ${String(this.year)}`
    }

    getTasks(){
        return this.tasks
    }

    addTask(task: TaskType){
        this.tasks.push(task)
    }

    deleteTask(taskId: number){
        this.tasks = this.tasks.filter((task) => task.id !== taskId)
    }

    changeTask(task: TaskType, taskId: number){
        this.tasks = this.tasks.map((currentTask) => {
            if (currentTask.id === taskId) {
                return task;
            }
            return currentTask;
        });
    }
}