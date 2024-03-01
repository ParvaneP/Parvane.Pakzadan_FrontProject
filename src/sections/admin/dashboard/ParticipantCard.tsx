import { useNavigate } from 'react-router-dom';
import { Typography, Table, TableBody, TableRow, TableCell, Card, CardHeader, CardContent, TableHead } from '@mui/material';
import { PATH } from '../../../routes/path';
import { Participant } from '../../../types/user';
import { format } from 'date-fns';

const ParticipantCard = ({ participants }: {participants: Array<Participant>}) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`${PATH.participants.participant}/${id}`);
  }

  return (
    <Card>
      <CardHeader title={'Participants'}/>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                ID
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Birth Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((value, index) => (
              <TableRow key={index} onClick={() => handleRowClick(value.id)}>
                <TableCell>
                  <Typography>{value.id}</Typography>
                </TableCell>

                <TableCell>
                  <Typography>{(value.first_name + ' ' + value.last_name).trim()}</Typography>
                </TableCell>

                <TableCell>
                  <Typography>{format(new Date(value.birth_date), 'yyyy MM dd')}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
  
export default ParticipantCard;
