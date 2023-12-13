'use client'

import { DateRange ,Range, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
  
interface CalandarProps{
    value:Range
    onChange:(value:RangeKeyDict)=>void;
    disableDate?:Date[];
}

const Calendar:React.FC<CalandarProps> = ({
    value,
    onChange,
    disableDate,
 
})=>{

 

return(<>
  <DateRange
  rangeColors={['#262626']}
  ranges={[value]}
  date={new Date()}
  onChange={onChange}
  direction="vertical"
  showDateDisplay={false}
  minDate={new Date()}
  disabledDates={disableDate}
   />
</>)
}




export default Calendar;