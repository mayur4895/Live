'use client'

import { IconType } from "react-icons/lib";

interface ListingCategoryprops{
    label:string;
    description:string;
    icon:IconType
}



const ListingCategory:React.FC<ListingCategoryprops>  =({
    label,
    description,
icon:Icon,

})=>{
    return(<>
            <h3>Categoryinfo</h3>
            <div className="flex flex-row gap-4 items-center border-b pb-5">
                <Icon size={36} className="p-2 rounded-full bg-green-300/70 border-green-800 border"/>
                <div>
                    <span className="font-semibold">{label}</span>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
      </>)
}


export default ListingCategory;