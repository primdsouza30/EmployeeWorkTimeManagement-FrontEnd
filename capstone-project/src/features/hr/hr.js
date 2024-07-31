import { useState } from "react";
import HrList from "./components/hrlist";
import HRStat from "./components/hrstat";
import Navbar from "./components/navbar";
import Search from "./components/search";

function HR(){

    const [searchStrVal,setSearchStrVal] = useState(null);
    const handleSearch = (searchStr) =>{
        setSearchStrVal(searchStr)
    }

    return(
        <div>
            <Navbar searchFn={handleSearch}/>
            <div className="mt-4">
                <HrList />
                
            </div>
            
            <div className="mt-4"> 
            
            </div>
            
        </div>
    )
}

export default HR; 