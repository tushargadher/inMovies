import React from "react";
import Spineer from '../Spinner.gif';
const Loader =()=> {
    
        return(
            <div className="text-center flex items-center justify-center">
                <img src={Spineer} alt="loader" />
            </div>     
        );
    
}
export default Loader; 