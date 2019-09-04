import React, { useState } from "react";
import Blog from "./Blog";

const BlogList = props => {
  console.log("props", props);
  const [blogPosts, setBlogPosts] = useState([]);

  return (
    <>
      {blogPosts.map(post => (
        <Blog key={props.id} data={props.data} />
      ))}
    </>
  );
};

export default BlogList;
