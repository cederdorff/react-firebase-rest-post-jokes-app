import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function UpdatePage() {
    const [post, setPost] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const url = `https://race-rest-default-rtdb.firebaseio.com/posts/${params.postId}.json`;

    useEffect(() => {
        async function getPost() {
            const response = await fetch(url);
            const data = await response.json();
            setPost(data);
        }

        getPost();
    }, [url]);

    async function savePost(postToUpdate) {
        postToUpdate.uid = post.uid;
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(postToUpdate)
        });
        const data = await response.json();
        console.log(data);
        navigate("/");
    }

    async function deletePost() {
        const confirmDelete = window.confirm(`Do you want to delete post, ${post.title}?`);
        if (confirmDelete) {
            const response = await fetch(url, {
                method: "DELETE"
            });
            const data = await response.json();
            console.log(data);
            navigate("/");
        }
    }

    return (
        <section className="page">
            <h1>Update Post</h1>
            <PostForm post={post} savePost={savePost} />
            <button className="btn-delete" onClick={deletePost}>
                Delete Post
            </button>
        </section>
    );
}
