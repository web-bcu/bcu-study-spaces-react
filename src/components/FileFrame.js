import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Button from "./Button";
import CommonProgress from "./CommonProgress";
import { PulseLoader } from "react-spinners";

export default function FileFrame({ fileURL, fileName, fileId, save, className, fetchFiles, parentId }) {
    const [progress, setProgress] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [parentIdToSave, setParentIdToSave] = useState("");
    const admin = useSelector((state) => state.admin);
    const options = useSelector((state) => state.options)
    const [isDeleting, setIsDeleting] = useState(false);

    const openFile = (fileURL) => {
        window.open(fileURL);
    }

    async function saveFile(parentIdToSave) {
        try {
            const dataToPass = {
                _id: fileId,
                parentId: parentIdToSave === "Document" ? null : parentIdToSave
            }
            await axios.put("/file/update", dataToPass)
            toast.success("Save file successfully")
        } catch (error) {
            toast.error("Could not save the file!!!")
        } finally {
            fetchFiles(parentId)
        }
    }

    async function deleteFile() {
        setIsDeleting(true)
        try {
            await axios.delete(`/file/delete?fileId=${fileId}`)
            toast.success("File has been removed");
        } catch (error) {
            toast.error("Could not delete the file!!!");
        } finally {
            fetchFiles(parentId);
            setIsDeleting(false);
        }
    }

    function handleButtonSave() {
        if (options.length > 0) {
            setShowOptions(!showOptions);
            return;
        }
        saveFile(null);
    }

    if (fileURL === undefined) return;

    return (
        <div className={`w-full flex items-center hover:bg-gradient-to-r from-[#432371] to-[#faae7b] hover:bg-opacity-40 text-white px-8 py-2 rounded-md border-b border-white relative ${className}`}>
            <div onClick={() => openFile(fileURL)} className='flex gap-5 items-center w-5/6'>
                <span className='w-8 h-8 text-lg text-white'><FontAwesomeIcon icon={faFile} /></span>
                <span className="truncate w-40 md:w-full">
                        {fileName}
                    </span>
            </div>
            <div className='flex gap-4 w-1/6 justify-end'>
                {!isDeleting ? 
                    <div>
                        {admin && !save && <div className='flex gap-3'>
                            <button onClick={() => deleteFile()} className='active:scale-75 transform transition duration-300 ease-in-out'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6 text-white">
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg>
                            </button>
                        </div>}
                        {admin && save && 
                            <div className='flex gap-2 relative'>
                                <Button title={`${showOptions ? "Cancel" : "Save"}`} btnClass={`btn ${showOptions ? "btn-warning" : "btn-success"} text-white px-4 h-4`} onClick={() => handleButtonSave()} />
                                {showOptions && options?.length > 0 &&
                                    <div className="w-48 absolute top-8 right-4 z-20">
                                        <label htmlFor="folder">Folder:</label>
                                        <select id="folder" value={parentIdToSave} onChange={e => saveFile(e.target.value)} className="w-80">
                                            <option value="">Choose folder</option>
                                            <option value="Document">Document</option>
                                            {options.map(option => <option key={option._id} value={option._id}>{option.fileName}</option>)}
                                        </select>
                                    </div>
                                }
                                <Button title='Delete' btnClass='btn btn-error text-white px-2 h-4' onClick={() => deleteFile()} />
                            </div>
                        }
                    </div>
                    : <PulseLoader color="#89CFF0"/>
                }
            </div>
            {progress === 0 || progress === 100 ? <></> : <CommonProgress progress={progress} />}
        </div>
    )
}