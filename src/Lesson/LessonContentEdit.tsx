import * as React from 'react';
import { RouteProps} from 'react-router-dom';
import { Segment, Button, Input, Divider, TextArea, Form } from 'semantic-ui-react';
import lessonEditTool from './LessonEditTool';
import {localURL} from '../config'
import LessonContent from './LessonContent';


interface RouterEditContentProps extends RouteProps {
  propsRouter:any
}
  export default class LessonContentEdit extends React.Component<RouterEditContentProps,any,{}>{
    static contextTypes = {
      router: () => null// replace with PropTypes.object if you use them
    }
    constructor(props:RouterEditContentProps){
      super(props)
      this.state = {
        content:{
            id:null},
        isLoad:true,
        file:null,
        title:'',
      }
    }
    public forms: any;
    public lessonContent={
        id:'',
        title:'',
        content:'',
        show:false,
        en:'',
        pl:'',
        enAudio:'',
    }

    public dictionary={
        wordsEnglish: {
            words:'',
            audioUrl:'',
        },
        wordsPolish: {
            words:'',
        }
    }

    public getContent = async () =>{
        await fetch(localURL+'/lesson/'+this.props.propsRouter.match.params.lessonId+'/'+this.props.propsRouter.match.params.itemId)
        .then(response => response.json())
        .then(data => this.setState({content:data, isLoad:false})) 
        .catch(error => this.setState({isLoad:error,errorLog:error}));
        console.log(this.state.isLoad);
      }
    //Add Title
    public addFile = async (file:any,option:string) =>{
        this.addTitle(option)
        let url;
        if(option != 'words'){
            url = "/uploadFile/"+this.props.propsRouter.match.params.itemId;
        }else{
            url = '/uploadAudio/'+this.dictionary.wordsEnglish.words
        }
        console.log("Check", file.name , url)
        const data = new FormData(this.forms)
        data.append('file',file)
        await fetch(localURL+url, {
            method: 'POST',
            body: data
        }).catch(e => console.log(e.responseText));
        this.getContent();
        this.forceUpdate();
        this.componentDidMount();
    }
    public addTitle = async (option:string) =>{
       if( option == 'content'){
        this.lessonContent.title = this.state.title
        this.lessonContent.content = this.state.content
        
        lessonEditTool.saveLesoon(this.lessonContent,localURL+"/lessonItem/"+this.props.propsRouter.match.params.itemId)
        console.log(this.state.title)}
        if( option == 'words'){
            this.dictionary.wordsEnglish.words = this.state.en
            this.dictionary.wordsPolish.words = this.state.pl
            this.dictionary.wordsEnglish.audioUrl = localURL+'/downloadFile/'+this.state.enAudio.name
            console.log(this.dictionary.wordsEnglish.words)
           lessonEditTool.saveLesoon(this.dictionary,localURL+"/dictionary/save/"+this.props.propsRouter.match.params.itemId)
            console.log(this.state.title)}
    }
    public setValueFile = (e:any) =>{
        this.setState({file:e.target.files[0]})
       setTimeout(()=>{ console.log(this.state.file)},1400)
    }

    public getWords = async() =>{
        await fetch(localURL+'/dictionary/'+this.props.propsRouter.match.params.itemId)
              .then(response => response.json())
              .then(data => this.setState({words:data, show:true}))
              .catch(error => this.setState({isLoad:error,errorLog:error}))
      }
      public showWordsInput = () =>{
          console.log("Check Words",this.state.words)
        return (<div>{this.state.show == true && this.state.words != undefined?
         this.state.words.map((e:any,i:any)=> <div key={i}><Input defaultValue={e.wordsEnglish.words}/><span>  </span><Input type="file"/>
         <span> : </span><Input defaultValue={e.wordsPolish.words}/> 
         <Button.Group>
           <Button positive>Save</Button>
           <Button.Or text=":" color='black'/>
           <Button onClick={()=>lessonEditTool.deleteLesoon(localURL+'/dictionary/delete/'+e.id)} negative>Delete</Button>
         </Button.Group>
         </div>):null}
         <div ><Input name='english' type="text" onChange={(e:any)=>this.setState({en:e.target.value})}/><span>  </span>
         <Input name="audioenglish" type="file" onChange={(e:any)=>this.setState({enAudio: e.target.files[0]})}/>
         <span> : </span>
         <Input name='polish' type="text"  onChange={(e:any)=>this.setState({pl:e.target.value})}/>
         <Button onClick={()=>{this.addFile(this.state.enAudio,'words')}}>Add Words</Button> </div></div>)
      }
   
        

    public componentDidMount(){ 
        this.getContent();
        this.getWords();
    }
    public render() {
      return (
        <Segment>
          {this.state.content.lessonContent != null || this.state.content.lessonContent != undefined && this.state.isLoad == false ?
          <LessonContent back={false} propsRouter={this.props.propsRouter}/>:null} 
            <Divider/>
            <h3>Add Content Lesson</h3>
            <Divider />
            <Input action={{ color: 'teal', labelPosition: 'right', icon: 'edit', content: 'Title Content Lesson' }}
                onChange={(e:any)=>this.setState({title:e.target.value})}/>
            <Divider />
            <Form>
            <TextArea autoHeight placeholder='Add description of Lesson' onBlur={(e:any)=>this.setState({content:e.target.value})}/>
            </Form>
            <Divider />
            <Input action={{ color: 'teal', labelPosition: 'right', icon: 'upload', content: 'Image Lesson' }}
                type='file' onChange={(e)=>this.setValueFile(e)}/><p></p>
            <Button onClick={()=> this.addFile(this.state.file,'content')}>Add File</Button>
            <Divider />
            <h3>Add Words</h3>
            {this.showWordsInput()}
          <Button basic icon="back"onClick={this.context.router.history.goBack}> Back </Button>
        </Segment>
      );
    }
  }