 

import { HiMagnifyingGlass } from "react-icons/hi2";

const Search=()=>{


   return(<>
      <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer">
                

                <div className="flex flex-row justify-between items-center">
<div className="text-xs font-semibold px-6"> anywhere</div>
<div className=" hidden sm:block text-xs font-semibold px-6"> anywhere</div>

 <div className="flex flex-row justify-center items-center gap-3 pl-6 pr-2 ">
 <div className=" hidden sm:block text-xs font-semibold px-6 text-gray-500"> Add Guest</div>
 <div className="p-1 bg-yellow-400 rounded-full">
 <HiMagnifyingGlass/>

    </div>
     </div>
    </div>
      </div>
    
    
    </>)
}


export default Search;