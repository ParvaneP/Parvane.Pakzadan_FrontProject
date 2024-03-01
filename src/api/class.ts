import axios from '../utils/axios';

function ClassApi() {
    return {
        fetchClasses: () => (axios.get('classes')),
        fetchUserClasses: (username: string) => (axios.get('classes', {
            params: {
                username: username,
            }
        })),
        getClassDetails: (classId: number) => (axios.get(`classes/${classId}`)),
        updateClassDetails: (classId: number, body: any) => (axios.put(`classes/${classId}`, body))
    };
};

export default ClassApi();