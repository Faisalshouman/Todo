import { createContext , useState, useContext} from "react";
import SnackbarComponent from "../components/SnackBar";

const SnackContext = createContext([])



export function SnackProvider({children}){

    const OpenCloseSnack = (Message) =>{
        setMessage(Message)
        setSnackOpen(true)
        setTimeout(()=>{
          setSnackOpen(false)
        },2200)
      }
    
      const [openSnack , setSnackOpen] = useState(false)
      const [message , setMessage] = useState(false)


  
    return(

<SnackContext.Provider value={{openSnack , OpenCloseSnack}}>
    {children}
<SnackbarComponent open={openSnack} Message={message}/>
</SnackContext.Provider>


    )
}

export const useToast= ()=>{
    return useContext(SnackContext)
} 