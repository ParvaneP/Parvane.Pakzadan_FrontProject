import { useEffect, useState } from 'react';
import Page from '../components/Page'
import { Container, Box, Stack, Typography, FormControl, TextField, Button } from '@mui/material';
import { PATH } from '../routes/path';
import { useParams } from 'react-router-dom';
import { Participant } from '../types/user';
import ParticipantApi from '../api/participant';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ParticipantView = () => {
  const { participantId = '' } = useParams();
  const [participant, setParticipant] = useState<Participant | null>(null);

  const [firstName, setFirstName] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthDateError, setBirthDateError] = useState<string>('');

  const [isEditMode, setEditMode] = useState<boolean>(false);

  const pageTitle = participant ? (`${participant.first_name} ${participant.last_name}`).trim() : '';

  useEffect(() => {
    getParticipantDetails();
  }, [participantId]);

  const getParticipantDetails = async () => {
    await ParticipantApi.getParticipantDetails(Number(participantId)).then(response => {
      if (response.status === 200) {
        setParticipant(response.data);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setBirthDate(new Date(response.data.birth_date));
      }
    }).catch(error => console.log(error));
  }

  const isValidateForm = () => {
    return Boolean(firstName && lastName && birthDate);
  }

  const handleSaveClass = () => {
    if (participantId && isValidateForm()) {
      ParticipantApi.updateParticipantDetails(Number(participantId), {
        first_name: firstName,
        last_name: lastName,
        birth_date:  new Date(participant?.birth_date ?? '')
      }).then(response => {
        if (response.status === 200) {
          getParticipantDetails();
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
    setFirstName(participant?.first_name ?? '');
    setLastName(participant?.last_name ?? '');
    setBirthDate(participant?.birth_date ? new Date(participant.birth_date) : null);

    setFirstNameError('');
    setLastNameError('');
    setBirthDateError('');
  }

  const handleFirstNameChange = (value: string) => {
    if (value) {
      setFirstName(value);
      setFirstNameError('')
    } else {
      setFirstName('');
      setFirstNameError('First Name field is required.')
    }
  }

  const handleLastNameChange = (value: string) => {
    if (value) {
      setLastName(value);
      setLastNameError('')
    } else {
      setLastName('');
      setLastNameError('Last Name field is required.')
    }
  }

  const handleBirthDateChange = (value: Date | null) => {
    if (value) {
      setBirthDate(value);
      setBirthDateError('');
    } else {
      setBirthDate(null);
      setBirthDateError('Birth Date field is required.');
    }
  }

  const action = (participant) ? (!isEditMode ? (
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

  const content = participant ? (
    <Stack direction={'column'} gap={2} width={'100%'}>
      <Stack direction={'row'} gap={2}>
        <Typography variant='body2'>Full Name: </Typography>
        <Typography variant='body1'>{pageTitle}</Typography>
      </Stack>

      <Stack direction={'row'} gap={2}>
        <Typography variant='body2'>Birth Date: </Typography>
        <Typography variant='body1'>{format(new Date(participant.birth_date), 'yyyy MM dd')}</Typography>
      </Stack>
    </Stack>
  ) : <></>;

  const editContent = participant ? (
    <Stack direction={'column'} gap={2} width={'100%'}>
      <FormControl>
        <TextField
          label={'First Name'}
          value={firstName}
          onChange={(event) => handleFirstNameChange(event.target.value ?? '')}
          placeholder='Enter your First Name...'
          error={Boolean(firstNameError)}
          helperText={firstNameError}
        />
      </FormControl>

      <FormControl>
        <TextField
          label={'Last Name'}
          value={lastName}
          onChange={(event) => handleLastNameChange(event.target.value ?? '')}
          placeholder='Enter your Last Name...'
          error={Boolean(lastNameError)}
          helperText={lastNameError}
        />
      </FormControl>

      {/* <FormControl>
        <DatePicker
          label={'Birth Date'}
          value={birthDate}
          defaultValue={birthDate}
          onChange={(value) => handleBirthDateChange(value)}
          referenceDate={new Date()}
          slotProps={{
            textField: {
              error: Boolean(birthDateError),
              helperText: birthDateError
            }
          }}
        />
      </FormControl> */}
    </Stack>
  ) : <></>;

  return (
    <Page
      title={pageTitle}
      breadcrumb={[{ label: 'Dashboard', link: PATH.root }, { label: 'Participant', link: PATH.root }, { label: pageTitle }]}
      action={action}>
      <Container>
        <Box px={3}>
          {isEditMode ? editContent : content}
        </Box>
      </Container>
    </Page>
  );
}

export default ParticipantView;
