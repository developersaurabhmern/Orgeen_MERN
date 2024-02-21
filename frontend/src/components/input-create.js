import React from "react";
import { faPlus,faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Input_List = props => {
  return props.inputDetails.map((val, idx) => {
    let name = `name-${idx}`,   
      type = `type-${idx}`;
    
    return (
      <div className="row mb-4" key={val.index}>
        <div className="col-lg-5 ">        
          <input
            type="text"

            className="form-control required"
            placeholder=""
            name="name"
            data-id={idx}
            id={name}
          />
        </div>
       
        <div className="col-lg-6 mt-smc-2">  
        <select class="form-select form-control" name="type" id={type} data-id={idx}>
                      <option selected>Select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>       
         
        </div>
       
       
        <div className="col-lg-1 mt-smc-2">
          {idx === 0 ? (
            <button
              onClick={() => props.add()}
              type="button"
              className="btn btn-primary text-center"
            >
              <FontAwesomeIcon icon={faPlus} className="fa-1x" />
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => props.delete(val)}
            >
               <FontAwesomeIcon icon={faMinus} className="fa-1x" />
            </button>
          )}
        </div>
      </div>
    );
  });
};
export default Input_List;
