'use client'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { BiSolidCategory } from "react-icons/bi";


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
import { cn } from "@/lib/utils"
import React from "react"
import Link from "next/link"
import Logo from "./logo";
import Container from "../container";
import Search from "./search";
import UserMenu from "./usermenu"; 
 
import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import Categories from "./categories";
 
 
 
 
 
 


Button

interface NavbarProps{
  currentUser ?:  SafeUser | null
}

 
 
const Navbar:React.FC<NavbarProps> = ({currentUser})=>{
   
  return (
    <>
    < div    
    className="fixed  w-full bg-white z-10 shadow-sm">  
    <div className="py-2 border-b-[1px]"> 
     <Container >    
      <div className="flex flex-row gap-3 md:gap-0 bg-white  justify-between items-center">  
    <Logo/>
    <Search/>
    <UserMenu currentUser ={currentUser}  />  
    </div>
      </Container>
      </div>
     <Categories/>
      </div>
    </>)
}


export default Navbar;


  
 

 



