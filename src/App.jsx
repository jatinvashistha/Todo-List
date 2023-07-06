 import Navbar from "./components/Navbar";
 import { FiSearch } from "react-icons/fi";
 import {AiFillPlusCircle} from "react-icons/ai";
 import { useEffect, useState } from "react";
 import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import UseDisClouse from "./hooks/UseDisClouse";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

 const App = () => {

 const [contacts,setContacts] = useState([]);
 const {isOpen,onOpen,onClose} = UseDisClouse();




  useEffect (()=>{
   const getContacts = async () => {
    try {
      const contactsRef = collection(db, "contacts");
    
      onSnapshot(contactsRef,(snapshot)=>{
        const contactsLists = snapshot.docs.map((doc)=> {
          return{
            id:doc.id,
            ...doc.data(),
          }
        });
        setContacts(contactsLists);
        return contactsLists;
      })
        
    } catch (error) {
      console.log(error);
    }
   }
   getContacts();
 },[]);

 const filterContacts = (e) =>{
  const value = e.target.value;
  const contactsRef = collection(db, "contacts");
    
  onSnapshot(contactsRef,(snapshot)=>{
    const contactsLists = snapshot.docs.map((doc)=> {
      return{
        id:doc.id,
        ...doc.data(),
      }
    });
       
    const filteredContacts = contactsLists.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()) 
    );

    setContacts(filteredContacts);
    return filteredContacts;
  })
 }

   return (
   <> 
    <div className=" max-w-[370px] mx-auto px-4"> 
    <Navbar/>
     <div className="flex gap-2">
     <div className=" relative  flex flex-grow items-center">
      <FiSearch className=" absolute ml-1 text-white text-3xl"/>
      <input onChange={filterContacts} type="text" className=" bg-transparent border border-white rounded-md h-10 pl-9 text-white flex-grow"  />
    </div>
      <AiFillPlusCircle onClick={onOpen} className=" text-5xl cursor-pointer text-white "/>
     </div>
     <div className="mt-3 gap-4 flex flex-col">
      {
       contacts.length <= 0 ? ( <NotFoundContact/>): 
       (contacts.map((contact)=>( 
          <ContactCard key={contact.id} contact={contact} />
         ))
         )}
     </div>
   </div>
   <AddAndUpdateContact onClose={onClose}
   isOpen={isOpen}
   />
   <ToastContainer
   position="bottom-center"
   />
   </>
   )
 };
 
 
 export default App