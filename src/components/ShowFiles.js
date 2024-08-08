import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import FileFrame from "./FileFrame";
import FolderFrame from "./FolderFrame";
import { useAuth } from "../contexts/UserContext";
import { useSelector } from "react-redux";

export default function ShowFiles({parentId}) {
    const navigate = useNavigate();
    const {fetchFiles, fileList} = useAuth();

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        fetchFiles(parentId);
    }, []);

    return (
        <div className='flex flex-col gap-2'>
            {parentId !== null && 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-6 w-6 text-white" onClick={goBack}>
                    <path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"/>
                </svg>
            }
            <div className='w-full flex gap-5 items-center hover:bg-gradient-to-r from-[#432371] to-[#faae7b] hover:bg-opacity-40 text-white justify-start px-8 py-2 rounded-md border-b border-white relative'>
                <h2>Category</h2>
                <h2>Name</h2>
                <h2 className='absolute right-8'>Options</h2>
            </div>
            {fileList?.map((file) => {
                return file.isFolder ? <FolderFrame key={file._id} folderName={file.fileName} folderId={file._id} fetchFiles={fetchFiles} parentId={file.parentId}/> : <FileFrame key={file._id} fileURL={file.fileURL} fileName={file.fileName} fileId={file._id} fetchFiles={fetchFiles} parenId={file.parentId}/>
            })}
        </div>
    )
}