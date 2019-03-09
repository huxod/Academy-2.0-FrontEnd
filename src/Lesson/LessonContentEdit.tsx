import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import { Segment, Button, Input, Divider, TextArea, Form, Icon, Progress } from 'semantic-ui-react';
import lessonEditTool from './LessonEditTool';
import { localURL } from '../config'
import LessonContent from './LessonContent';
import Axios from 'axios';



interface RouterEditContentProps extends RouteProps {
    propsRouter: any
}
export default class LessonContentEdit extends React.Component<RouterEditContentProps, any, {}>{
    static contextTypes = {
        router: () => null// replace with PropTypes.object if you use them
    }
    constructor(props: RouterEditContentProps) {
        super(props)
        this.state = {
            content: {
                id: null
            },
            isLoad: true,
            file: null,
            title: '',
            progres:0
        }
    }
    public fileInput:any;
    public forms: any;
    public lessonContent = {
        id: '',
        title: '',
        content: '',
        show: false,
        en: '',
        pl: '',
        enAudio: '',
    }

    public dictionary = {
        wordsEnglish: {
            words: '',
            audioUrl: '',
        },
        wordsPolish: {
            words: '',
        }
    }

    public getContent = async () => {
        await fetch(localURL + '/lesson/' + this.props.propsRouter.match.params.lessonId + '/' + this.props.propsRouter.match.params.itemId)
            .then(response => response.json())
            .then(data => this.setState({ content: data, isLoad: false }))
            .catch(error => this.setState({ isLoad: error, errorLog: error }));
        console.log(this.state.isLoad);
    }
    //Add Title
    public addFile = (file: any, option: string) => {
        //this.addTitle(option)
        let url = "/uploadFile/" + this.props.propsRouter.match.params.itemId;

        console.log("Check", file.name, " Check Option " + option, url)
        const data = new FormData(this.forms)
        data.append('Files', this.state.file)
        Axios.post(localURL+url,data,{
            onUploadProgress: ProgressEvent =>{
                console.log("Progres"+Math.round(ProgressEvent.loaded/ProgressEvent.total * 100))
                this.setState({progres:Math.round(ProgressEvent.loaded/ProgressEvent.total * 100)})
            }
        })

        this.getContent();
        this.forceUpdate();
        this.componentDidMount();
    }

    public addFileAudio = async (file: any, option: string) => {
        this.addTitle(option)
        let url = '/uploadAudio/' + this.dictionary.wordsEnglish.words

        console.log("Check", file.name, " Check Option " + option, url)
        const data = new FormData(this.forms)
        data.append('audioenglish', file)
        await fetch(localURL + url, {
            method: 'POST',
            body: data
        }).catch(e => console.log(e.responseText));
        this.getContent();
        this.forceUpdate();
        this.componentDidMount();
    }
    public addTitle = async (option: string) => {
        if (option == 'content') {
            this.lessonContent.title = this.state.title
            this.lessonContent.content = this.state.content
            lessonEditTool.saveLesoon(this.lessonContent, localURL + "/lessonItem/" + this.props.propsRouter.match.params.itemId)
            console.log(this.state.title)
        }
        if (option == 'words') {
            this.dictionary.wordsEnglish.words = this.state.en
            this.dictionary.wordsPolish.words = this.state.pl
            this.dictionary.wordsEnglish.audioUrl = localURL + '/downloadFile/' + this.state.enAudio.name
            console.log(this.dictionary.wordsEnglish.words)
            lessonEditTool.saveLesoon(this.dictionary, localURL + "/dictionary/save/" + this.props.propsRouter.match.params.itemId)
            console.log(this.state.title)
        }
    }

    public getWords = async () => {
        await fetch(localURL + '/dictionary/' + this.props.propsRouter.match.params.itemId)
            .then(response => response.json())
            .then(data => this.setState({ words: data, show: true }))
            .catch(error => this.setState({ isLoad: error, errorLog: error }))
    }
    public showWordsInput = () => {
        console.log("Check Words", this.state.words)
        return (<div>{this.state.show == true && this.state.words != undefined ?
            this.state.words.map((e: any, i: any) => <div key={i}><Input defaultValue={e.wordsEnglish.words} /><span>  </span><Input type="file" />
                <span> : </span><Input defaultValue={e.wordsPolish.words} />
                <Button.Group>
                    <Button positive>Save</Button>
                    <Button.Or text=":" color='black' />
                    <Button onClick={() => lessonEditTool.deleteLesoon(localURL + '/dictionary/delete/' + e.id)} negative>Delete</Button>
                </Button.Group>
            </div>) : null}
            <div ><Input name='english' type="text" onChange={(e: any) => this.setState({ en: e.target.value })} /><span>  </span>
                <Input name="audioenglish" type="file" onChange={(e: any) => this.setState({ enAudio: e.target.files[0] })} />
                <span> : </span>
                <Input name='polish' type="text" onChange={(e: any) => this.setState({ pl: e.target.value })} />
                <Button onClick={() => { this.addFileAudio(this.state.enAudio, 'words') }}>Add Words</Button> </div></div>)
    }

    public componentDidMount() {
        this.getContent();
        this.getWords();
    }
    
    public render() {
        return (
            <Segment>
                {this.state.content.lessonContent != null || this.state.content.lessonContent != undefined && this.state.isLoad == false ?
                    <LessonContent back={false} propsRouter={this.props.propsRouter} /> : null}
                <Divider />
                <h3>Add Content Lesson</h3>
                <Divider />
                <Input action={{ color: 'teal', labelPosition: 'right', icon: 'edit', content: 'Title Content Lesson' }}
                    onChange={(e: any) => this.setState({ title: e.target.value })} />
                <Divider />
                <Form>
                    <TextArea autoHeight placeholder='Add description of Lesson' onBlur={(e: any) => this.setState({ content: e.target.value })} />
                </Form>
                <Divider />
                <Progress progress='value' value={this.state.progres} total={100} />
                <input style={{display:'none'}} ref={(e:any) => {this.fileInput  = e as HTMLInputElement}} type='file' name="Files" id="Files" onChange={(e: any) => this.setState({ file: e.target.files[0] })} /><p></p>
                <Button onClick={()=> this.fileInput.click()}>Add File</Button>
                <Button onClick={() => this.addFile(this.state.file, 'content')}><Icon name='paper plane outline'/>Upload File</Button>
                <Divider />
                <h3>Add Words</h3>
                {/* {this.showWordsInput()} */}
                <Button basic onClick={this.context.router.history.goBack}><Icon name='backward' /> Back </Button>
            </Segment>
        );
    }
}