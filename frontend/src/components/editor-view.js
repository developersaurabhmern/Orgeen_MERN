import React from "react";
import Editor_List from "./editor-create";

class EditorView extends React.Component {
  state = {
    inputDetails: [
      {
        index: Math.random(),
        name: "",       
        type: "",
       
      }
    ]
  };
  handleChange = e => {
    if (
      ["name", "type"].includes(
        e.target.name
      )
    ) {
      let inputDetails = [...this.state.inputDetails];
      inputDetails[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  addNewRow = e => {
    this.setState(prevState => ({
      inputDetails: [
        ...prevState.inputDetails,
        {
          index: Math.random(),
          name: "",        
          type: "",
         
        }
      ]
    }));
  };

  deteteRow = index => {
    this.setState({
      inputDetails: this.state.inputDetails.filter(
        (s, sindex) => index !== sindex
      )
    });
  };

  clickOnDelete(record) {
    this.setState({
      inputDetails: this.state.inputDetails.filter(r => r !== record)
    });
  }
  render() {
    let { inputDetails } = this.state;
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>      
                <div className="">
                  < Editor_List
                    add={this.addNewRow}
                    delete={this.clickOnDelete.bind(this)}
                    inputDetails={inputDetails}
                  />
              
             
          
          </div>
        </form>
      </div>
    );
  }
}
export default EditorView;
