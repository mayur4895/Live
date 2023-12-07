
import Image from "next/image";

const Logo=()=>{
    return(<>
 <Image
 className="hidden md:block"
src="/mlogo.png"
 height={50}
 width={50}
 alt={"logo"}  
 />
    </>)
}


export default Logo;