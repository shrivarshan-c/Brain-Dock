
export const generate=(len:number)=>{

    const random="wertyufghjklkjhgertyuiucvblkjhgdfgdhfb73482p";
    const length= random.length;

     let ans="";
    for(let i=0;i<len;i++)
    {
     ans+=random[Math.floor(Math.random()*length)]
    }
    return ans;

}
