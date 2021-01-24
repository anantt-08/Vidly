import React, { Component, Fragment   } from 'react';
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from '@material-ui/core';
import { FaRegTrashAlt } from "react-icons/fa";
import Fab from "@material-ui/core/Fab";
import Dialog from "react-bootstrap-dialog";
import { MDBBtn
} from "mdbreact";
import {Table} from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import 'mdbreact/dist/css/mdb.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./yo.css";
class Form extends Component {
     constructor(props) {
    super(props);
    this.state = { data: [] ,
    	bsname:"",
    	bsroll:"",
    	bsimage:"",
    	bsimagename:"",
    	loading:true
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
       NotificationManager.success("Success!!") 
      this.setState({
            bsname:"",
            bsroll:"",
            bsimagename:"",
            bsimage:""
    }) 
      this.fileInput.value = "";
       this.componentDidMount();
    }).catch((err) => NotificationManager.error(err.response.data.msg));
    e.preventDefault();
  }

  myChangeHandler = (event) => {
    this.setState({bsname: event.target.value});
  }
  myChangeHandl = (event) => {
    this.setState({bsroll: event.target.value});
  }
  delete=(id)=>{
    axios.delete(`http://localhost:3000/form/${id}`)
     .then((res) => {
        this.setState({ data: this.state.data.filter(item=> item._id !== id)});
        NotificationManager.success("SuccessFull");
              }).catch((err) => {
      	NotificationManager.error(err.response.data.msg)});  
  }
  myChange = (event) => {
  	if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({bsimage: e.target.result} );
    };
    reader.readAsDataURL(event.target.files[0]);
  }
    this.setState({bsimagename:event.target.files[0]})
  }
   componentDidMount() {
   axios
      .get("http://localhost:3000/form/")
      .then((res) => {
        this.setState({ data: [...res.data] });
        console.log(this.state.data)
      }).catch((err) => {
      	NotificationManager.error(err.response.data.msg)});  
  }
  render() {
    return (
      <div>
        <form onSubmit={this.mySubmitHandler}>
     <div style={{display:"grid", gridTemplateColumns:"auto auto auto auto"}}>
     <div style={{ padding: "10px" , gridColumnStart: "2", gridColumnEnd: "3" ,border:"1px solid black"}}>   
      <p><b>Enter your Name: </b></p>
      <input
        type='text' required
        value={this.state.bsname}
        onChange={this.myChangeHandler}
      />
      </div>
     <div style={{ padding: "10px" , gridColumnStart: "3", gridColumnEnd: "4" ,background:"rgb(61, 196, 184)",
     borderTop:"1px solid black", borderRight: "1px solid black"}}>   
                <h1>File Upload:</h1>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="file" name="imageFile" 
                style={{marginTop:"10px",marginLeft:"10px"}} required onChange= {this.myChange} ref={ref=> this.fileInput = ref }/>
   <br/> <br/>
   </div>
   <div style={{ padding: "20px",gridColumnStart: "2", gridColumnEnd: "3" ,border:"1px solid black"}}>   
      <p style={{ marginTop:"40px"}}> <b>Enter your Rollno: </b></p>
      <input
        type='number' required
        value={this.state.bsroll}
        onChange={this.myChangeHandl}
      />
      </div>
    <div style={{ padding: "10px" , gridColumnStart: "3", gridColumnEnd: "4" ,background:"rgb(61, 196, 184)",
    borderRight: "1px solid black", borderBottom:"1px solid black"}}>   
                <label htmlFor="contained-button-file">
                <IconButton component="span">
                  <Avatar
                    src={this.state.bsimage}
                    style={{
                      margin: "10px",
                      width: "200px",
                      height: "200px"
                    }}
                  />
                </IconButton>
              </label>
 </div>
         <div style={{ padding: "10px" , background:"purple" , gridColumnStart: "2", gridColumnEnd: "4" ,border:"1px solid black"}}>   
                 <MDBBtn color="dark" type="submit">Submit
      </MDBBtn>
      </div>
      </div>
            </form>

     <h1 style={{color:"red",marginTop:"50px"}}> DISPLAYING ALL DATA :-></h1>
     {!this.state.data.length ? <h1>no records</h1>:
     <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th><b>BS-Id</b></th>
      <th><b>BS-Name</b></th>
       <th><b>BS-RollNo</b></th>
        <th><b>BS-Image</b></th>
         <th><b>Delete?</b></th>
    </tr>
  </thead>
  <tbody>
     { this.state.data.map((item,index) => (
    <Fragment>
            <tr key={index}>
              <td >
                {index}
              </td>
              <td>{item.bsname}</td>
              <td>{item.bsroll}</td>
              <td><img src={process.env.PUBLIC_URL + `${item.bsimage}` }     style={{
                      margin: "10px",
                      width: "150px",
                      height: "150px"
                    }}
 alt="yo" />
</td>
    <td><Fab
              color="secondary"
              aria-label="delete"
              size="small"
              onClick={() => {
                this.dialog.show({
                  title: "Confirmation",
                  body: "Are you sure delete Record?",
                  actions: [
                    Dialog.CancelAction(),
                    Dialog.OKAction(() => {
                      this.delete(`${item._id}`);
                    }),
                  ],
                  bsSize: "small",
                  onHide: (dialog) => {
                    dialog.hide();
                    console.log("closed by clicking background.");
                  },
                });
              }}
            >
              <FaRegTrashAlt />
            </Fab>
            </td>
            </tr>
          </Fragment> )) }
  </tbody>
</Table>	
     }
      <Dialog
              ref={(component) => {
                this.dialog = component;
              }}
            />
                    <NotificationContainer />

      </div>
    );
  }
}
export default Form;

