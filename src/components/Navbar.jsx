import React from "react"

import { PURPLE, CURRENTLINE, BACKGROUND } from "../helpers/color"
import SearchContact from "./SearchContact"
import { useLocation } from "react-router-dom" 


const Navbar = ({query,search}) => {
    const loc = useLocation()
    {console.log(loc)}
  return (
    <React.Fragment>
        <nav className="navbar navbar-dark shadow-lg" style={{background: BACKGROUND}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                       <div className="navbar-brand">
                       <i className="fa fa-id-badge" style={{color: PURPLE}}></i>
                       { "  "}
                       اپلیکیشن مدیریت <span style={{color: PURPLE}}>مخاطبین</span>
                       </div>
                    </div>
                    <div className="col">
                        
                        <SearchContact search = {search} query ={query} />
                    </div>
                </div>
            </div>
        </nav>
    </React.Fragment>
  )
}

export default Navbar