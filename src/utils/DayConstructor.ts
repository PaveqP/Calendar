type TaskType = {
    id: number
    name: string
    status: string
}

export class DayConstructor {

    day: string
    month: string
    year: string
    type: string
    
    constructor(day: string, month: string, year: string, type: string){
        this.day = day
        this.month = month
        this.year = year
        this.type = type
    }

    getFullDate(){
        return `${String(this.day)}. ${String(this.month)}. ${String(this.year)}`
    }

    getType(){
        return this.type
    }
}