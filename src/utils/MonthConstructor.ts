import { DayConstructor } from "./DayConstructor"

type MonthType = {
    [key: string]: number;
}

type ResultType = {
    [key: string]: any;
}

export class MonthConstructor{

    months: MonthType = {}
    result: ResultType = {}

    constructor(){
        this.months = {
            '01': 31,
            '02': 29,
            '03': 31,
            '04': 30,
            '05': 31,
            '06': 30,
            '07': 31,
            '08': 31,
            '09': 30,
            '10': 31,
            '11': 30,
            '12': 31
        }
        this.result = {}
    }

    setResult(){
        const date = new Date()
        const year = date.getFullYear()

        for (const key in this.months) {
            this.result[key] = []

            for(let i = 1; i <= this.months[key]; i++){
                const day = new DayConstructor(String(i), String(key), String(year), [])
                this.result[key].push(day)
            }
        }
    }

    getResult(){
        return this.result
    }
}