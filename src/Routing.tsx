import { Route, Switch, withRouter} from "react-router-dom";
import * as React from "react";
import Home from "./Home/Home";
import Login from "./AccesComponent/Login";
import Signup from "./AccesComponent/Signup";
import Logout from "./AccesComponent/Logout";
import User from "./Users/User";
import LessonGroup from "./Lesson/LessonGroup";
import Lesson from "./Lesson/Lesson";
import LessonContent from "./Lesson/LessonContent";
import LessonContentEdit from "./Lesson/LessonContentEdit";
import LessonExercise from "./Lesson/LessonExercise";
import Users from "./Users/Users";

 class Routing extends React.Component<{}, any> {
    constructor(props: any) {
        super(props);
    }

    public render(){
        return(
        <Route>
            <Switch>
                <Route exact path='/'    component={Home}  />
                <Route  path='/login'    component={Login} />
                <Route  path='/signup'   component={Signup}/>
                <Route  path='/logout'   component={Logout}/>
                <Route  path='/user'     component={User}  />
                <Route  path='/users'    component={Users} />
                <Route exact path={'/lesson'}                                   
                component={(e:any)=><LessonGroup                propsRouter={e}/>}/>
                <Route exact path={'/lesson/:lessonId'}                         
                component={(e:any)=><Lesson                     propsRouter={e}/>}/>
                <Route exact path={'/lesson/:lessonId/:itemId'}                 
                component={(e:any)=><LessonContent back={true}  propsRouter={e}/>}/>
                <Route exact path={'/lesson/:lessonId/:itemId/edit'}            
                component={(e:any)=><LessonContentEdit          propsRouter={e}/>}/>
                <Route exact path={'/lesson/:lessonId/:itemId/exercise'}        
                component={(e:any)=><LessonExercise             propsRouter={e}/>}/>
                <Route exact path={'/lesson/:lessonId/:itemId/edit/:contentId'} 
                component={(e:any)=><LessonContentEdit          propsRouter={e}/>}/>
            </Switch>
        </Route>
        );
    }
}
export default withRouter(Routing)