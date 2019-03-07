import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import LessonWord from './LessonWord';
import { localURL } from '../config';

interface RRProps extends RouteProps {
  propsRouter:any
}
  export default class LessonExercise extends React.Component<RRProps,any,{}>{
    constructor(props:any){
      super(props)
      this.state = {
        words:null,
        show:null,
        isLoad:null,
        count:0,
      }
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
      let a = this.state.count;
      a += 1;
      this.setState({count:a});
    }
    public render() {
      if (this.state.isLoad != true){
        return <h4>Loading</h4>
      }
      const i = this.state.count
      return (
        this.state.words[0] != undefined?
        <LessonWord  propsRouter={this.props.propsRouter} words={this.state.words[i]} count={this.counter()} />:null
      );
    }
  }