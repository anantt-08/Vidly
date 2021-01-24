import React, { Component, Fragment   } from 'react';
import axios from "axios";
import { MDBBtn
} from "mdbreact";
class Form extends Component {
     constructor(props) {
    super(props);
    this.state = {
    	bsname:"",
    	bsroll:"",
    	bsimagename:""
   };
  }
  mySubmitHandler = (e) => {
     const formData = new FormData();
        formData.append('imageFile',this.state.bsimagename);
        formData.append("bsname",this.state.bsname);
        formData.append("bsroll",this.state.bsroll); 
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };   
     axios
    .post("http://localhost:3000/form/",formData,config)
    .then((res) => {
       console.log("post",res)  
      this.setState({
            bsname:"",
            bsroll:"",
            bsimagename:""
    }) 
    }).catch((err) => console.log(err.response.data.msg));
    e.preventDefault();
  }

  myChangeHandler = (event) => {
    this.setState({bsname: event.target.value});
  }
  myChangeHandl = (event) => {
    this.setState({bsroll: event.target.value});
  }
  myChange = (event) => {
    this.setState({bsimagename:event.target.files[0]})
  }
   
  render() {
    return (
      <div>
        <form onSubmit={this.mySubmitHandler}>
     <div>
     <div>   
      <p><b>Enter your Name: </b></p>
      <input
        type='text' required
        value={this.state.bsname}
        onChange={this.myChangeHandler}
      />
      </div>
   <div>   
      <p> <b>Enter your Rollno: </b></p>
      <input
        type='number' required
        value={this.state.bsroll}
        onChange={this.myChangeHandl}
      />
      </div>
      <div>   
                <h1>File Upload:</h1>
                 <input type="file" name="imageFile" required onChange= {this.myChange}}/>
   <br/> <br/>
   </div> 
         <div>   
                 <MDBBtn color="dark" type="submit">Submit
      </MDBBtn>
      </div>
      </div>
            </form>

    );
  }
}
export default Form;

