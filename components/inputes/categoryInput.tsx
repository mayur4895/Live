import { IconType } from 'react-icons';
'use client'


interface CategoryInputprops{
    label:string,
    icon:IconType
    selected:boolean,
    onClick:(value :string )=>void;

}

const CategoryInput:React.FC<CategoryInputprops> = ({
     label ,
    icon:Icon,
    selected ,
    onClick ,
})=>{
return(<>
<div   onClick={()=>{onClick(label)}}  className={ `cursor-pointer flex flex-row py-4 p-2 gap-3 items-center border-[1px] rounded-sm ${selected ? '  bg-green-100  border-gray-500' :''} `}>
    <Icon size={25}/>
 <span className='text-sm'>{label}</span>
</div>
</>)
}


export default CategoryInput;