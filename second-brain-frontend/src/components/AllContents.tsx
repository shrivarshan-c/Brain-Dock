import { useContent } from "./usefetchContent"
import { Card } from "./Card";

export const AllContents=()=>{

const con = useContent();
    return(
        <>

{
    con.map(({link,type,title,description}) => (
      <Card title={title} type={type} description={description} src={link} />
    ))
  }


        </>
    )
}
