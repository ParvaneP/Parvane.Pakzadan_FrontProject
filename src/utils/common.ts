export const isUserAuthenticated = () => {
    const username = window.localStorage.getItem('username');
    const passowrd = window.localStorage.getItem('password');
    const role = window.localStorage.getItem('role');

    return (username !== null && username !== undefined) &&  
        (passowrd !== null && passowrd !== undefined) &&  
            (role !== null && role !== undefined);
}