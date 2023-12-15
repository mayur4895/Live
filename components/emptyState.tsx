
'use client'
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";


interface EmptyProps{
    title?:string;
    subtitle?:string;
    showReset?:boolean;
}


const Empty:React.FC<EmptyProps> =({
    title,
    subtitle,
    showReset
})=>{

    const router = useRouter();
    return( 

     
     <div className="  w-[60vh]  m-auto  translate-y-32  flex flex-col justify-center items-center">
    <div className="border p-4 flex flex-col gap-2 ">
 
         <div>
         <Image 
          src='/empty.svg'
          alt="empty"
          height={200} 
          width={200}
         />
     </div>
     
    <div className="  flex flex-col gap-1 text-center">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm">{subtitle}</span> 
      </div>
      { showReset &&  
      <Button onClick={()=>router.push("/")}>remove filter</Button>
      }
    </div>
     </div>
 
)
}

export default Empty