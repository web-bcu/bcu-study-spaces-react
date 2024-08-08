import { useState } from "react";
import { storage } from "../firebaseconfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import { toast } from "sonner";
import Button from "./Button";
import CommonProgress from "./CommonProgress";
import { useAuth } from "../contexts/UserContext";

export default function UploadFile({ parentId }) {
    const [isFileVisible, setFileVisible] = useState(false);
    const [isFolderVisible, setFolderVisible] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [progress, setProgress] = useState(0);
    const {fetchFiles} = useAuth();

    const fileUpload = (file, setProgress, parentId) => {
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    const newFileSchema = {
                        fileName: file.name,
                        fileURL: downloadURL,
                        isFolder: false,
                        parentId: parentId
                    }
                    await axios.post('/file/create', newFileSchema)
                    fetchFiles(parentId)
                    toast.success("File upload successfully");
                    // window.location.reload()
                })
                    .catch((error) => {
                        toast.error("Error uploading files: ", error);
                    });
            }
        )
    }

    const uploadFiles = async (ev) => {
        // let file = ev.target.files[0];
        try {
            const files = ev.target.files;
            for (const file of files) {
                fileUpload(file, setProgress, parentId);
            }
        } catch (err) {
            toast.error("Could not upload the file");
        }
    }

    const uploadFolder = async () => {
        try {
            const newFolderSchema = {
                fileName: folderName,
                isFolder: true,
                parentId: parentId
            }
            await axios.post('/file/create', newFolderSchema)
            toast.success("New folder created");
        } catch (error) {
            toast.error("Fail to create new folder")
        } finally {
            setFolderName("");
            fetchFiles(parentId);
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-5">
                <Button
                    title="Add a file"
                    btnClass="btn-primary text-white"
                    onClick={() => {
                        setFolderVisible(false);
                        setFileVisible(!isFileVisible);
                    }}
                />
                {isFileVisible && <input type="file"  multiple className="file-input w-full max-w-xs text-black" onChange={(event) => uploadFiles(event)} />}
                <Button
                    title="Create a folder"
                    btnClass="btn-primary text-white"
                    onClick={() => {
                        setFileVisible(false);
                        setFolderVisible(!isFolderVisible);
                    }}
                />
                {isFolderVisible ? (
                    <>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs text-black" onChange={(event) => setFolderName(event.target.value)} value={folderName} />
                        <Button title='Create a folder' btnClass='btn-primary text-white' onClick={uploadFolder} />
                    </>
                ) : (
                    <></>
                )}
            </div>
            {progress === 0 || progress === 100 ? <></> : <CommonProgress progress={progress} />}
        </div>
    )
}