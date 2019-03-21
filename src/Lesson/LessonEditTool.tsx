import * as Cookies from "js-cookie";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import * as React from "react";
import {Link} from 'react-router-dom';  

class LessonEditTool {
        // Send Data
        async saveLesoon (item:any,URL:any){
        console.log(item);
        const settings = {
            method: 'POST', headers: {Accept: 'application/json','Content-Type': 'application/json'},
            body:JSON.stringify(item)
        };
        const data = await fetch(URL, settings)
            .then(response => response.json())
                .catch(e => {return e})
                .then(json => console.log(json))
                .then(json => {return json;})
                .catch(e => {return e});
        return data;
    }
        // Send Data
    deleteLesoon (URL:any){
        let settings = { method: 'DELETE', headers: {Accept: 'application/json','Content-Type': 'application/json'},};
            fetch(URL, settings)
                .then(response => console.log(response))
                .catch(e => {return e})
    }
    propsRouter:any
    save   = function(e:any){};
    delete = function(e:any){};
    edit = function(e:any){};
    //Check user role
    ifTeacher = (buttonMessage:string,option:string,obj:any) =>{
        if(option == 'save'){
            return Cookies.getJSON('userRole').map((ele:any,i:any)=> ele.role === 'TEACHER'?
            (<Button  size="mini" basic color='teal' key={i}  onClick={(e) => this.save(e)}>{buttonMessage}</Button>):null)
        }else if(option == 'delete'){
            return Cookies.getJSON('userRole').map((ele:any,i:any)=> ele.role === 'TEACHER'?
            (<Button  size="mini" basic color='red' key={i}  onClick={() => this.delete(obj.id)}>{buttonMessage}</Button>):null)
        }else if(option == 'edit'){
            return Cookies.getJSON('userRole').map((ele:any,i:any)=> ele.role === 'TEACHER'?
            (<Button  size="mini" basic color='teal' key={i}  onClick={() => this.edit(obj.id)}>{buttonMessage}</Button>):null)
        }else if(option == 'check'){
            return Cookies.getJSON('userRole').map((ele:any,i:any)=> ele.role === 'TEACHER'?
            <Link key={i} to={this.propsRouter.match.url+'/'+obj.id+'/edit/'+obj.lessonContent.id}>
            <Button size="mini" basic color='teal' icon={'edit'} content={buttonMessage}/></Link> :null);
        }else{
            return null
        }
    }
}
const lessonEditTool = new LessonEditTool
export default lessonEditTool