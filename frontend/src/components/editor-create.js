import React from "react";
import { faPlus,faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
const Editor_List = props => {
  return props.inputDetails.map((val, idx) => {
    let name = `name-${idx}`,   
      type = `type-${idx}`;
    
    return (
      <div className="row mb-4" key={val.index}>
        <div className="col-lg-11">    
        <Editor
    initialValue="hello react editor world!"
    previewStyle="vertical"
    height="200px"
    initialEditType="WYSIWYG"
    useCommandShortcut={true}
    name="name"
    data-id={idx}
    id={name}
  />    
        
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
export default Editor_List;
