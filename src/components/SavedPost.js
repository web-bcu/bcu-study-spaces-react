import { useEffect, useState } from "react";
import { useAuth } from "../contexts/UserContext"
import PostCard from "./PostCard";
import axios from "axios";
import { toast } from "sonner";

export default function SavedPost() {
    const {user} = useAuth();
    const [userSavedPosts, setUserSavedPosts] = useState([]);

    async function fetchSavedPosts() {
        if (!user?.id) return;

        try {
            const { data: savedPosts } = await axios.get(`/save/getpost?userId=${user.id}`);
            
            const posts = await Promise.all(savedPosts.map(async (save) => {
                try {
                    const { data: post } = await axios.get(`/post/getone?postId=${save.postId}`);
                    return post;
                } catch (error) {
                    console.error(`Failed to fetch post with ID ${save.postId}`, error);
                    return null;
                }
            }));

            setUserSavedPosts(posts.filter(post => post !== null)); 
        } catch (error) {
            console.error("Could not get saved posts", error);
            toast.error("Could not get saved posts");
        }
    }

    useEffect(() => {
        fetchSavedPosts()
    }, [user]);

    return (
        <div className="flex flex-col gap-3 rounded-lg">
            {userSavedPosts?.map(post => (
                <PostCard key={post._id} post={post} onPost={() => fetchSavedPosts()}/>
            ))}
        </div>
    )
}