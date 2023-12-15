'use client';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import z from "zod"
import userRentModal from "@/app/hooks/rentmodal";
import Modal from "./modal";
import { useMemo, useState } from "react";
import { categorieslist } from "../Navbar/categories";
import CategoryInput from "../inputes/categoryInput";
import { FieldValues, FormSubmitHandler, SubmitHandler , useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CountrySelect from '../inputes/countryselect';
import dynamic from "next/dynamic";
import Counter from "../inputes/counter";
 import { useRouter } from "next/navigation";
import ImageUpload from "../inputes/imageupload";
  import Input from "../inputes/input";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { BiNote, BiRupee, BiText } from "react-icons/bi";
 
 
 


enum STEPS {
     CATEGORY = 0 ,
     LOCATION = 1,
     INFO = 2,
     IMAGES = 3 ,
     DESCRIPTION = 4,
     PRICE = 5
}   

const RentModal = ()=>{
    const rentmodal = userRentModal();
const router = useRouter();

    const {
       register,
       watch, 
       handleSubmit,
       setValue,
       formState:{
        errors,
       },
       reset  
      
      } = useForm<FieldValues>({  
        defaultValues: {
            category:'', 
            location:null,
            guestCount:1,
            roomCount:1,
            bathroomCount:1, 
            imageSrc:'',
            price:1,
            title:'',
            description:'',  
        },
      });
  
 


 const category = watch('category')
 const location = watch('location')
 const guestCount = watch('guestCount')
 const roomCount = watch('roomCount')
 const bathroomCount = watch('bathroomCount')
 const imageSrc = watch('imageSrc')
 const Map = useMemo(()=> dynamic(()=> import('../Map'),{ 
    ssr:false
 }),[location])

 const setCustomvalue =( id:string ,value:any)=>{
       setValue(id,value,{
        shouldDirty:true,
        shouldValidate:true,
        shouldTouch:true
       });
 }
 


 const [loding ,setloding] = useState(false);

const [step,setstep ]= useState(STEPS.CATEGORY);

const onBack = ()=>{
    setstep((value)=>value - 1)
}
const onNext = ()=>{
    setstep((value)=>value + 1)
}

const onSubmit:SubmitHandler<FieldValues> = (data)=>{
if(step !== STEPS.PRICE){
    return onNext();
}
setloding(true);
axios.post('/api/listing', data).then(()=>{ 
     router.refresh();
     rentmodal.onClose();
     reset();
     toast({
        title: "Listing Created",
        description: "successfuly created listing",  
        
      })
setstep(STEPS.CATEGORY);
  }).catch((err)=>{   
        toast({
            variant:"destructive",
      title: "Uh oh! Something went wrong.",
      description: "Envalid Credentials",  
      
    })
  

  }).finally(()=>{
    setloding(false)
  })
   }
 
 
  
 

const ActionLabeld = useMemo(()=>{
if(step === STEPS.PRICE){
    return "Create"
}
return "Next"
},[step])


const   secondaryActionLabeld = useMemo(()=>{
    if(step === STEPS.CATEGORY){
        return  undefined;
    }
    return "Back";
    },[step])


  let bodyContent = ( 
<>
<div>
    <h4 className=" font-semibold text-xl">Which of these describe your place</h4>
    <p className="text-sm">choose one of the following</p>  
</div>
<div className="mt-2 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] scrollbar-hide">
{
    categorieslist.map((item)=>{
        return <CategoryInput   
        key={item.label}
        label={item.label}
        selected={category == item.label}
        onClick={(category)=>setCustomvalue('category',category)}
        icon={item.icon}  
        /> 
       
    })
}
</div>
 
</>
 
  );

if(step === STEPS.LOCATION){
    bodyContent=(
<>
<div className="mb-2">
    <h4 className=" font-semibold text-xl">Which of these location</h4>
    <p className="text-sm">choose </p>  
</div>

<CountrySelect
  value={location}
  onChange={(value)=>setCustomvalue('location',value)}  
 
     
/>
<Map center={location?.latlng} />
 </>
    )
}


if(step === STEPS.INFO){
    bodyContent=(
<>
<div className="mb-2">
    <h4 className=" font-semibold text-xl">Basics About your Place</h4>
    <p className="text-sm">to give you satshfied</p>  
</div>

<Counter  
  title="Guests"
  subtitle="No of Gustes?"
  value={guestCount}
    onChange={(value)=>setCustomvalue('guestCount',value)}
/>
<Counter  
  title="Rooms"
  subtitle="No of Rooms have you?"
  value={roomCount}
    onChange={(value)=>setCustomvalue('roomCount',value)}
/>
<Counter  
  title="BathRooms"
  subtitle="No of BathRooms have you?"
  value={bathroomCount}
  onChange={(value)=>setCustomvalue('bathroomCount',value)}
/>
 
 </>
    )
}



if(step === STEPS.IMAGES){
    bodyContent=(
<>
<div className="mb-3">
    <h4 className=" font-semibold text-xl">Upload Image</h4>
    <p className="text-sm">Upload Image  looking for place you have </p>  
</div>

  <ImageUpload 
   value={imageSrc}
   onChange = {(value)=>setCustomvalue('imageSrc',value)}
  />
 
 </>
    )
}

 
 
 
 

  


 

if(step === STEPS.DESCRIPTION){
    bodyContent=(
<>
<div className="mb-3">
    <h4 className=" font-semibold text-xl">Description</h4>
    <p className="text-sm">Give basic Dispcription</p>  
</div>

 
 
    <Input 
  required
  id="title"
  disable={loding}
 register={register}
 label="Title" 
 errors={errors}
 icon={BiText}
   /> 
 


 
    
  <Input 
  required
  id="description"
  disable={loding}
 register={register}
 label="Description" 
 errors={errors}
 icon={BiNote}
   /> 
 
  
    </>
    )
}




if(step === STEPS.PRICE){
    bodyContent=(
<>
<div className="mb-3">
    <h4 className=" font-semibold text-xl">Pricing</h4>
    <p className="text-sm">Price is for 24 hours </p>  
</div>

 
   
    <Input 
  required
  id="price"
  disable={loding}
 register={register}
 label="Price" 
 formatPrice
 errors={errors}
 icon={BiRupee}
   /> 
 
 </>
    )
}
















    return(

    <Modal  
       isOpen={rentmodal.isOpen}
       onClose={rentmodal.onClose}
       title="LIVE"
       onSubmit={handleSubmit(onSubmit)}  
       secondaryAction={step === STEPS.CATEGORY ?  undefined : onBack}
       actionlabeld={ActionLabeld}
       secondaryActionLabeld={secondaryActionLabeld}
       body={bodyContent}   
    /> 
    )
}


export default RentModal;