'use client'

import { useState ,useEffect, ReactNode} from "react";

interface clientonlyprops{
    children:React.ReactNode;
}

const ClientOnly:React.FC<clientonlyprops> =({children})=>{

const [hasmount ,sethasmounted] = useState(false);


useEffect(()=>{
    sethasmounted(true);
},[])

if(!hasmount){
    return null;
}
    return(<>
        {children}
    </>)
}



export default ClientOnly; 