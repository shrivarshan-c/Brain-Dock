import { useContent } from "./usefetchContent"
import { Card } from "./Card";
import { useOutletContext } from "react-router-dom";

export const AllContents=()=>{

const con = useContent();
const { searchTerm = '' } = useOutletContext<{ searchTerm?: string }>() || {};

const filtered = con.filter((c: any) => 
  c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
  (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
  c.link.toLowerCase().includes(searchTerm.toLowerCase())
);

    return(
        <>

{
    filtered.map(({link,type,title,description}) => (
      <Card title={title} type={type} description={description} src={link} />
    ))
  }


        </>
    )
}
