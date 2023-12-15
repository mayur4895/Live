'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
 
import { IconType } from "react-icons"
import * as React from 'react';
import queryString from "query-string";
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
 interface CategoryProps{
    label :String,
    icon:IconType,
    seleced?:boolean, 

 }


const CategoryBox:React.FC<CategoryProps> = ({label,icon:Icon,seleced})=>{

    const router =  useRouter();
    const  params =   useSearchParams();

   const  handleClick = useCallback(()=>{
          let currentQuery = {}

          if(params){
            currentQuery = queryString.parse(params.toString());
          }

const updatedQuery:any ={
...currentQuery,
category:label
}

if(params?.get('category') === label){   
    delete updatedQuery.category;
}
const url = queryString.stringifyUrl({
 url:"/",
 query:updatedQuery,
},{skipNull:true})
router.push(url);
   },[router,params,label])


    return(
        

<div>
<Card onClick={handleClick} className={`border w-32    hover:text-slate-800 transition-all    cursor-pointer flex flex-col items-center gap-3 p-3 border-b-2 
         ${seleced ?  'border-yellow-400 bg-yellow-50 border'    : 'border ' } 
         ${seleced ?  'text-slate-800'    : 'text-slate-500 ' }
         `}> 
<div className="    place-items-center    grid">
<CardContent className="text-center ">
  <Icon  size={26} className=" translate-y-2"/>
  </CardContent>
  <CardFooter className="py-0">
  <div className="text-sm">{label}</div>
  </CardFooter>
</div>
</Card>
</div>

    )
}

export default CategoryBox