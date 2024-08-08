import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import adminList from "../data/adminList";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../redux/slices/admin";
import { setFileList } from "../redux/slices/fileList";

export const UserContext = createContext({});

export function useAuth() {
    return useContext(UserContext);
}

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [fileList, setFileList] = useState();
    const dispatch = useDispatch();

    function checkAdmin(email) {
        if (adminList.includes(email)) {
            dispatch(setAdmin(true));
        }
    }

    async function fetchFiles (parentId) {
        try {
            if (parentId) {
                const {data} = await axios.get(`/file/get?parentId=${parentId}`);
                // dispatch(setFileList(data))
                setFileList(data)
            } else {
                const {data} = await axios.get(`/file/get?parentId=${null}`);
                // dispatch(setFileList(data));
                setFileList(data)
            }
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user) {
            axios.get('/user/profile').then(({data}) => {
                if (data.error) {
                    console.log(data.error)
                }
                else if (data.user) {
                    setUser(data.user)
                    checkAdmin(data.user.email)
                    setUserLoggedIn(true);
                }
            }).catch((err) => console.log(err))
        }
    }, [user]);

    const valueToPass = {user, setUser, userLoggedIn, fetchFiles, fileList}
    return (
        <UserContext.Provider value={valueToPass}>
            {children}
        </UserContext.Provider>
    )
}