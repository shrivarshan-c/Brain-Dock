import { Card } from "./Card";
import { useContent } from "./usefetchContent"
import { useOutletContext } from "react-router-dom";

export const NoteComponent = () => {
    const fetch = useContent();
    const { searchTerm = '' } = useOutletContext<{ searchTerm?: string }>() || {};

    return (
        <>
        {fetch.filter((item: any) => item.type === "note" && (
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        ))
        .map(({title, type, description, link}) => {
            return <Card src={link} description={description} type={type} title={title}/>
        })}
        </>
    )
}
