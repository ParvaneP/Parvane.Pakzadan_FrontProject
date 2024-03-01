import { useNavigate } from 'react-router-dom';
import { Typography, Table, TableBody, TableRow, TableCell, Card, CardHeader, CardContent, TableHead } from '@mui/material';
import { PATH } from '../../../routes/path';

const UserCard = ({ users }: {users: Array<any>}) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`${PATH.users.user}/${id}`);
  }

  return (
    <Card>
      <CardHeader title={'Users'}/>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                ID
              </TableCell>
              <TableCell>
                Full Name
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell>
                Phone
              </TableCell>
              <TableCell>
                Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((value, index) => (
              <TableRow key={index} onClick={() => handleRowClick(value.id)}>
                <TableCell>
                  <Typography>{value.id}</Typography>
                </TableCell>

                <TableCell>
                  <Typography>{(value.first_name + ' ' + value.last_name).trim()}</Typography>
                </TableCell>

                <TableCell>
                  <Typography>{value.email}</Typography>
                </TableCell>

                
                <TableCell>
                  <Typography>{value.phone}</Typography>
                </TableCell>

                
                <TableCell>
                  <Typography>{value.role}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
  
export default UserCard;
