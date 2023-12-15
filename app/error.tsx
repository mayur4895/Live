'use client'

import Empty from "@/components/emptyState"
import { useEffect } from "react"


interface ErrorStateProps{
    error:Error
}


const ErrorState:React.FC<ErrorStateProps> = ({
    error
})=>{

  useEffect(()=>{
       console.error(error);
       
  },[error])

    return(<>
    <Empty
    title="Server Error"
    subtitle="Something Went Wrong"
    />
    
    </>)
}

export default ErrorState;