import { useEffect, useState } from 'react';
import Page from '../components/Page'
import { Container, Box, Stack, Typography, FormControl, TextField, Autocomplete, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import ClassApi from '../api/class';
import { PATH } from '../routes/path';
import { useParams } from 'react-router-dom';
import { Class } from '../types/user';
import { ClassType, ClassTypeOptions } from '../utils/class'

type option = {
  id: number,
  label: string,
  value: string
}

const ClassView = () => {
  const { classId = '' } = useParams();
  const [classDetails, setClassDetails] = useState<Class | null>(null);

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const [type, setType] = useState<option | null>(null);
  const [typeError, setTypeError] = useState<string>('');

  const [isEditMode, setEditMode] = useState<boolean>(false);

  const pageTitle = classDetails ? (classDetails.name).trim() : '';

  useEffect(() => {
    getClassDetails();
  }, [classId]);

  const getClassDetails = () => {
    ClassApi.getClassDetails(Number(classId)).then(response => {
      if (response.status === 200) {
        setClassDetails(response.data);
        setName(response.data.name ?? '');
        setType(response.data.type ? ClassTypeOptions.filter(item => item.value === response.data.type)[0] : null);
      }
    });
  }

  const isValidateForm = () => {
    return Boolean(name && type);
  }

  const handleSaveClass = () => {
    if (classId && isValidateForm()) {
      ClassApi.updateClassDetails(Number(classId), {
        name: name,
        type: type ? type.value : ClassType.CHILDREN_CLASS
      }).then(response => {
        if (response.status === 200) {
          getClassDetails();
          setEditMode(false);
        }
      }).catch(error => console.error(error));
    }
  }

  const handleCancle = () => {
    setEditMode(false);
    resetForm();
  }

  const resetForm = () => {
    setName(classDetails?.name ?? '');
    setType(ClassTypeOptions.filter(item => item.value === classDetails?.type)[0] ?? null);

    setNameError('');
    setTypeError('');
  }

  const handleNameChange = (value: string) => {
    if (value) {
      setName(value);
      setNameError('');
    } else {
      setName('');
      setNameError('Name field is required.');
    }
  }

  const handleTypeChange = (value: option | null) => {
    if (value) {
      setType(value);
      setTypeError('');
    } else {
      setType(null);
      setTypeError('Type field is required.');
    }
  }

  const action = (classDetails) ? (!isEditMode ? (
    <Button variant='contained' onClick={() => setEditMode(true)}>
      Edit
    </Button>
  ) : (
    <Stack direction={'row'} gap={2}>
      <Button variant='outlined' onClick={handleCancle}>
        Cancel
      </Button>
      <Button variant='contained' disabled={!isValidateForm()} onClick={handleSaveClass}>
        Edit
      </Button>
    </Stack>
  )) : <></>;

  const content = (classDetails) ? (
    <Box>
      <Stack direction={'column'}>
        <Stack direction={'row'} gap={3}>
          <Typography variant='body2'>Name: </Typography>
          <Typography variant='body1'>{classDetails.name.trim()}</Typography>
        </Stack>

        <Stack direction={'row'} gap={3}>
          <Typography variant='body2'>Type: </Typography>
          <Typography variant='body1'>{classDetails.type.trim()}</Typography>
        </Stack>

        <Stack direction={'row'} gap={3}>
          <Typography variant='body2'>Organizer: </Typography>
          <Typography variant='body1'>{classDetails.organizer ? (classDetails.organizer.first_name + ' ' + classDetails.organizer.last_name).trim() : 'Not Set'}</Typography>
        </Stack>

        <Stack direction={'column'}>
          <Typography variant='body2'>Participant</Typography>
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
                  Birth Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Boolean(classDetails.participant.length) ? classDetails.participant.map((value, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{value.id}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography>{(value.first_name + ' ' + value.last_name).trim()}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography>{new Date(value.birth_date).getDate()}</Typography>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell>
                    <Typography></Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography>No Participant</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography></Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Stack>
      </Stack>
    </Box>
  ) : <></>;

  const editContent = (classDetails) ? (
    <Box>
      <Stack direction={'column'} gap={2}>
        <FormControl>
          <TextField
            label={'Name'}
            value={name}
            onChange={(event) => handleNameChange(event.target.value ?? '')}
            placeholder='Enter your Name...'
            error={Boolean(nameError)}
            helperText={nameError}
          />
        </FormControl>

        <FormControl>
          <Autocomplete
            title={'Type'}
            options={ClassTypeOptions}
            value={type ? type : null}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => handleTypeChange(value)}
            renderInput={(props) => (
              <TextField
                {...props}
                error={Boolean(typeError)}
                helperText={typeError} />)}
          />
        </FormControl>
      </Stack>
    </Box>
  ) : <></>;

  return (
    <Page
      title={pageTitle}
      breadcrumb={[{ label: 'Dashboard', link: PATH.root }, { label: 'Classes', link: PATH.root }, { label: pageTitle }]}
      action={action}>
      <Container>
        <Box px={3}>
          <Stack direction={'column'} gap={2} width={'100%'}>
            {isEditMode ? editContent : content}
          </Stack>
        </Box>
      </Container>
    </Page>
  );
}

export default ClassView;
