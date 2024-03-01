import axios from '../utils/axios';
import { sha256 } from "js-sha256";

function UserApi() {
    return {
        login: (username: string, password: string) => (axios.get('login', {
            params: {
                username: username,
                password: sha256(password)
            }
        })),
        fetchUsers: () => (axios.get('users')),
        getUserDetails: (userId: number) => (axios.get(`users/${userId}`)),
        updateUserDetails: (userId: number, body: any) => (axios.put(`users/${userId}`, body))
    };
};

export default UserApi();