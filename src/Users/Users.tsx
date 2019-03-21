import * as React from 'react';
import { Segment, Input, Button, Table} from 'semantic-ui-react';
import { localURL } from '../config';


export default class Users extends React.Component<any, any> {
    public edit = {
        'login': false,
        'name': false,
        'lastName': false,
        'email': false,
        'password': false
    }
    public user = {}
    constructor(props: any) {
        super(props)
        this.state = {
            isLoad: true,
            userName: '',
            user: null,
            role: null
        }
    }

    public getUsers = async () => {
        this.setState({ isLoad: true })
        await fetch(localURL + '/users/' + this.state.userName,
            {
                method: 'GET',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(data => { console.log(data); this.setState({ user: data }) })
            .then(data => { data; console.log(this.state.user); this.setState({ isLoad: false }) })
    }

    public componentDidMount() {
        this.setState({ isLoad: false })
    }
    public render() {
        const { } = this.props;

        if (this.state.isLoad !== false) {
            return <h1>Loading...</h1>
        }
        return (
            <Segment>
                <h1>Hello Users</h1>
                <Input type="text" onChange={(e: any) => this.setState({ userName: e.target.value })} />
                {<Button onClick={() => this.getUsers()}>Add user</Button>}
                <span></span>
                {this.state.user !== null && this.state.isLoad == false ?
                    <div>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>User login:</Table.HeaderCell>
                                    <Table.HeaderCell>User name:</Table.HeaderCell>
                                    <Table.HeaderCell>User email:</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{this.state.user.login}</Table.Cell>
                                    <Table.Cell>{this.state.user.name}</Table.Cell>
                                    <Table.Cell>{this.state.user.email}</Table.Cell>
                                </Table.Row>
                                
                                <Table.Row>
                                    <Table.Cell colSpan='3'>User Roles:
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>{this.state.user.roles[0].role}</Table.Cell>
                                    <Table.Cell>{this.state.user.roles[1].role}</Table.Cell>
                                    <Table.Cell>{this.state.user.roles[2].role}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='3'>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </div> : <h3>No user</h3>}
            </Segment>
        );
    }
}