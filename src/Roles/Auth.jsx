import axios from 'axios';
import { Cookies } from 'react-cookie';

const Auth = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    const cookies = new Cookies();
    const token = cookies.get('token');
    axios.defaults.withCredentials = true;

    if (token) {
        try {
            const response = await axios.get(`${api_key}/tokenRequest`,{timeout:50000});
            if (response.data.status === 'token') {
                const { UserId, RoleId, Email } = response.data;
                return { UserId, RoleId, Email };
            }
        } catch (error) {
            console.log(error);
        }
    } else {        
        return {RoleId:null,Email:null,UserId:null}; // Return null or any appropriate value for the NormalUser case.
    }
};

export default Auth;
