/// <reference path='./index.d.ts'/>
import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import {Placeholder, Segment, Grid } from 'semantic-ui-react';
import Routing from './Routing';
import MenuList from './MenuList';

class App extends React.Component<{}, any> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Academy Learn</h1>
            </header>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column width={14}>
                    <Placeholder></Placeholder>
                    <Segment inverted>
                        <MenuList />
                    </Segment>
                        <Placeholder></Placeholder>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Routing />
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
            </Grid>
            <Segment vertical inverted><p>Copyright: Hubert Langier</p></Segment>
        </div>        
    }
}
export default App;
