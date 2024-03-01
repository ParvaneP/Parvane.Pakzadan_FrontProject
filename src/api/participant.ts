import axios from '../utils/axios';

function ParticipantApi() {
    return {
        fetchParticipants: () => (axios.get('participants')),
        getParticipantDetails: (participantId: number) => (axios.get(`participants/${participantId}`)),
        updateParticipantDetails: (participantId: number, body: any) => (axios.put(`participants/${participantId}`, body))
    };
};

export default ParticipantApi();