import React from "react";
import preloader from "../../../assets/icons/spinner-3.gif"

let Preloader: React.FC = () => {
  return <div>
    <img src={preloader}/>
  </div>
}

export default Preloader;
