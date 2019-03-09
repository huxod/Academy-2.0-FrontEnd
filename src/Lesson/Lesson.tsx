import * as React from 'react';
import { Segment, Accordion, Icon, Container, Divider, Input } from 'semantic-ui-react';
import { RouteProps, Link } from 'react-router-dom';
import lessonEditTool from './LessonEditTool'
import { localURL } from '../config'
// import LessonWords from './LessonWords';
// import LessonExercise from './LessonExercise';
// import LessonContent from './LessonContent';

interface RouterLessonProps extends RouteProps {
  propsRouter: any
}
export default class Lesson extends React.Component<RouterLessonProps, any, {}> {
  constructor(props: RouterLessonProps) {
    super(props)
    this.state = {
      lesson: null,
      isLoad: true,
      editValue: null,
      errorLog: '',
      isEdit: false,
      isAdd: false,
      buttonMessage: 'Add Lesson',
      buttonEditMessage: 'Edit Lesson',
      buttonDeleteMessage: 'Delete Lesson',
    }
  }
  public lesson = {
    id: '',
    title: ''
  }
  public getLesson = async () => {
    lessonEditTool.save = this.saveValue
    lessonEditTool.edit = this.editValue
    lessonEditTool.delete = this.deleteValue
    await fetch(localURL + '/lessons/' + this.props.propsRouter.match.params.lessonId + '?sort=id&id.dir=asc')
      .then(response => response.json())
      .then(data => this.setState({ lesson: data, isLoad: false })).catch(error => this.setState({ isLoad: error, errorLog: error }));
  }
  public SetValue = (e: any) => {
    this.lesson.title = e.target.value;
    console.log(this.lesson.title)
  }
  //Reolad Content Function
  public reolad = () => {
    this.setState({ isLoad: true });
    setTimeout(() => {
      this.getLesson();
      this.componentDidMount();
      this.forceUpdate()
      this.setState({ isLoad: false });
    }, 300);
  }
  //Save New Group Lesson
  public saveValue = async () => {
    if (this.state.isAdd === true && this.lesson.title !== undefined) {
      lessonEditTool.saveLesoon(this.lesson, localURL + '/lesson/' + this.props.propsRouter.match.params.lessonId)
      this.reolad();
    }
    this.state.isAdd === false ?
      this.setState({ buttonMessage: 'Save new Lesson', isAdd: true }) :
      this.setState({ buttonMessage: 'Add Lesson', isAdd: false });
  }
  //Delete Group Lesson
  public deleteValue = (id: any) => {
    if (id !== undefined) {
      lessonEditTool.deleteLesoon(localURL + '/lesson/delete/' + id)
      this.reolad();
    }
  }
  //Edit Group Lesson
  public editValue = async (id: any) => {
    this.setState({ editValue: id })
    if (this.state.isEdit === true && this.lesson.title !== undefined) {
      lessonEditTool.saveLesoon(this.lesson, localURL + '/lesson/edit/' + id)
      this.reolad();
    }
    this.state.isEdit === false && id !== this.state.editValue ?
      this.setState({ buttonEditMessage: 'Save new Lesson', isEdit: true }) :
      this.setState({ buttonEditMessage: 'Edit Lesson', isEdit: false });
  }
  //Set Title
  public setValue = (e: any) => {
    this.lesson.title = e.target.value;
    console.log(this.lesson.title)
  }

  public componentDidMount() {
    this.getLesson();
    lessonEditTool.propsRouter = this.props.propsRouter
  }
  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }
  public render() {
    if (this.state.isLoad !== false || this.state.isLoad === this.state.errorLog) {
      return <h1>Loading....{this.state.errorLog}</h1>
    }
    return (
      <Segment>
        {this.state.lesson.content !== undefined ? this.state.lesson.content.map((ele: any, i: any) => (
          <Container key={i}>
            {this.state.isEdit == true && ele.id == this.state.editValue ?
              (<Input name="lessonGroupTitle" defaultValue={ele.title} onChange={(e) => this.setValue(e)}></Input>) :
              (<Accordion key={i} fluid styled>
                <Accordion.Title active={this.state.activeIndex === i} index={i} onClick={this.handleClick}>
                  <h2>Lesson {ele.id} {ele.title} <Icon name='dropdown' /></h2>
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === i}>
                  <Divider />
                  {ele.lessonContent != null ? <div><Link to={this.props.propsRouter.match.url + '/' + ele.id} >{ele.lessonContent.title}</Link>
                    <span>  </span>{lessonEditTool.ifTeacher('Edit Lesson', 'check', ele)}</div> :
                    <Link to={this.props.propsRouter.match.url + '/' + ele.id + '/edit'}>Add Lesson Body </Link>}
                </Accordion.Content>
              </Accordion>)}
            <Divider />
            {lessonEditTool.ifTeacher(this.state.buttonDeleteMessage, 'delete', ele)}
            {this.state.isEdit !== true || ele.id == this.state.editValue ?
              lessonEditTool.ifTeacher(this.state.buttonEditMessage, 'edit', ele) : null}
          </Container>
        )): <h2>No lesson</h2>}
        {this.state.isAdd === true ? <input name="lessonTitle" onChange={(e) => this.setValue(e)}></input> : null}
        {lessonEditTool.ifTeacher(this.state.buttonMessage, 'save', null)}
      </Segment>
    );
  }
}