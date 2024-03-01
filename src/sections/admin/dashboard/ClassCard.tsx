import { useNavigate } from 'react-router-dom';
import { Typography, Table, TableBody, TableRow, TableCell, Card, CardHeader, CardContent, TableHead } from '@mui/material';
import { PATH } from '../../../routes/path';

const ClassCard = ({ classes }: {classes: Array<any>}) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`${PATH.classes.class}/${id}`);
  }

  return (
    <Card>
      <CardHeader title={'Classes'}/>
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
                Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((value, index) => (
              <TableRow key={index} onClick={() => handleRowClick(value.id)}>
                <TableCell>
                  <Typography>{value.id}</Typography>
                </TableCell>

                <TableCell>
                  <Typography>{value.name}</Typography>
                </TableCell>

                <TableCell>
                  <Typography>{value.type}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
  
export default ClassCard;
