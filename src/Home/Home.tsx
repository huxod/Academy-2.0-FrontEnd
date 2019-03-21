import * as React from 'react';
import { Segment, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default class Home extends React.Component<{},any>{
    constructor(props:any){
        super(props)
        this.state = {
      
        }
    }

    public render(){
        return (
        <Segment>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                    <h1>Witaj na platformie eLanguage Academy</h1>
                    <h3>Ucz się Języka nie wychodząc z domu</h3>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{height:'45px'}} width={16}>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column width={2}>

                    </Grid.Column>
              
                    <Grid.Column width={6}>
                    <h4>Jeśli jeszcze nigdy nie korzystaleś z naszej platformy tutaj możesz zalożyć konto</h4>
                    <Link to='/signup'><Button size='big' color='blue' >SignUp</Button></Link>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <h4>Jeśli posiadasz już konto na naszej platformie zaloguj się i przejdź do lekcji</h4>
                    <Link to="/login" ><Button size='big' color='green'>Login</Button></Link>
                    </Grid.Column>
                    <Grid.Column width={2}>

                    </Grid.Column>
            
                </Grid.Row>
                <Grid.Row >
              
              <Grid.Column style={{height:'300px'}} width={16}>
                
              </Grid.Column>
      
          </Grid.Row>

            </Grid>
        </Segment>)
    }
}