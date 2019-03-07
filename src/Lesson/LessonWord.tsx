import * as React from 'react';
import { RouteProps} from 'react-router-dom';
import { Segment, Input, Button } from 'semantic-ui-react';



interface RProps extends RouteProps{
  propsRouter:any
  words:any
  count:any
}

  export default class LessonWord extends React.Component<RProps,any,{}>{
    static contextTypes = {
      router: () => null
    }
    constructor(props:RProps){
      super(props)
      this.state = {
        show:null,
      
      }
    }
    public check = (e:any) =>{
        this.props.words.wordsPolish.words == e.target.value ? this.setState({show:true}):null
    }
    public counter(){
        this.props.count
    }
    public render() {
      return (
        <Segment>
            <h2>{this.props.words.wordsEnglish.words}</h2> <Input type="text" onChange={(e:any) => this.check(e)}/>
            {this.state.show == true ?<Button >Next</Button> :null}
        </Segment>
      );
    }
  }