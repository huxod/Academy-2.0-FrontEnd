import * as React from 'react';
import { Segment, Input, Button} from 'semantic-ui-react';
import { Link, RouteProps} from 'react-router-dom';
import lessonEditTool from './LessonEditTool'
import {localURL} from '../config';

interface RouterLessonGroupProps extends RouteProps {
  propsRouter:any
}

  export default class LessonGroup extends React.Component< RouterLessonGroupProps,any> {
    constructor(props:RouterLessonGroupProps){
      super(props)
      this.state = {
        lessonGroup:[{}],
        userRole:'',
        editValue:null,
        isEdit:false,
        isAdd:false,
        buttonMessage:'Add Lesson Group',
        buttonDeleteMessage:'Delete Lesson Group',
        buttonEditMessage:'Edit Lesson Group',
        isLoad:true,

      }
    }
    public back = (edit:boolean,buttonM:string) =>{
      this.setState({edit:false, editValue:null,buttonM:'Edit Lesson Group'});
    }
    //Container Object LessonGroup
    public lessonGroup={
      id:'',
      lessonGroupTitle:''
    }
    //Reolad Content Function
    public reolad = () =>{
      this.setState({isLoad:true});
      setTimeout(()=>{
        this.getLessonGroup();
        this.componentDidMount();
        this.forceUpdate()
        this.setState({isLoad:false});},300);   
    }
    //Save New Group Lesson
    public saveValue = async () =>{
      if(this.state.isAdd === true && this.lessonGroup.lessonGroupTitle !== undefined){
        lessonEditTool.saveLesoon(this.lessonGroup,localURL+'/lessonGroup')
        this.reolad();
      }
      this.state.isAdd === false ? 
      this.setState({buttonMessage:'Save new Lesson',isAdd:true}) :
      this.setState({buttonMessage:'Add Lesson Group',isAdd:false});
    }
    //Delete Group Lesson
    public deleteValue = (id:any) =>{
      if(id !== undefined){
        lessonEditTool.deleteLesoon(localURL+'/lessonGroup/delete/'+id)
        this.reolad();
      }
    }
    //Edit Group Lesson
    public editValue = async (id:any) =>{
      this.setState({editValue:id})
      if(this.state.isEdit === true && this.lessonGroup.lessonGroupTitle !== undefined){
        lessonEditTool.saveLesoon(this.lessonGroup,localURL+'/lessonGroup/'+id)
        this.reolad();
      }
      this.state.isEdit === false && id !== this.state.editValue ? 
      this.setState({buttonEditMessage:'Save new Lesson',isEdit:true}) :
      this.setState({buttonEditMessage:'Edit Lesson Group',isEdit:false});
    }
    //Set Title
    public setValue = (e:any) =>{
      this.lessonGroup.lessonGroupTitle = e.target.value;
      console.log(this.lessonGroup.lessonGroupTitle)
    }
    public getLessonGroup = () =>{

      fetch(localURL+'/lesson')
        .then(response => response.json())
        .then(data => this.setState({lessonGroup:data,isLoad:false})).catch(error =>
          { this.setState({isLoad:true}); return error});
    }
    public componentWillMount(){
      // forward functions to the class 
      lessonEditTool.save = this.saveValue;
      lessonEditTool.delete = this.deleteValue;
      lessonEditTool.edit = this.editValue;
    }
    public componentDidMount(){  
       this.getLessonGroup()
    }
    public render() {
      if(this.state.isLoad !== false ){
         return <h1>Loading...</h1>
      } 
      return (
        <Segment>
          {this.state.lessonGroup.map((ele:any, i:any)=>
            (<Segment key={i}><h3 className="left">
            {this.state.isEdit == true && ele.id == this.state.editValue ? (<div>
              <Button circular color='google plus' icon='delete' size={"mini"} 
              style={{margin:'6px'}} onClick={() => this.back(this.state.isEdit,this.state.buttonMessage)}/>
              <Input size={"mini"} name="lessonGroupTitle" defaultValue={ele.lessonGroupTitle} onChange={(e)=>this.setValue(e)}></Input>
            </div>):
            (<Link to={this.props.propsRouter.match.url+'/'+ele.id} >{ele.lessonGroupTitle}</Link>)}</h3>
            {lessonEditTool.ifTeacher(this.state.buttonDeleteMessage,'delete',ele)}
            {this.state.isEdit !== true || ele.id == this.state.editValue ?
             lessonEditTool.ifTeacher(this.state.buttonEditMessage,'edit',ele):null}
            </Segment>))}
          {this.state.isAdd === true ? <div><input name="lessonGroupTitle" onChange={(e)=>this.setValue(e)}></input>
          <Button circular color='google plus' icon='delete' size={"mini"} 
          style={{margin:'6px'}} onClick={() => this.back(this.state.isAdd,this.state.buttonMessage)}/></div>:null}
          {lessonEditTool.ifTeacher(this.state.buttonMessage,'save',null)}
        </Segment>
      );
    }
  }