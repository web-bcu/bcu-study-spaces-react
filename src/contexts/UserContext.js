import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import adminList from "../data/adminList";
import { useDispatch} from "react-redux";
import { setAdmin } from "../redux/slices/admin";
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

    function checkAdmin(email) {
        if (adminList.includes(email)) {
            dispatch(setAdmin(true));
        }
    }

    const fetchUser = async (token) => {
        try {
            if (!user || user === "loading") {
                const { data } = await axios.get('/user/profile', { 
                    headers: {
                        Authorization: token
                    }
                })
                
                if (data.user) {
                    setUser(data.user)
                    checkAdmin(data.user.email)
                    setUserLoggedIn(true);
                } else if (data.error) {
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


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        fetchUser(storedToken)
    }, [user]);

    const valueToPass = { user, setUser, userLoggedIn, fetchFiles, fileList, fetchUser, setUserLoggedIn }
    return (
        <UserContext.Provider value={valueToPass}>
            {children}
        </UserContext.Provider>
    )
}