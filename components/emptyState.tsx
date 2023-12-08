
'use client'
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


interface EmptyProps{
    title?:string;
    subtitle?:string;
    showReset?:boolean;
}


const Empty:React.FC<EmptyProps> =({
    title="Not Found you search",
    subtitle="try changing filters or remove it",
    showReset
})=>{

    const router = useRouter();
    return( 

 
     <div className=" h-[60vh] w-[60vh] m-auto  flex flex-col justify-center items-center">
    <div className="border p-4 flex flex-col gap-2 bg-red-100 border-red-400">
    <div className="  flex flex-col gap-1 text-center">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm">{subtitle}</span> 
      </div>
      { showReset &&  
      <Button onClick={()=>router.push("/")}>Remove All filters</Button>
      }
    </div>
     </div>
 
)
}

export default Empty