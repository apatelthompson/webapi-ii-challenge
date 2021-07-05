import React from "react";

const Blog = props => {
  console.log("props", props);
  return (
    <>
      <h1>This is my Blog</h1>
      <h2>{props.data.title}</h2>
      <p>{props.data.contents}</p>
    </>
  );
};

export default Blog;
