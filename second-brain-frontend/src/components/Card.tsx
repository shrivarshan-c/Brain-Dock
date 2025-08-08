import "./Card.css"; // Import the custom styles
import {Tweet} from 'react-tweet';


interface CardItems{
    src:string
    title:string,
    type:string,
    description:string
}

const embedUrl=(url:string):string=>{
    if (url.includes("watch?v=")) {
        return url.replace("watch?v=", "embed/");
      } else if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      } else {
        return url;
      }


}
const extractTweetId = (url: string): string => {
    const parts = url.split("/");
    const id = parts.find(part => /^\d+$/.test(part));
    return id || "";
  };

export const Card = (props:CardItems) => {
    let result;

if(props.type=="youtube")
{
    result =embedUrl(props.src);

}


  return (

    <div>



    <div className="px-4  w-full">
    <div className="card w-full bg-white rounded-lg shadow-md p-4 flex flex-col overflow-hidden">

        <div className="flex justify-center font-semibold pt-4">
          <h1 className="text-2xl">{props.title}</h1>
        </div>

        <div className="flex justify-center p-4 dark">
      { props.type==="youtube" && <iframe
            width="400"
            height="240"
            src={result}

            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;    web-share settings"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>}

{props.type === "twitter" && (
  <div className="flex justify-center p-4">
    <Tweet id={extractTweetId(props.src)} />
  </div>
)}
{props.type === "document" && props.src.includes("docs.google.com") && (
    <div>

  <iframe src={props.src.replace("/edit", "/preview")} width="100%" height="500px" />
  <a  className="text-red-800 mt-4" href={props.src}>Docs Link</a>
  </div>
)}
{props.type === "document" && props.src.includes("notion") && (
  <a  className="text-red-800" href={props.src}>Notion link</a>
)}
{props.type === "leetcode" && (
  <a
    className="text-blue-600 underline font-medium"
    href={props.src}
    target="_blank"
    rel="noopener noreferrer"
  >
    View LeetCode Discussion
  </a>
)}


    </div>


        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.type}</div>
          <p className="text-gray-700 text-base">
          {props.description}</p>
        </div>


        <div className="px-6 py-4">
          <span className="tag">#photography</span>
          <span className="tag">#travel</span>
          <span className="tag">#winter</span>
        </div>
      </div>
    </div>
    </div>
  );
};
