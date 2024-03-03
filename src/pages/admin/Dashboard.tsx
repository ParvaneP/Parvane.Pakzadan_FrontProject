import { useEffect, useState } from 'react';
import Page from '../../components/Page'
import { Container, Box, Stack } from '@mui/material';
import ClassApi from '../../api/class';
import UserApi from '../../api/user';
import ParticipantApi from '../../api/participant';
import ClassCard from '../../sections/admin/dashboard/ClassCard';
import UserCard from '../../sections/admin/dashboard/UserCard';
import ParticipantCard from '../../sections/admin/dashboard/ParticipantCard';
import { Class, Participant, User } from '../../types/user'

const Dashboard = () => {
  const userRole = window.localStorage.getItem("role");
  const username = window.localStorage.getItem("username");
  const [users, setUsers] = useState<Array<User>>([]);
  const [classes, setClasses] = useState<Array<Class>>([]);
  const [participants, setParticipants] = useState<Array<Participant>>([]);

  useEffect(() => {
    if (userRole === 'Admin') {
      UserApi.fetchUsers().then(response => {
        if (response.status === 200) {
          setUsers(response.data)
        }
      });
      ClassApi.fetchClasses().then(response => {
        if (response.status === 200) {
          setClasses(response.data);
        }
      });
      ParticipantApi.fetchParticipants().then(response => {
        if (response.status === 200) {
          setParticipants(response.data)
        }
      });
    } else if (username) {
      ClassApi.fetchUserClasses(username).then(response => {
        if (response.status === 200) {
          setClasses(response.data);
        }
      });
    }
  }, [])

  return (
    <Page title={'Dashboard'}>
       <Container>
        <Box>
          <Stack direction={'column'} gap={2} width={'100%'}>
            {userRole === 'Admin' && <UserCard users={users} />}
            <ClassCard classes={classes} />
            {userRole === 'Admin' && <ParticipantCard participants={participants} />}
          </Stack>
        </Box>
       </Container>
    </Page>
  );
}
  
export default Dashboard;
