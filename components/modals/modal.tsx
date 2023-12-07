'use client'
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { BiX } from "react-icons/bi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog" 
  
interface Modalprops{
      isOpen?:boolean,
      onClose:()=> void;
       onSubmit:()=>void;
      title?:string,
      body?:React.ReactElement,
      footer?:React.ReactElement,
      actionlabeld:string,
      disabled?:boolean,
      secondaryAction?:()=>void;
      secondaryActionLabeld?:string
}

// const Modal:React.FC<Modalprops> = ({
//       isOpen,
//       onClose ,
//        onSubmit ,
//        title ,
//        body,
//       // footer,
//        actionlabeld,
//       // disabled,  
//        secondaryAction,
//        secondaryActionLabeld,
// })=>{  

//  const [showmodal,setshowmodal] = useState(isOpen);
//  const [open, setOpen] = useState(false);
// useEffect(()=>{
//   setshowmodal(isOpen);
// },[isOpen])
//     return(<>
 
//   <Dialog open={showmodal}    > 
//  <DialogContent className=" ">  
//    <DialogHeader className="flex flex-row justify-between items-center">
//      <DialogTitle className=" -translate-y-3">{title}</DialogTitle> 
//      <DialogTrigger onClick={onClose}  className="block bg-white z-50 translate-x-3 -translate-y-6">
//      <BiX size={25}/>
//       </DialogTrigger>
//    </DialogHeader>
//      {body}
//      <DialogFooter className="flex flex-row justify-between">
//        {
//        secondaryActionLabeld ?   <Button className="w-full" onClick={secondaryAction}>{secondaryActionLabeld}</Button> : null }
     

//      <Button className="w-full" onClick={onSubmit}>{actionlabeld}</Button>
//      </DialogFooter>
//  </DialogContent>
// </Dialog>

 
//     </>)
// }


// export default Modal;







// components/Modal.tsx
 

const Modal:React.FC<Modalprops> = ({
   isOpen,
   onClose ,
   onSubmit ,
   title ,
   body,
  // footer,
   actionlabeld,
  // disabled,  
   secondaryAction,
   secondaryActionLabeld,
})=> {

  const [showmodal,setshowmodal] = useState(isOpen);
  const [open, setOpen] = useState(false);
 useEffect(()=>{
   setshowmodal(isOpen);
 },[isOpen])
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center   justify-center bg-gray-600 bg-opacity-50 transition-opacity bg-blur ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white  w-[80vh] px-6 py-4 flex flex-col gap-3  rounded-lg shadow-lg transform transition-transform ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
 <div className="flex flex-row justify-between">
  {title}
 <button  onClick={onClose}  >  <BiX size={25}/> </button>
 </div>
      <div className="">
      {body}
      </div>
     
        <div  className="flex flex-row justify-between gap-4 mt-5" >
        {
       secondaryActionLabeld ?   <Button className="w-full" onClick={secondaryAction}>{secondaryActionLabeld}</Button> : null }
      
   <Button className="w-full"  onClick={onSubmit}>{actionlabeld}</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
