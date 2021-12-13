import api from '../api/axios'

// Set all future requests to use the token.
const setToken = () => {
    api.interceptors.request.use(
        async config => {
            const token = localStorage.getItem('token');
            config.headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                useCredentials: true
            }
            return config;
        },
        error => {
            Promise.reject(error)
        });
}

// Get new Token by API CALL.
const tokenAPICALL = async (user, pass) => {
    const { data } = await api.post(`/api/auth/login`, {
        "username": user,
        "password": pass
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })

    const now = new Date().getTime();
    const expiryDate = now + data.document.expires_in;

    localStorage.setItem('token', data.document.access_token);
    localStorage.setItem('token_exp', expiryDate);
    setToken();
    return (data.document.access_token);
}

// Check the Token stored in Cookies.
const getToken = async (setJwt, user, pass) => {
    const storedJwt = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_exp')
    if (expiration && storedJwt) {
        const now = new Date().getTime();
        if (now < expiration) {
            console.log("Keep Token");
            setJwt(await tokenAPICALL(user, pass));
        }
        else {
            // Token Expired, Get new token
            console.log("Expired Token");
            setJwt(await tokenAPICALL(user, pass));
        }
    }
    else {
        // No token recorder in session, Get new token
        console.log("No Token")
        setJwt(await tokenAPICALL(user, pass));
    }
};

export default getToken;