import * as React from 'react';
import { RouteProps, Link } from 'react-router-dom';
import { localURL } from '../config';
import { Segment, Divider, Button, List } from 'semantic-ui-react';



interface RProps extends RouteProps {
  propsRouter: any
  back: boolean
}
export default class LessonContent extends React.Component<RProps, any, {}>{
  static contextTypes = {
    router: () => null// replace with PropTypes.object if you use them
  }
  constructor(props: RProps) {
    super(props)
    this.state = {
      content: null,
      isLoad: true,
      words: 'nima nic',
      show: false,

    }
  }


  //Get Lesson Content
  public getContent = async () => {
    await fetch(localURL + '/lesson-json/' + this.props.propsRouter.match.params.lessonId + '/' + this.props.propsRouter.match.params.itemId)
      .then(response => response.json())
      .catch(error => this.setState({ isLoad: error, errorLog: error }))
      .then(data => this.setState({ content: data, isLoad: false }))
      ;
  }
  public getWords = async () => {
    await fetch(localURL + '/dictionary/' + this.props.propsRouter.match.params.itemId)
      .then(response => response.json())
      .then(data => this.setState({ words: data, show: true }))
      .catch(error => this.setState({ isLoad: error, errorLog: error, show: false }))
  }
  public showWords = () => {
    return this.state.show == true || this.state.words != undefined ?
      this.state.words.map((e: any, i: any) =>
        <List divided relaxed style={{ textAlign: 'left' }} key={i}><List.Item>{e.wordsEnglish.words}<span>  </span>
          <Button circular basic color='blue' icon="volume up" onClick={() => { new Audio(e.wordsEnglish.audioUrl).play() }}></Button>
          <span> : </span> {e.wordsPolish.words}

        </List.Item>
        </List>
      ) : null
  }
  public componentDidMount() {
    this.getContent();
    this.getWords()
  }

  public render() {
    if (this.state.isLoad !== false || this.state.isLoad === this.state.errorLog) {
      return <h1>Loading....{this.state.errorLog}</h1>
    }
    return (
      <Segment>
        {this.props.back ? <Button onClick={this.context.router.history.goBack}>Back</Button> : null}
        <Divider />
        {this.state.content.lessonItem != null && this.state.isLoad == false ?
          <img width="300px" src={this.state.content.lessonItem.imageUrl} alt={this.state.content.lessonItem.imageUrl} /> : null}
        <Divider />
        <h3>{this.state.content.title}</h3>
        <h5>{this.state.content.lessonContent.content}</h5>
        <h4>Words</h4>
        {this.state.show == true ? this.showWords() : 'niema'}
        <Divider />
        {this.state.words[0] == null ? 'No Exercise' : <Link to={this.props.propsRouter.match.url + '/exercise'}>Exercise </Link>}
      </Segment>
    );
  }
}