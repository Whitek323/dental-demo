import { act } from "react";

class UserExample {
    user_id:number =1;
    fname_th: string = "กิตติกร";
    lname_th: string = "อุณหกานต์";
    theme: string = "ninja";
}
class TrnBrushing{
    public user_id:number;
    public time:number;
    public accurate:number;
    
    constructor(user_id:number,time:number,accurate:number){
        this.user_id = user_id
        this.time = time
        this.accurate = accurate
    }
}
const r1 = new TrnBrushing(1,120,100)
const r2 = new TrnBrushing(1,60,100)
const user_example = new UserExample()
export default user_example;