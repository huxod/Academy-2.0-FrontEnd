import * as React from 'react';

// import { Button, FormControl, FormGroup, FormB, Jumbotron } from 'react-bootstrap';
import { Icon, Button, Segment, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import * as Cookies from 'js-cookie';
import systemTool from '../SystemTool';

// This Component allows you to add and edit lessons

export default class Login extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            roles:[{}],
            validstate: '',
            signin:false,
            // URL:  window.location.protocol+'//'+window.location.hostname+':'+ window.location.port
            URL: 'http://localhost:8080'
        }
    }

    public forms: any;



    public getValidationState = (ele: any) => {
        if (length == 0) this.setState({ validstate: true });
    }
    public onChangeUsername = (e: any) => {
        this.setState({ username: e.target.value });
        this.getValidationState(this.state.username);
    }
    public onChangePassword = (e: any) => {
        this.setState({ password: e.target.value });
        this.getValidationState(this.state.password);
    }
    public submit = async(e: any) => {
    
        e.preventDefault();
        fetch(this.state.URL+'/role/'+this.state.username)
        .then(response => response.json())
        .then(data => Cookies.set('userRole',data))
        .then(data => {this.setState({signin:true});return data})
        
        Cookies.set('user',this.state.username); 
        
        const data = new FormData(this.forms)
        await fetch(this.forms.action, {
            method: 'POST',
            body: data
        }).catch(e => console.log(e.responseText));
  
        this.setState({ username: '', password: '' ,signin:true});
    }
    public render() {

        return (
            <Segment>
                <form className='ui form' method="POST" onSubmit={this.submit} ref={(el: any) => (this.forms = el as HTMLFormElement)}>
                    <Form.Field>
                        <input  placeholder='Login or Name' name='username' onChange={this.onChangeUsername} />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Password' name='password' onChange={this.onChangePassword} />
                    </Form.Field>
                    <Button fluid color='green'><Icon name='user secret' />Login</Button>
                </form>
                {this.state.signin === true && systemTool.ifLoged()?<Redirect to="/user" />:null}
            </Segment>
        );
    }
}


