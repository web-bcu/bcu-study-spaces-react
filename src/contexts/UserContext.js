import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import admin, { setAdmin } from "../redux/slices/admin";
import { toast } from "sonner";

export const UserContext = createContext({});

export function useAuth() {
    return useContext(UserContext);
}

export function UserContextProvider({ children }) {
    const [user, setUser] = useState("loading");
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [fileList, setFileList] = useState();
    const dispatch = useDispatch();
    

    // function checkAdmin(email) {
    //     if (adminList.includes(email)) {
    //         dispatch(setAdmin(true));
    //     }
    // }

    const fetchUser = async () => {
        setUser("loading")
        const storedToken = localStorage.getItem("token");
        try {
            if (!user || user === "loading") {
                const { data } = await axios.get('/user/profile', { 
                    headers: {
                        Authorization: storedToken
                    }
                })
                
                if (data.user) {
                    setUser(data.user)
                    setUserLoggedIn(true);
                } else if (data.error || data.message) {
                    setUser(null);
                }
            }
        } catch (err) {
            toast.error("Could not authenticate user");
        }
    }

    async function fetchFiles(parentId) {
        try {
            if (parentId) {
                const { data } = await axios.get(`/file/get?parentId=${parentId}`);
                setFileList(data)
            } else {
                const { data } = await axios.get(`/file/get?parentId=${null}`);
                // dispatch(setFileList(data));
                setFileList(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchAdmins() {
        try {
            const {data} = await axios.get('/admin/get')
            const adminEmail = data.filter(admin => admin.email);
            dispatch(setAdmin(adminEmail.some(admin => admin.email === user?.email)))
        } catch(error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     fetchAdmins();
    // }, [])
    // useEffect(() => {
    //     fetchAdmins();
    //     fetchUser();
    // }, [user]);

    useEffect(() => {
        if (user === "loading") {
            fetchUser();
        }
        fetchAdmins();
    }, [user]);

    const valueToPass = { user, setUser, userLoggedIn, fetchFiles, fileList, fetchUser, setUserLoggedIn, fetchAdmins}
    return (
        <UserContext.Provider value={valueToPass}>
            {children}
        </UserContext.Provider>
    )
}