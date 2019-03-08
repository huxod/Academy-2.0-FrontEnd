import * as Cookies from "js-cookie";

class SystemTool {
    public ifLoged = () =>{
        if("userRole" in Cookies.getJSON() &&  Cookies.getJSON('userRole').map((ele:any,i:any)=> ele.role === 'USER'?true:false)){
            return true
         }else {
            return false
        }
    }
    
    public onBlur = (e:any,URL:string,showMessage:any) =>{
        console.log("Value "+e.target.value );
        let inputName = e.target.name
        let val = e.target.value;
        if( val == ''){
        val='48f370a772c7496f6c9d2e6d92e920c87dd00a5c';
        }else{
        
        inputName == 'login' || inputName == 'email'?
        (async () => {
            const response = await fetch(URL + "/users/" +val,
                { method: 'GET', headers: {'Accept': 'application/json','Content-Type': 'application/json'}}
            )
            try {
                console.log('Response GetData OK');
                await response.json();
                showMessage(val,'This '+inputName+' is allready use',inputName,false)
            } catch (error) {
                showMessage(val , 'This ' + inputName + ' is Empty' , inputName , true)
                inputName='';
            }       
        })():
        null}
    }
}
const systemTool = new SystemTool;
export default systemTool