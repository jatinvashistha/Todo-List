import { createPortal } from "react-dom"
import { AiOutlineClose } from "react-icons/ai"

const Modal = ({onClose,isOpen,children}) => {




  return createPortal(
  <>
    {isOpen && (
   <div   className=" grid place-items-center absolute top-0 z-40 backdrop-blur h-screen w-screen">
     <div className=" z-50  m-auto relative min-h-[200px] min-w-[50%] bg-white p-4">
        <div className=" flex justify-end">
            <AiOutlineClose onClick={onClose} className="text-2xl cursor-pointer"/>
        </div>
        {children}
        </div>
         
   </div>
        )}
    </>
  ,document.getElementById("modal-root"))
}

export default Modal