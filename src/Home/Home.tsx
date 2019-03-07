import * as React from 'react';
import { Segment, Grid, List, Input } from 'semantic-ui-react';
import  getDictionary from '../Dictionary/GetDictionary';

export default class Home extends React.Component<{},any>{
    constructor(props:any){
        super(props)
        this.state = {
            sentence_pl:'',
            sentence_en:'',
            dictionaryPl:{},
            getWords:false,
        }
    }
    public change_en = (e:any) => {
        e.preventDefault();
        this.setState({sentence_en:e.target.value});
        setTimeout(() => {getDictionary.translate( this.state.sentence_en)},500);
        setTimeout(() => {this.setState({sentence_pl:getDictionary.data_Pl})},800);
    }

    componentDidMount(){
        getDictionary.translate( this.state.sentence_en);
        this.setState({sentence_pl:getDictionary.data_Pl});
    }
    public generateDictionary = (words:any) =>{
        return <List>{words.split(/,|;| /g) != undefined ? words.length > 0 ?
                words.split(/,|;| /g).map((ele:any,k:number) => ele != ' ' ? <List.Item key={k}><Input name={k} type="text" defaultValue={ele}/></List.Item>:null)
             :null:null} </List>
    }
    public change_pl = (e:any) => {
        this.setState({sentence_pl:e.target.value});
        console.log(this.state.sentence_pl)
    }
    public triger = () =>{
        getDictionary.translateArray();
        this.state.getWords == false ? this.setState({getWords:true}):this.setState({getWords:false})
        setTimeout(()=>{console.log(getDictionary.array_Pl);},500)
    }
    public render(){
        return (
        <Segment>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                    <h4>Create Lesson</h4>
                    <h5>{this.state.sentence_en}</h5>
                    <h5>{this.state.sentence_pl.replace(/,/gi ,' ')}</h5>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
              
                    <Grid.Column width={8}>
                    <h4>English</h4>
                    <Input onChange={(e:any)=>this.change_en(e)} type="text" name="sentence_en" />
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <h4>Polish</h4>
                    <Input onChange={(e:any)=>this.change_pl(e)} type="text" name="sentence_pl" defaultValue={this.state.sentence_pl.replace(/,/gi ,' ')} />
                    </Grid.Column>
            
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <button onClick={()=>this.triger()}>Get Words</button>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h5>English</h5>
                        {this.state.getWords == true ? this.generateDictionary(this.state.sentence_en):null}
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h5>Polish</h5>
                        {this.state.getWords == true ? this.generateDictionary(getDictionary.array_Pl):null}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>)
    }
}