import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import { localURL } from '../config';
import { Segment, Input, Button } from 'semantic-ui-react';
import lessonEditTool from './LessonEditTool';
import * as Cookies from 'js-cookie';

interface RRProps extends RouteProps {
  propsRouter:any
}
  export default class LessonExercise extends React.Component<RRProps,any,{}>{
    constructor(props:any){
      super(props)
      this.state = {
        words:null,
        show:null,
        isLoad:false,
        count:0,
        showNext:false,
        value:'',
      }
    }
    public showButton = () =>{
        return this.state.showNext == true ?<Button onClick={()=>this.counter()}>Next</Button> :null
    }
    public dictionary:{
      id:any
    }
    public getWords = async() =>{
      await fetch(localURL+'/dictionary/'+this.props.propsRouter.match.params.itemId)
            .then(response => response.json())
            .then(data => this.setState({words:data, show:true,isLoad:true}))
            .catch(error => this.setState({isLoad:error,errorLog:error}))
    }
    public componentDidMount(){
      this.getWords()
    }
    public counter = () =>{
      
      lessonEditTool.saveLesoon({id:this.state.words[this.state.count].id},'http://localhost:8080/score/'+Cookies.get('Id'));
      let a = this.state.count;
      console.log("długść " +a, "Długość całkowita " + this.state.words.length)
      this.state.count < this.state.words.length -1 ? a += 1:null;
      this.setState({count:a});
      this.setState({showNext:false});
     
    }
    public check = (e:any) =>{
      return this.state.words[this.state.count].wordsPolish.words == e.target.value ? 
      this.setState({showNext:true}):this.setState({showNext:false});
  }
  public changeValue = (e:any) =>{
    e.target.value = '';
  }
    public render() {
      if(this.state.isLoad == false){
          return <h3>Loading</h3>
      }
    return (
      <Segment>
          {this.state.isLoad != false ? <div><h2>{this.state.words[this.state.count].wordsEnglish.words}</h2> 
          <Input onBlur={(e:any)=>this.changeValue(e)}  type="text" defaultValue={this.state.value} onChange={(e:any) => this.check(e)}/></div>:null}
          {this.showButton()}
      </Segment>
      );
    }
  }