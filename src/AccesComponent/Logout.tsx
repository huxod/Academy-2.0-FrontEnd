import * as React from "react";
import { Segment } from "semantic-ui-react";
import * as Cookies from "js-cookie";
import systemTool from "../SystemTool";
import { Redirect } from "react-router";

export default class Logout extends React.Component<any,any>{ 
    constructor(props: any) {
        super(props);
        this.state={

        }
    }
public componentWillMount(){
    Cookies.remove('user');
    Cookies.remove('userRole');
    Cookies.remove('JSESSIONID');
    }
public render() {

    return (
        <Segment>
            <h1>Logout</h1>
            {!systemTool.ifLoged()?<Redirect to="/" />:null}
        </Segment>
    );
}
}