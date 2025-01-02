import {useEffect, useState} from "react";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const is = {
        loggedIn: !!user,
        loggedOut: !user
    };

    useEffect(() => {
        localStorage?.getItem('isLoggedIn') ? setUser(localStorage.getItem('username')) : setUser(null);
        setLoading(false);

        return () => {
            setUser(null);
            setLoading(true);
        }
    }, []);

    return { user, loading, isLoggedIn: is.loggedIn, isLoggedOut: is.loggedOut};
}

export default useAuth;