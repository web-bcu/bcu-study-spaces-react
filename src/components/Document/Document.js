import { useSelector } from "react-redux"
import UploadFile from "../UploadFiles";
import ShowFiles from "../ShowFiles";

export default function Document() {
    const admin = useSelector((state) => state.admin);

    return (
        <div>
            {admin && <UploadFile parentId={null}/>}
            <div className="w-full mt-10">
                <ShowFiles parentId={null}/>
            </div>
        </div>
    )
}