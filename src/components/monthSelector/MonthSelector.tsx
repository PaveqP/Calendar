import React, {FC} from 'react'
import './MonthSelector.scss'

interface IMonthSelector {
    selectedMonth: string
    setSelectedMonth: (selectedMonth: string) => void
    showByWeek: boolean
    setShowByWeek: (showByWeek: boolean) => void
}
const MonthSelector:FC<IMonthSelector> = ({selectedMonth, setSelectedMonth, showByWeek, setShowByWeek}) => {
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
        <div className="selector__history">
            <div className="history__holiday">
                <div className="history-example holiday-example">

                </div>
                <p className="history-description">
                    - Выходные/Праздничные дни
                </p>
            </div>
            <div className="history__workday">
                <div className="history-example work-example">
                    
                </div>
                <p className="history-description">
                    - Рабочие дни
                </p>
            </div>
            <div className="history__showWeeks">
                <input type="checkbox" checked={showByWeek} onChange={() => setShowByWeek(!showByWeek)}/>
                <p>Отображать по неделям</p>
            </div>
        </div>
    </section>
  )
}

export {MonthSelector}
