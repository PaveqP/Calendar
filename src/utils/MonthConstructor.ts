import axios from "axios";
import { DayConstructor } from "./DayConstructor"

type MonthType = {
    [key: string]: number;
}

type ResultType = {
    [key: string]: any;
}

export class MonthConstructor {

    months: MonthType = {}
    result: ResultType = {}
    loading: boolean = false

    constructor() {
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

    async setResult() {
        this.loading = true;
        const date = new Date()
        const year = date.getFullYear()

        const dataString = await this.getDataType(String(year));
        
        let dayIndex = 0;

        const sortedMonths = Object.keys(this.months).sort((a, b) => parseInt(a) - parseInt(b));

        for (const key of sortedMonths) {
            this.result[key] = [];

            for (let i = 1; i <= this.months[key]; i++) {
                const data = dataString[dayIndex];

                if (data !== undefined) {
                    const day = new DayConstructor(String(i), String(key), String(year), data);
                    this.result[key].push(day);
                }

                dayIndex++;
            }
        }

        this.loading = false;
    }

    getDataType = async (year: string) => {
        // const response = await axios.get(`https://isdayoff.ru/api/getdata?year=${year}`);
        // response && console.log(response)
        // return response.data;
        return '111111110000110000011000001100000110000011000001100001110000011000011100000110000011000001100000110000011000001100000011110011000111100000110000011000001100000110010011000001100000110000011000001100000110000011000001100000110000011000001100000110000011000001100000110000011000001100000110000011000001100000011000011000001100000110000011000001100000110000011000000111'
    }

    getResult() {
        return this.result;
    }

    isLoading() {
        return this.loading;
    }
}
