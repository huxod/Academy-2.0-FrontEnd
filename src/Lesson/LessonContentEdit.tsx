import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import { Segment, Button, Input, Divider, TextArea, Form, Icon, Progress, List } from 'semantic-ui-react';
import lessonEditTool from './LessonEditTool';
import { localURL } from '../config'
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
            progress: 0,
            progressAudio: 0,
            lessonContent: this.lessonContent,
        }
    }
    public fileInput: any;
    public fileInputAudio: any;
    public forms: any;
    public lessonContent = {
        id: '',
        title: '',
        content: ''
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
        await fetch(localURL + '/lesson-json/' + this.props.propsRouter.match.params.lessonId + '/'
            + this.props.propsRouter.match.params.itemId)
            .then(response => response.json())
            .then(data => this.setState({ content: data, isLoad: false }))
            .catch(error => this.setState({ isLoad: error, errorLog: error }));
        this.setState({ lessonContent: this.state.content.lessonContent })
    }
    //Add Title
    public addFile = async (file: any, option: string) => {

        this.setState({ title: this.lessonContent.title, content: this.lessonContent.content })
        this.setState({ progress: 0 })

        let data = new FormData(this.forms)
        data.append('Files', this.state.file)
        Axios.post(localURL + '/uploadFile/' + this.props.propsRouter.match.params.itemId, data, {
            onUploadProgress: ProgressEvent => {
                this.setState({ progress: Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) })
            }
        }).then(request => { request; return this.componentDidMount() })
    }
    public addContent = async () => {
        this.setState({ title: this.lessonContent.title, content: this.lessonContent.content })
        await Axios.post(localURL + "/lessonItem/" + this.props.propsRouter.match.params.itemId, this.lessonContent)
            .then(request => { request; return this.componentDidMount() });
    }
    public addTitle = async (option: string) => {

        this.setState({ progressAudio: 0 })

        let data = new FormData(this.forms)
        data.append('audioenglish', this.state.file)

        if (option == 'word') {
            this.dictionary.wordsEnglish.words = this.state.en
            this.dictionary.wordsPolish.words = this.state.pl
            this.dictionary.wordsEnglish.audioUrl = localURL + '/downloadFile/' + this.state.file.name
            await Axios.post(localURL + "/dictionary/save/" + this.props.propsRouter.match.params.itemId, this.dictionary)
                .then(request => {
                    console.log(request); return Axios.post(localURL + '/uploadAudio/' + this.state.en, data, {
                        onUploadProgress: ProgressEvent => {
                            console.log("Progres" + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100));
                            this.setState({ progressAudio: Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) })
                        }
                    }).then(request => { console.log(request); return this.componentDidMount() })
                });
        }
    }



    public getWords = async () => {
        await fetch(localURL + '/dictionary/' + this.props.propsRouter.match.params.itemId)
            .then(response => response.json())
            .then(data => this.setState({ words: data, show: true }))
            .catch(error => this.setState({ isLoad: error, errorLog: error }))
    }
    public showWordsInput = () => {
        return (<div><Progress percent={this.state.progressAudio} size='tiny' color="olive" />
            {this.state.show == true && this.state.words != undefined ?
                this.state.words.map((e: any, i: any) =>
                    <List divided relaxed style={{ textAlign: 'left' }} key={i}><List.Item>{e.wordsEnglish.words}<span>  </span>
                        <Button circular basic color='blue' icon="volume up" onClick={() => { new Audio(e.wordsEnglish.audioUrl).play() }}></Button>
                        <span> : </span> {e.wordsPolish.words}
                        <Button floated='right' onClick={() => lessonEditTool.deleteLesoon(localURL + '/dictionary/delete/' + e.id)} negative>Delete</Button>
                    </List.Item>
                    </List>
                ) : null}
            <div style={{ textAlign: 'left' }}>
                <List relaxed style={{ textAlign: 'left' }} horizontal>
                    <List.Item >
                        <List.Header style={{ marginBottom: '10px' }}>english</List.Header>
                        <List.Content >
                            <Input name='english' type="text" onChange={(e: any) => this.setState({ en: e.target.value })} />
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Header style={{ marginBottom: '10px' }}>Add audio file</List.Header>
                        <List.Content>
                            <input name="audioenglish" type="file" onChange={(ele: any) => this.setState({ file: ele.target.files[0] })}
                                style={{ display: 'none' }} ref={(ele: any) => { this.fileInput = ele as HTMLInputElement }} />
                            <Button basic color="teal" onClick={() => this.fileInput.click()}>Add File</Button>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Header style={{ marginBottom: '10px' }}>polish</List.Header>
                        <List.Content>
                            <Input name='polish' type="text" onChange={(e: any) => this.setState({ pl: e.target.value })} />
                            <Button basic color="teal" floated='right' onClick={() => this.addTitle('word')}>Add Words</Button>
                        </List.Content>
                    </List.Item>
                </List>

            </div>
        </div>)
    }
    public showFileInput = () => {
        return <div>
            {this.state.content.lessonItem == undefined ?
                <h3>No Images</h3> : <img width={'30%'} src={this.state.content.lessonItem.imageUrl} />}
            <Progress percent={this.state.progress} size='tiny' color="olive" />
            <input style={{ display: 'none' }} ref={(e: any) => { this.fileInputAudio = e as HTMLInputElement }} type='file' name="Files" id="Files"
                onChange={(e: any) => this.setState({ file: e.target.files[0] })} /><p></p>
            <Button basic color="teal" onClick={() => this.fileInputAudio.click()}>Add File</Button>
            <Button basic color="teal" onClick={() => this.addFile(this.state.file, 'content')}><Icon name='paper plane outline' />Upload File</Button>
            <Divider />
        </div>
    }
    public componentWilMount() {
        this.getContent();
        this.getWords();
    }
    public componentDidMount() {
        this.getContent();
        this.getWords();
    }
    public render() {
        return (
            <Segment>
                <Divider />
                <h3>Add Content Lesson</h3>
                <Divider />
                <p>Lesson body title:</p>
                <h3>{this.state.lessonContent !== null ? this.state.lessonContent.title : 'Add new title'}</h3>
                <Input action={{ color: 'teal', labelPosition: 'right', icon: 'edit', content: 'Title Content Lesson' }}
                    onChange={(e: any) => { this.lessonContent.title = e.target.value }} />
                <Divider />
                <p>Lesson body content:</p>
                <h3>{this.state.lessonContent !== null ? this.state.lessonContent.content : 'Add new contnt'}</h3>

                <Form>
                    <TextArea autoHeight placeholder='Add description of Lesson'
                        onChange={(e: any) => { this.lessonContent.content = e.target.value }} />
                </Form>
                <Button
                    content={'Save new lesson content'}
                    basic
                    color="teal"
                    icon="save"
                    style={{ margin: '10px 0' }}
                    onClick={() => this.addContent()} />
                <Divider />
                <h3>Add Image</h3>
                {this.state.lessonContent === null ? <h3>If you have add lesson image write firs content and title </h3> : this.showFileInput()}
                <Divider />
                <h3>Add Words</h3>
                {this.state.lessonContent === null ? <h3>If you have add lesson word write firs content and title</h3> : this.showWordsInput()}
                <Divider />
                <Button basic onClick={this.context.router.history.goBack}><Icon name='backward' /> Back </Button>
            </Segment>
        );
    }
}