'use client'
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import { useCallback, useState } from "react";
import { CldImage } from 'next-cloudinary';
import { CldUploadWidget } from 'next-cloudinary';

declare global{
   var cloudinary:any;
}


interface ImageUplodProps{ 
    onChange:(value:string)=>void;
     value:string;
  
}




const ImageUpload:React.FC<ImageUplodProps> = ({
    value,
    onChange
})=>{
  
const handleUpload = useCallback((result:any)=>{
    onChange(result.info.secure_url);
},[onChange]);

    return(  
 
      <div className="z-100 ">
         <CldUploadWidget 
       onUpload={handleUpload}
       uploadPreset="tirlnr89"
       options={{
            maxFiles:1
        }}
    > 
  {({open})=>{
    return(
        <div
        onClick={()=>open?.()}
        className="relative cursor-pointer hove:opacity-70 border-dashed border-2 p-20 border-neutral-400 flex flex-col justify-center items-center text-neutral-700"
        >
      <TbPhotoPlus size={50}/>
      <div className=" mt-2 font-medium">
                Click to Upload
            </div>
            {
                value && (
                    <div className=" absolute inset-0 w-full h-full">
              
              <Image
                    alt="upload"
                    fill
                    style={{objectFit:'cover'}}
                    src={value}
                    />

                    </div>
                )
            }
        </div>
    )
}}
 

    </CldUploadWidget>
      </div>
 

 )
}



export default ImageUpload;


 
  