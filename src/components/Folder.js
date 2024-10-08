import { useSelector } from "react-redux"
import UploadFile from "./UploadFiles";
import ShowFiles from "./ShowFiles";
import { useParams } from "react-router-dom";

export default function Folder() {
    const admin = useSelector((state) => state.admin);
    const {id} = useParams();
    console.log(id);
    if (!id) return;
    
    return (
        <div>
            {admin && <UploadFile parentId={id}/>}
            <div className="w-full mt-10">
                <ShowFiles parentId={id}/>
            </div>
        </div>
    )
}