'use client'
import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

 

import Modal from "./modal";
import Calendar from "../inputes/Calendar"
import Counter from "../inputes/counter";
import CountrySelect, { 
  CountrySelectValue
} from "../inputes/countryselect";
import userSearchModal from '@/app/hooks/useSearchModal';
enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
    
}   

const SearchModal = ()=>{


   

const router = useRouter();
    const params =  useSearchParams();
  const searchmodal = userSearchModal ();
  const [location ,setlocation] = useState<CountrySelectValue>()
  const [step,setstep ]= useState(STEPS.LOCATION);
  const [GuestCount,setGuestCount] = useState(1);
  const [RoomCount,setRoomCount] = useState(1);
  const [BathRoomCount,setBathRoomCount] = useState(1);
  const [DateRange,setDateRange] = useState<Range>({
    startDate:new Date(),
    endDate:new Date(),
    key:'selection'
  });


const Map = useMemo(()=>dynamic(()=>import('../Map'),{ssr:false}),[location])

const onBack = ()=>{
    setstep((value)=>value - 1)
}
const onNext = ()=>{
    setstep((value)=>value + 1)
}

const onSubmit = useCallback(async()=>{
    if(step !== STEPS.INFO){
        return onNext();
    }
    let currentquery = {};

    if(params){
currentquery = qs.parse(params.toString())
    }

const  updatedquery :any = {
    ...currentquery,
    location:location?.value,
    RoomCount,
    GuestCount,
    BathRoomCount
}

if(DateRange.startDate){
    updatedquery.startDate = formatISO(DateRange.startDate)
}

if(DateRange.endDate){
    updatedquery.endDate = formatISO(DateRange.endDate)
}


const url = qs.stringifyUrl({
    url:"/",
    query:updatedquery
},{skipNull:true})

setstep(STEPS.LOCATION);
searchmodal.onClose();
 router.push(url)
},[setstep,RoomCount,GuestCount,BathRoomCount,searchmodal,STEPS,onNext,params,DateRange,location])

 
const ActionLabeld = useMemo(()=>{
    if(step === STEPS.INFO){
        return "Search"
    }
    return "Next"
    },[step])

 

    const   secondaryActionLabeld = useMemo(()=>{
        if(step === STEPS.LOCATION){
            return  undefined;
        }
        return "Back";
        },[step])
    
 
      
          let bodyContent=(<></>);
   
            if(step === STEPS.LOCATION){
            bodyContent =(
                <>
                <div className="mb-2">
                    <h4 className=" font-semibold text-xl">Which of these location</h4>
                    <p className="text-sm">choose </p>  
                </div>
                
                <CountrySelect
                  value={location}
                  onChange={(value)=>
                    setlocation(value as CountrySelectValue)
                 }  
                 
                 
                />
        
                <Map center={location?.latlng} />
                 </>
            )
            }
       

            if(step === STEPS.DATE){
                bodyContent =(
                     
                <div className=' w-full'>
                <div className="mb-2">
                        <h4 className=" font-semibold text-xl">When do you plan to go?</h4>
                        <p className="text-sm">choose Dates</p>  
                    </div>
                    <div className=' w-full   translate-x-[18%] m-auto'>
                    <Calendar 
                      value={DateRange}
                      onChange={(value)=>setDateRange(value.selection)} 
                     />
                    </div>
                </div>
                   
                )
                }
           
 
 
if(step === STEPS.INFO){
    bodyContent=(
<>
<div className="mb-2">
    <h4 className=" font-semibold text-xl">Basics About your Place</h4>
    <p className="text-sm">to give you satshfied</p>  
</div>

<Counter  
  title="Guests"
  subtitle="No of Gustes?"
  value={GuestCount}
    onChange={(value)=> setGuestCount(value)}
/>
<Counter  
  title="Rooms"
  subtitle="No of Rooms have you?"
  value={RoomCount}
    onChange={(value)=> setRoomCount(value)}
/>
<Counter  
  title="BathRooms"
  subtitle="No of BathRooms have you?"
  value={BathRoomCount}
  onChange={(value)=> setBathRoomCount(value)}
/>
 
 </>
    )
}

    return(

    <Modal  
       isOpen={searchmodal.isOpen}
       onClose={searchmodal.onClose}
       title="Filters"
       onSubmit={onSubmit}   
       body={bodyContent}
       actionlabeld={ActionLabeld}
        secondaryActionLabeld={secondaryActionLabeld}
        secondaryAction={onBack}
 
     /> 
    )
}


export default SearchModal;