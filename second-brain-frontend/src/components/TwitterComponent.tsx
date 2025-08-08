import { Card } from "./Card";
import { useContent } from "./usefetchContent"

export const TwitterComponent=()=>{

    const fetch=useContent();

    return(
        <>


    {
        fetch.filter((item)=>item.type==="twitter")
        .map(({title,type,description,link})=>{
            return <Card src={link} description={description} type={type} title={title}/>
        })
    }

        </>
    )

}
