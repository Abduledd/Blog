import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(posts => {
        console.log('Posts received:', posts);
        setPosts(posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);


  // <div>

  // </div>
  return (
    <div className="pt-10">
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </div>
  );
}




// import React from "react";
// import PostList from "./PostList";

// const IndexPage = () => {
//   return (
//     <div>
//       <h1>Welcome to the Blog</h1>
//       <PostList />
//     </div>
//   );
// };

// export default IndexPage;




