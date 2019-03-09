/* import * as React from 'react';

import { RouteProps } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';


interface RProps extends RouteProps {
  propsRouter:any
}
  export default class LessonItem extends React.Component<RProps,any,{}>{
    constructor(props:RProps){
      super(props)
      this.state = {
      }
    }
    public render() {
      return (
        <Segment>
           <h4>Hello Lessons </h4>
           <h2>{this.props.propsRouter.match.params.itemId}</h2>
        </Segment>
         
      );
    }
  } */