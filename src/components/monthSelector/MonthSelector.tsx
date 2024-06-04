import React, {FC} from 'react'
import './MonthSelector.scss'

interface IMonthSelector {
    selectedMonth: string
    setSelectedMonth: (selectedMonth: string) => void
}
const MonthSelector:FC<IMonthSelector> = ({selectedMonth, setSelectedMonth}) => {
  return (
    <section className='selector'>
      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className='selector-select'>
                <option value="01">Январь</option>
                <option value="02">Февраль</option>
                <option value="03">Март</option>
                <option value="04">Апрель</option>
                <option value="05">Май</option>
                <option value="06">Июнь</option>
                <option value="07">Июль</option>
                <option value="08">Август</option>
                <option value="09">Сентябрь</option>
                <option value="10">Октябрь</option>
                <option value="11">Ноябрь</option>
                <option value="12">Декабрь</option>
        </select>
    </section>
  )
}

export {MonthSelector}
