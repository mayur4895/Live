'use client'
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
 
import { BiSolidCategory ,BiFingerprint ,BiUserCircle  } from "react-icons/bi";

import { buttonVariants } from "@/components/ui/button"

import { Check, ChevronsDown, ChevronDownIcon, } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
 
import React, { useCallback, useState } from "react"
import Link from "next/link"
import Logo from "./logo";
import Container from "../container";
import Search from "./search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import userRegisterModal from "@/app/hooks/registermodal";
import userLoginModal from "@/app/hooks/loginmodal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import LoginModal from "../modals/loginModal";
import userRentModal from "@/app/hooks/rentmodal";
import { useRouter } from "next/navigation";
 


interface UserNavbarProps{
  currentUser?:    SafeUser | null
}

 const UserMenu:React.FC<UserNavbarProps> = ({currentUser})=> {
 
   const registerModal = userRegisterModal();
  const loginModal = userLoginModal();
  const  rentModal =  userRentModal();
 const router = useRouter();
  const  onrent = useCallback(()=>{ 
   if(!currentUser){
    return loginModal.onOpen();
   } 

   return rentModal.onOpen();
    },[currentUser,loginModal])
 

    const [isopen,setisopen]= useState(false);

  return (
    <>
 
 

      <Menubar className="flex  flex-row  border-none  items-center shadow-sm   ">
                 
        <div className=" md:block  hidden items-center ">
          <Link href="/" onClick={onrent}  className=" cursor-pointer"> <MenubarMenu>
            <MenubarTrigger className=" whitespace-nowrap">LIVE.</MenubarTrigger> 
          </MenubarMenu></Link> 
          </div>
        


<Sheet  open={isopen} onOpenChange={setisopen}>
      <SheetTrigger asChild >
       
            <div className="flex flex-row gap-3 items-center">   
                <div className="block">
        <Avatar className="h-8 w-8"> 
          <AvatarImage src={currentUser?.image ||"/profile.png"} />
            <AvatarFallback>
            <BiUserCircle size={30}/> 
            </AvatarFallback>
          </Avatar>
                </div>
               
          </div>
      </SheetTrigger>
      <SheetContent className="bg-white "> 
    
        {   currentUser ?  <SheetHeader className=" px-3 mb-5">
          <SheetTitle className="   flex tracking-widest">Live.</SheetTitle> 
          <SheetDescription className="flex items-start ">Welcome {currentUser.name}</SheetDescription>
        </SheetHeader> :  <SheetHeader className=" px-3 mb-5">
          <SheetTitle className="  flex tracking-widest">Live.</SheetTitle> 
        </SheetHeader>}
     
   {   currentUser ?
   <div className="grid gap-4 py-4"> 
          <MenubarMenu> 
            <MenubarTrigger onClick={()=>{ router.push("/properties"),setisopen(false)}}  className=" flex gap-4 cursour-pinter whitespace-nowrap">My Properties</MenubarTrigger> 
          </MenubarMenu>   
          <MenubarMenu> 
            <MenubarTrigger onClick={()=>{ router.push("/trips"),setisopen(false)}}  className=" flex gap-4 cursour-pinter whitespace-nowrap">My Trips</MenubarTrigger> 
          </MenubarMenu>   
          <MenubarMenu> 
            <MenubarTrigger onClick={()=>{ router.push("/favorites"),setisopen(false)}}   className=" flex gap-4 cursour-pinter whitespace-nowrap">My Favoraites</MenubarTrigger> 
          </MenubarMenu>   
          <MenubarMenu> 
            <MenubarTrigger onClick={()=>{}}  className=" flex gap-4 cursour-pinter whitespace-nowrap">My Reservations </MenubarTrigger> 
          </MenubarMenu>   
          <MenubarMenu> 
            <MenubarTrigger onClick={()=>{rentModal.onOpen() , setisopen(false)}}  className=" flex gap-4 cursour-pinter whitespace-nowrap">My Home </MenubarTrigger> 
          </MenubarMenu>   
          <MenubarMenu> 
            <MenubarTrigger onClick={()=>{signOut() ,setisopen(false) , router.push("/")}}  className=" flex gap-4 cursour-pinter whitespace-nowrap">     Logout</MenubarTrigger> 
          </MenubarMenu>   
   </div>   : 



    <div className="grid gap-4 py-4">
             <MenubarMenu> 
            <MenubarTrigger onClick={()=>{loginModal.onOpen(),setisopen(false)}}  className="  flex gap-4  text-start cursour-pinter whitespace-nowrap">      Login</MenubarTrigger> 
          </MenubarMenu> 
           <MenubarMenu> 
            <MenubarTrigger onClick={()=>{registerModal.onOpen(),setisopen(false)}}  className=" flex gap-4 cursour-pinter whitespace-nowrap">     Signup</MenubarTrigger> 
          </MenubarMenu>   
 
        </div>
      }

 
      </SheetContent>
    </Sheet>

      </Menubar>

      
    
      
    </>)
}





export default UserMenu;