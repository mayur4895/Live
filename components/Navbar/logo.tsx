
import Image from "next/image";
import Link from "next/link";

const Logo=()=>{
    return(<>
  

 <Link href="/"><Image
 
 className="hidden md:block"
src="/mlogo.png"
 height={50}
 width={50}
 alt={"logo"}  
 /></Link>
    </>)
}


export default Logo;