import { useEffect, useState } from "react";
import PostFormCard from "../PostFormCard";
import { toast } from "sonner";
import axios, { all } from "axios";
import PostCard from "../PostCard";
import { useDispatch } from "react-redux";
import { setOptions } from "../../redux/slices/options";


export default function Forum() {
    const [allPosts, setAllPosts] = useState([]);
    const dispatch = useDispatch();

    async function fetchPosts () {
        try {
            const {data} = await axios.get("/post/getall");
            setAllPosts(data);
        } catch (error) {
            toast.error("Cannot get all posts");
        }
    }

    async function fetchFolder() {
        try {
            const {data} = await axios.get("/file/folder");
            dispatch(setOptions(data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts();
        fetchFolder();
    }, [])

    return (
        <div>
            <PostFormCard onPost={fetchPosts}/>
            <div className="h-screen flex flex-col gap-3 overflow-y-auto rounded-lg">
                {allPosts?.map(post => (
                    <PostCard key={post._id} post={post} onPost={fetchPosts}/>
                ))}
                <p className="mb-60"></p>
            </div>
        </div>
    )
}