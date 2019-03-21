import * as React from 'react';
import { Segment, Accordion, Icon, Container, Divider, Input, Button } from 'semantic-ui-react';
import { RouteProps, Link } from 'react-router-dom';
import lessonEditTool from './LessonEditTool'
import { localURL } from '../config'

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
      activeIndex:0,
    }
  }
  public lesson = {
    id: '',
    title: ''
  }
  public getLesson = async () => {
    await fetch(localURL + '/lessons/' + this.props.propsRouter.match.params.lessonId + '?sort=id&id.dir=asc')
      .then(response => response.json())
      .then(data => this.setState({ lesson: data, isLoad: false }))
      .catch(error => this.setState({ isLoad: error, errorLog: error }));
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
  //Delete Lesson
  public deleteValue = (id: any) => {
    if (id !== undefined) {
      lessonEditTool.deleteLesoon(localURL + '/lesson/delete/' + id)
      this.reolad();
    }
  }
  //Edit Lesson
  public editValue = async (id: any) => {
    console.log("Edit: " + id, "Is Edit: " + this.state.isEdit)
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

  public back = (option: string) => {
    option == 'add' ? this.setState({ isAdd: false, buttonMessage: 'Add Lesson Group' }) : null;
    option == 'edit' ? this.setState({ isEdit: false, editValue: null, buttonEditMessage: 'Edit Lesson Group' }) : null;
  }

  public componentDidMount() {
    this.getLesson();
    lessonEditTool.propsRouter = this.props.propsRouter
    lessonEditTool.save = this.saveValue
    lessonEditTool.edit = this.editValue
    lessonEditTool.delete = this.deleteValue
  }
  //Acordion
  private handleClick = (e: any, titleProps: any) => {
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
            <Accordion key={i} fluid styled>
              <Accordion.Title active={this.state.activeIndex === i} index={i} onClick={this.handleClick}>
                {this.state.isEdit == true && ele.id == this.state.editValue ?
                  <div>
                    <Input name="lessonGroupTitle" defaultValue={ele.title} onChange={(e) => this.setValue(e)}></Input>
                    <Button circular color='google plus' icon='delete' size={"mini"}
                      style={{ margin: '6px' }} onClick={() => this.back('edit')} />
                  </div> :
                  <h2>Lesson {i+1}:<span> </span> {ele.title} <Icon name='dropdown' /></h2>}
                <div>
                  {this.state.isEdit !== true && this.state.isAdd !== true ?
                    lessonEditTool.ifTeacher(this.state.buttonDeleteMessage, 'delete', ele) : null}
                  {this.state.isEdit !== true && this.state.isAdd !== true || ele.id == this.state.editValue ?
                    lessonEditTool.ifTeacher(this.state.buttonEditMessage, 'edit', ele) : null}
                </div>
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === i && this.state.isEdit === false}>
                <Divider />
                {ele.lessonContent != null ? <div><Link to={this.props.propsRouter.match.url + '/' + ele.id} >
                  {ele.lessonContent.title}</Link>
                  <span>  </span>{lessonEditTool.ifTeacher('Edit Lesson', 'check', ele)}
                  <Divider />
                  {Array.isArray(this.state.lesson.dictionaries) === true ? 'No Exercise' : <Link to={this.props.propsRouter.match.url+'/'+ ele.id +'/exercise/'}>Exercise </Link>}
                </div> :
                  <Link to={this.props.propsRouter.match.url + '/' + ele.id + '/edit'}>Add Lesson Body </Link>}
              </Accordion.Content>
            </Accordion>
            <Divider />
          </Container>
        )) : <h2>No lesson</h2>}
        {this.state.isAdd === true ?
          <div>
            <Input name="lessonTitle" onChange={(e) => this.setValue(e)}></Input>
            <Button circular color='google plus' icon='delete' size={"mini"}
              style={{ margin: '6px' }} onClick={() => this.back('add')} />
          </div>: null}
        {this.state.isEdit !== true ? lessonEditTool.ifTeacher(this.state.buttonMessage, 'save', null) : null}
      </Segment>
    );
  }
}