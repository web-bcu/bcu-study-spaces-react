import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../contexts/UserContext";
import { PulseLoader } from "react-spinners";

export default function FolderFrame({folderId, folderName, parentId}) {
    const [newName, setNewName] = useState("");
    const [edit, setEdit] = useState(false);
    const {fetchFiles} = useAuth();
    const admin = useSelector((state) => state.admin);
    const [isDeleting, setIsDeleting] = useState(false);

    async function updateFolderName() {
        try {
            const payload = {
                _id: folderId,
                name: newName,
            }
            await axios.put('/file/update', payload)
        } catch (error) {
            toast.error("Could not change the folder name");
        } finally {
            window.location.reload();
            // setToggle(!toggle);
            // fetchFiles(parentId)
        }
    }

    function nextFolder() {
        // setToggle(!toggle);
        window.location = `/document/${folderId}`
    }

    async function deleteFolder(folderId) {
        setIsDeleting(true)
        try {
            const {data} = await axios.get(`/file/get?parentId=${folderId}`);
            console.log(data)
            data.forEach(async(file) => {
                if (file.isFolder) {
                    deleteFolder(file._id)
                } 
                await axios.delete(`/file/delete?fileId=${file._id}`)
            })
            await axios.delete(`/file/delete?fileId=${folderId}`)
            toast.success("Folder deleted!!!")
        } catch(err) {
            toast.error("Could not delete the folder");
        } finally {
            fetchFiles(parentId);
            setIsDeleting(false);
        }
    }

    return (
        <div className='w-full flex items-center hover:bg-gradient-to-r from-[#432371] to-[#faae7b] hover:bg-opacity-40 text-white justify-start px-8 py-2 rounded-md border-b border-white'>
            <button className='flex gap-5 items-center w-5/6' onClick={() => nextFolder()} disabled={edit}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-yellow-400"><path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z">
                    </path>
                </svg>
                {edit 
                    ? <input type='text' value={newName} onChange={e => setNewName(e.target.value)} className='h-8 p-2 outline-none rounded-sm text-black'/>
                    : <span className="truncate w-40 md:w-full flex justify-start items-start">
                        {folderName}
                    </span>
                }
            </button>
            <div className={`flex w-1/6 justify-end gap-4 ${admin ? "" : "hidden"}`}>
                {!isDeleting ? (
                    <div className="flex gap-4">
                        {edit 
                            ? (<div className='flex gap-2'>
                                <Button title='Save' btnClass='btn btn-success text-white px-4 h-4' onClick={updateFolderName}/>
                                <Button title='Cancel' btnClass='btn btn-error text-white px-2 h-4' onClick={() => setEdit(false)}/>
                            </div>) 
                            : (<button onClick={() => setEdit(true)} disabled={isDeleting}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6 text-slate-50">
                                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                                </svg>
                            </button>)
                        }
                        <button onClick={() => deleteFolder(folderId)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6 text-slate-50">
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                            </svg>
                        </button>
                    </div>
                )
                : <PulseLoader color="#89CFF0"/>}
            </div>
        </div>
    )
}