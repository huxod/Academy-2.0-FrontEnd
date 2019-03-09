import * as React from 'react';
import { Segment, List, Header, Icon, ListItem, Button, Divider} from 'semantic-ui-react';


import * as Cookies from 'js-cookie';
import systemTool from '../SystemTool';
import {localURL} from '../config';


export default class User extends React.Component<any,any> {
 public  edit ={
   'login':false,
   'name':false,
   'lastName':false,
   'email':false,
   'password':false
 }
 public user ={}
  constructor(props: any) {
    super(props)
    this.state = {
      edit:{
        'login':false,
        'name':false,
        'lastName':false,
        'email':false,
        'password':false
      },
      isLoad:true,
      showLabelLogin:false,
      message_l:null,
      user:{},
      URL:  window.location.protocol+'//'+window.location.hostname+':'+ window.location.port
    }
  }

  public componentDidMount(){
    this.setState({ isLoad: true });

    fetch(localURL+'/users/'+Cookies.get('user'))
      .then(response => response.json())
      .then(data => {this.setState({ user: data, isLoad: false });Cookies.set('Id',this.state.user.id);})
      .catch(error => this.setState({isLoad:error}));
  }
  //Update User Info
  public showMessage = (val:string, message:string, inputName:string, error:boolean) =>{
    console.log("Uda sie"+message)
    val == this.state.hash && inputName =='login' && error == true ? this.setState({message_l:message , showLabelLogin:true}):
    inputName == 'login' && error == false ? this.setState({message_l:message,showLabelLogin:true}):
    this.setState({message_l:null,showLabelLogin:false});
  
    val == this.state.hash && inputName =='email' && error == true ? this.setState({message_e:message , showLabelEmail:true}):
    inputName == 'email' && error == false ? this.setState({message_e:message,showLabelEmail:true}):
    this.setState({showLabelEmail:false});

    inputName = '';
}
  public updateUser = async () => {
    const settings = {
        method: 'PUT', headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify(this.user)
    };
    const data = await fetch(localURL+'/users/'+this.state.user.id, settings)
        .then(response => response.json())
        .then(json => {
          Cookies.set('user',this.state.user.login);
          
            return json;
        })
        .catch(e => {
            return e
        });

    return data;
}
  //Test
  public SetValue = (p:string) =>{
    this.user = this.state.user
  if(this.edit[p] == true)  {
    this.setState({user:this.user})
   this.updateUser();
  }

  console.log("SetValue "+p+" edit " + this.edit[p])

  this.edit[p] == false ?(
  this.edit[p] = true) :
  this.edit[p] = false 

  this.setState({edit:this.edit})  
  console.log("SetValue "+p+" edit state " + this.state.edit[p])
  
  }
  public handleChange = (e:any) =>{
    systemTool.onBlur(e,localURL,this.showMessage)
    this.user[e.target.name] = e.target.value
  }
  public render() {
    const { } = this.props;

    if (this.state.isLoad !== false ) {
      return <h1>Loading...</h1>
    }
    return (
      <Segment>
        <Header as='h2' icon>
          <Icon name='settings' />
          Account Settings
          <Header.Subheader>Manage your account settings and set e-mail preferences.</Header.Subheader>
        </Header>
        <List>
        <ListItem>
            <List.Content floated="left" className="user_table"><h3>Login :</h3></List.Content>
            {this.edit['login'] ?
            <List.Content floated="left" className="user_table"><h3>{this.state.showLabelLogin?<label>{this.state.message_l}</label>:null}<input name="login" onChange={this.handleChange} placeholder={this.state.user.login} /></h3></List.Content>
            :
            <List.Content floated="left" className="user_table"><h3>{this.state.user.login}</h3></List.Content>}
            <Button size="mini" basic color='teal'onClick={() => this.SetValue('login')}>{this.edit['login'] ? "Save" : "Edit"}</Button>       
          </ListItem>

          <ListItem>
            <List.Content floated="left" className="user_table"><h3>Name :</h3></List.Content>
            {this.edit['name'] ?
            <List.Content floated="left" className="user_table"><h3><input name="name"  onChange={this.handleChange} placeholder={this.state.user.name} /></h3></List.Content>
            :
            <List.Content floated="left" className="user_table"><h3>{this.state.user.name}</h3></List.Content>}
            <Button size="mini" basic color='teal'onClick={() => this.SetValue('name')}>{this.edit['name'] ? "Save" : "Edit"}</Button>       
          </ListItem>

          <ListItem>
            <List.Content floated="left" className="user_table"><h3>Last Name :</h3></List.Content>
            {this.edit['lastName'] ?
            <List.Content floated="left" className="user_table"><h3><input name="lastName" onChange={this.handleChange} placeholder={this.state.user.lastName} /></h3></List.Content>
            :
            <List.Content floated="left" className="user_table"><h3>{this.state.user.lastName}</h3></List.Content>}
            <Button size="mini" basic color='teal'onClick={() => this.SetValue('lastName')}>{this.edit['lastName'] ? "Save" : "Edit"}</Button>       
          </ListItem>

          <ListItem>
            <List.Content floated="left" className="user_table"><h3>Email address :</h3></List.Content>
            {this.edit['email'] ?
            <List.Content floated="left" className="user_table"><h3><input name="email" onChange={this.handleChange} placeholder={this.state.user.email} /></h3></List.Content>
            :
            <List.Content floated="left" className="user_table"><h3>{this.state.user.email}</h3></List.Content>}
            <Button size="mini" basic color='teal'  onClick={() => this.SetValue('email')}>{this.edit['email'] ? "Save" : "Edit"}</Button>       
          </ListItem>
          <ListItem>
            <List.Content floated="left" className="user_table"><h3>Pssword :</h3></List.Content>
            {this.edit['password'] ?
            <List.Content floated="left" className="user_table"><h3><input name="password" type="password" onChange={this.handleChange} placeholder='password' /></h3></List.Content>
            :
            <List.Content floated="left" className="user_table"><h3>********</h3></List.Content>}
            <Button size="mini" basic color='teal'  onClick={() => this.SetValue('password')}>{this.edit['password'] ? "Save" : "Edit"}</Button>       
          </ListItem>
          <Divider />
          {Cookies.getJSON('userRole').map((ele:any,i:any)=> <h3 key={i}>{ele.role}</h3>)}
          <Divider />
          Id{Cookies.get('Id')}
          <Divider />
          <h3>Lesson Score: {undefined == this.state.user.lessonScore ?
            0: this.state.user.lessonScore.dictionaries.length}</h3>
        </List>
        
      </Segment>
    );
  }
}