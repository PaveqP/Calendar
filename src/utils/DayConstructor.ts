export class DayConstructor {
    
    day: string
    month: string
    year: string
    
    constructor(day: string, month: string, year: string){
        this.day = day
        this.month = month
        this.year = year
    }

    getFullDate(){
        return `${String(this.day)}. ${String(this.month)}. ${String(this.year)}`
    }
}