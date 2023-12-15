import {create} from 'zustand'
 



interface SearchModalStore{
    isOpen:boolean,
    onOpen:()=>void;
    onClose:()=>void;
}

const userSearchModal = create<SearchModalStore>((set)=> ({
isOpen:false,
onOpen:()=> set({ isOpen:true }),
onClose:()=> set( {isOpen:false} )
}));
  
 
export default userSearchModal;