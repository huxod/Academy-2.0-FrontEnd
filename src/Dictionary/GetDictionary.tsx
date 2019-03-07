import axios from 'axios'
class GetDictionary {    
    public data_Pl ='';
    public array_Pl:{};
    public array_En:{}[];
    private key = "trnsl.1.1.20130922T110455Z.4a9208e68c61a760.f819c1db302ba637c2bea1befa4db9f784e9fbb8";
    //Translate sentecion function
    public translate = async (textToTranslate:any) => {
          this.array_En = textToTranslate.split(' ')
         await axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+this.key+'&lang=pl&text='+textToTranslate.split(' '))
        .then((response:any) => {this.data_Pl = response.data.text[0]})
        .catch((error:any) => console.log(error));
      }
      public translates = async (textToTranslate:any) => {
        await axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+this.key+'&lang=pl&text='+textToTranslate.split(' '))
       .then((response:any) => {this.array_Pl = response.data.text[0]})
       .catch((error:any) => console.log(error));
     }
    public translateArray = async () => {
         await this.array_En.map((ele:any)=>{
            this.translates(ele);
            this.array_Pl = this.data_Pl;
            console.log(this.data_Pl)
          });
      };
    }

const getDictionary = new GetDictionary;
export default getDictionary;