import { Card } from "./Card";
import { useContent } from "./usefetchContent"

export const YoutubeComponent=()=>{

    const fetch=useContent();

    return(
        <>
        
    {
        fetch.filter((item)=>item.type==="youtube")
        .map(({title,type,description,link})=>{
            return <Card src={link} description={description} type={type} title={title}/>
        })
    }


        </>
    )

}
