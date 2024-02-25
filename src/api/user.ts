import axios from '../utils/axios';
import { sha256 } from "js-sha256";

function UserApi() {
    return {
        login: (username: string, password: string) => (axios.get('login', {
            params: {
                username: username,
                password: sha256(password)
            }
        }))
    };
};

export default UserApi();