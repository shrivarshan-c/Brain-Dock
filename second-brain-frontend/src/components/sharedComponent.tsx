import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card } from "./Card";
import axios from "axios";
interface ContentItem {
  title: string;
  description: string;
  type: string;
  link: string;
}

export const SharedComponent = () => {
  const { shareLink } = useParams<{ shareLink: string }>();

  const [username, setUsername] = useState<string>("");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [error, setError] = useState<string>("");

  const BACKED_URL= import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${BACKED_URL}/api/v1/brain/${shareLink}`);

        if (res.data.findUser && res.data.findContent) {
          setContent(res.data.findContent);
          setUsername(res.data.findUser.username);
        } else {
          setError("Share link may be wrong");
        }
      } catch (e) {
        console.error(e);
        setError("Something went wrong");
      }
    }

    fetchData();
  }, [shareLink]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (content.length === 0) {
    return <p>Loading shared content...</p>;
  }

  return (
    <div>
      <h2>shared by username: {username}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-6 px-4">


      {content.map(({ title, description, type, link }, idx) => (
        <Card key={idx} title={title} type={type} description={description} src={link} />
      ))}
    </div>
    </div>
  );
};
