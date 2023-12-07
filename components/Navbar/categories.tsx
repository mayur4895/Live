'use client'

import Container from "../container";
import {TbBeach, TbMountain, TbPool} from 'react-icons/tb'
import {GiBarbarian, GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiWindmill} from 'react-icons/gi'
import {MdOutlineVilla} from 'react-icons/md'
import {FaSkiing} from 'react-icons/fa'
import {BiCloudSnow , BiDiamond} from 'react-icons/bi'
  
export const categorieslist = [
{
  label:'Beach',
icon:TbBeach,
description:'Tis property is near to the beach with beafutiful sence'
},
{
  label:'Windmill',
  icon:GiWindmill,
 description:'Tis property is near to windmill'
    },
   {
    label:'Modern',
    icon:MdOutlineVilla,
   description:'Tis property is near to modern'
  },
  {
    label:'Countryside',
    icon:TbMountain,
   description:'Tis property is near to  contryside'
  },
  {
    label:'Island',
    icon:FaSkiing,
   description:'Tis property is located in iceland'
  },
  {
    label:'Pools',
    icon:TbPool,
   description:'Tis property is have swiming pool'
  },
  {
    label:'Lake',
    icon:GiBoatFishing,
   description:'Tis property is  near to Lake'
  },
  {
    label:'Castle',
    icon:GiCastle,
   description:'Tis property is  near to Castle'
  },
  {
    label:'Camping',
    icon:GiForestCamp,
   description:'Tis property is  near to forest'
  },
  {
    label:'Artic',
    icon:BiCloudSnow,
   description:'Tis property is  in Artic'
  },
  {
    label:'Cave',
    icon:GiCaveEntrance,
   description:'Tis property is  near to  caves'
  },
  {
    label:'Desert',
    icon:GiCactus,
   description:'Tis property is in Desert'
  },
  {
    label:'Barns',
    icon:GiBarn,
   description:'Tis property is have barns'
  },
  {
    label:'Lux',
    icon:BiDiamond,
   description:'Tis property is luxary'
  },
  
 

]

 


import React, { useEffect, useState } from 'react';
import CategoryBox from '../categorybox';
import queryString from "query-string";
import { usePathname, useSearchParams } from "next/navigation";
 
 
const Categories = () => {
  const  params =   useSearchParams();
  const  pathname = usePathname();
  const  category =  params?.get('category');
 
  const mainpage = pathname == "/"

 if(!mainpage){
  return null
 }
 
 
 

   

  return (
 
          <Container>
     
              <div   className=" st flex pt-5 flex-row  scrollbar-none     gap-2 justify-between  overflow-x-scroll  ">
  
 {
               categorieslist.map((cur)=>{
            
          return    ( <CategoryBox 
            key={cur.label}
                     label={cur.label}
                   icon={cur.icon}
                   seleced={category==cur.label} 

                />)
 
            })} 
 
               </div>


               
     
          </Container>
    
  );
};

export default Categories;
