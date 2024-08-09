import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../contexts/UserContext";
import { storage } from "../firebaseconfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import { toast } from "sonner";
import { faFile, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import { PulseLoader } from "react-spinners";

export default function PostFormCard({ onPost }) {
    const { user } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [content, setContent] = useState("");
    const [fileList, setFileList] = useState([]);

    async function uploadPhoto(file) {
        const storageRef = ref(storage, `${user.email}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setIsUploading(true);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error)
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const newImageSchema = {
                        fileName: file.name,
                        fileURL: downloadURL,
                        isFolder: false,
                    }
                    setFileList((prev) => [...prev, newImageSchema])
                    setIsUploading(false);
                } catch (error) {
                    console.error('Error getting download URL', error);
                }
            }
        )
    }

    const handleImageUpload = (ev) => {
        // ev.preventDefault();
        const files = ev.target.files;
        for (const file of files) {
            uploadPhoto(file);
        }
    }

    async function createPost(e) {
        e.preventDefault();
        try {
            setIsCreating(true);
            const userId = user?._id;
            const postData = {
                userId: user?.id,
                content: content,
            }
            const {data} = await axios.post("/post/create", postData);
            const {_id} = data;
            for (let i = 0; i < fileList.length; i++) {
                const fileData = {...fileList[i], parentId: _id}
                await axios.post("/file/create", fileData);
            }
        } catch (error) {
            console.log(error);
            toast.error("Could not share your post");
        } finally {
            setIsCreating(false);
            setContent("");
            setFileList([]);
            onPost();
        }
    }

    return (
        <Card>
            <div className="flex gap-2">
                <div>
                    <img 
                    src={user?.avatar} 
                    alt="avatar" width={60} height={60} />
                </div>
                <textarea value={content} onChange={e => setContent(e.target.value)} className="grow p-3 h-14 bg-[#192938] border border-slate-50 text-white" placeholder={`Have something to share ${user?.name}?`} />
            </div>
            {(isCreating || isUploading) && <PulseLoader speedMultiplier={2} color={'#348DFA'} />}
            {fileList?.length > 0 && (
                <div className="mt-2 flex gap-2 flex-col">
                    {fileList.map((file, index) => (
                        <div className="px-4 flex gap-2 items-center" key={index}>
                            <span className="text-white"><FontAwesomeIcon icon={faPaperclip} /></span>
                            {file.fileName}
                        </div>
                    ))}
                </div>
            )}
            <div className="flex gap-5 items-center mt-2">
                <div>
                    <label className="flex gap-1">
                        <input type="file" className="hidden" multiple onChange={handleImageUpload} />
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg> */}
                        <FontAwesomeIcon icon={faFile}/>
                        <span className="hidden md:block">Files</span>
                    </label>
                </div>
                <div className="grow text-right">
                    <button onClick={createPost} disabled={content === "" || isUploading} className="bg-gradient-to-r from-[#432371] to-[#faae7b] text-white active:scale-75 transform transition duration-300 ease-in-out px-6 py-1 rounded-md">Share</button>
                    {/* <button onClick={() => dispatch(setShowPostForm())} disabled={fileList.length > 0} className="bg-gradient-to-r from-[#432371] to-[#faae7b] text-white active:scale-75 transform transition duration-300 ease-in-out px-6 py-1 mx-4 rounded-md">Close the form</button> */}
                </div>
            </div>
        </Card>
    )
}