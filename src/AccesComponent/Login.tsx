import * as React from 'react';
import { Icon, Button, Segment, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import * as Cookies from 'js-cookie';
import systemTool from '../SystemTool';
import { localURL } from '../config';

export default class Login extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            roles: [{}],
            validLogin: '',
            validEmail: '',
            valid: false,
            signin: false,
            URL: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
        }
    }

    public forms: any;

    public validationsLogin = (ele: any) => {
        if (ele >= 3) { this.setState({ validLogin: 'Your name is correct', valid: true }) }
        else { this.setState({ validLogin: 'Your name to Short', valid: false }) };
    }
    public validationsEmail = (ele: any) => {
        if (ele >= 9) { this.setState({ validEmail: 'Your password to short', valid: true }) }
        else { this.setState({ validEmail: 'Your password is correct', valid: false }) };
    }
    public onChangeUsername = (e: any) => {
        this.setState({ username: e.target.value });
        this.validationsLogin(this.state.username.length);
    }
    public onChangePassword = (e: any) => {
        this.setState({ password: e.target.value });
        this.validationsEmail(this.state.password.length);
    }
    public submit = async (e: any) => {
        Cookies.set('user', this.state.username);
        e.preventDefault();

        const data = new FormData(this.forms)
        await fetch(this.forms.action, {
            method: 'POST',
            body: data
        }).then(e => {
            console.log("Response: ", e.ok);
            fetch(localURL + '/role/' + this.state.username)
                .then(response => response.json())
                .then(data => {
                    Cookies.set('userRole', data);
                    this.setState({ username: '', password: '', signin: true });
                })
                .then(data => { this.setState({ signin: true }); return data });
        })
            .catch(e => { console.log(e.responseText); this.setState({ validstate: 'login or email is not correct', signin: false }) });

    }
    public render() {
        return (
            <Segment>
                <form className='ui form' method="POST" onSubmit={this.submit}
                    ref={(el: any) => (this.forms = el as HTMLFormElement)}>
                    <Form.Field>
                        <span>{this.state.validLogin}</span>
                        <input placeholder='Login or Name' name='username' onChange={this.onChangeUsername} />
                    </Form.Field>
                    <Form.Field>
                        <span>{this.state.validEmail}</span>
                        <input placeholder='Password' name='password' onChange={this.onChangePassword} />
                    </Form.Field>
                    <Button fluid color='green'><Icon name='user secret' />Login</Button>
                </form>
                {this.state.signin === true && this.state.valid === true && systemTool.ifLoged() ? <Redirect to="/user" /> : null}
            </Segment>
        );
    }
}



