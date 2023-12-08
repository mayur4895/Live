import {  Poppins ,Nunito ,Roboto} from 'next/font/google'
import type { Metadata } from 'next' 
import './globals.css'
 import GlobalState from '@/components/context';
import Navbar from '@/components/Navbar/navbar';
import ClientOnly from '@/components/clientonly';
import Modal from '../components/modals/modal';
  
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import RegisterModal from '@/components/modals/registerModal';
 
import { Toaster } from "@/components/ui/toaster"
import LoginModal from '@/components/modals/loginModal';
import { getCurrentUser } from  '../app/actions/getCurrentUser';
import RentModal from '@/components/modals/rentModal';
import ImageUpload from '@/components/inputes/imageupload';
import Home from './page';
import { SafeUser } from './types';
 
const  pop =  Poppins({
  weight:[ '200' ,'400', '500',   '600' ,'700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});
export const metadata:Metadata  = {
  title: 'Live',
  description: 'Generated by create next app',
}
 
  
export default async function RootLayout({children}: {
  children: React.ReactNode
 
}){
 
  const currentUser = await getCurrentUser();
 
  
 
  return (
     
 
    <html lang="en">
      <body className={pop.className}>  
        <GlobalState>   
  <Toaster/>
          <ClientOnly> 
            <RentModal/>
            <RegisterModal isOpen/>
            <LoginModal/>
             <Navbar currentUser={currentUser}/> 
          </ClientOnly> 
     <div className='pt-20 pb-20'>
     {children}    
     </div>
        </GlobalState> 
     
     
        </body>
    </html>
 
 

  )
}
