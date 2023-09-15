import React, { useState, useEffect } from "react";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from your server
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:4000/post");
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    throw new Error("Failed to fetch posts");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
