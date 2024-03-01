import { useEffect, useState } from 'react';
import Page from '../components/Page'
import { Container, Box, Stack, Typography, FormControl, TextField, Autocomplete, Button } from '@mui/material';
import UserApi from '../api/user';
import { PATH } from '../routes/path';
import { useParams } from 'react-router-dom';
import { User } from '../types/user';
import { UserRole, UserRoleOptions } from '../utils/user'

type option = {
  id: number,
  label: string,
  value: string
}

const UserView = () => {
  const { userId = '' } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const [phone, setPhone] = useState<string>('');

  const [firstName, setFirstName] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<string>('');

  const [lastName, setLastName] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');

  const [role, setRole] = useState<option | null>(null);
  const [roleError, setRoleError] = useState<string>('');

  const [isEditMode, setEditMode] = useState<boolean>(false);

  const pageTitle = user ? (user.first_name + ' ' + user.last_name).trim() : '';

  useEffect(() => {
    getUserDetails();
  }, [userId]);

  const getUserDetails = () => {
    UserApi.getUserDetails(Number(userId)).then(response => {
      if (response.status === 200) {
        setUser(response.data);
        setEmail(response.data.email ?? '');
        setPhone(response.data.phone ?? '');
        setFirstName(response.data.first_name ?? '');
        setLastName(response.data.last_name ?? '');
        setRole(response.data.role ? UserRoleOptions.filter(item => item.value === response.data.role)[0] : null);
      }
    });
  }

  const isValidateForm = () => {
    return Boolean(email && firstName && lastName && role);
  }

  const handleSaveUser = () => {
    if (userId && isValidateForm()) {
      UserApi.updateUserDetails(Number(userId), {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        role: role ? role.value : UserRole.TUTOR
      }).then(response => {
        if (response.status === 200) {
          getUserDetails();
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
    setEmail(user?.email ?? '');
    setPhone(user?.phone ?? '');
    setFirstName(user?.first_name ?? '');
    setLastName(user?.last_name ?? '');
    setRole(UserRoleOptions.filter(item => item.value === user?.role)[0] ?? null);

    setEmailError('');
    setFirstNameError('');
    setLastNameError('');
    setRoleError('');
  }

  const handleFirstNameChange = (value: string) => {
    if (value) {
      setFirstName(value);
      setFirstNameError('');
    } else {
      setFirstName('');
      setFirstNameError('First Name field is required.');
    }
  }

  const handleLastNameChange = (value: string) => {
    if (value) {
      setLastName(value);
      setLastNameError('');
    } else {
      setLastName('');
      setLastNameError('Last Name field is required.');
    }
  }

  const handleEmailChange = (value: string) => {
    if (value) {
      setEmail(value);
      setEmailError('');
    } else {
      setEmail('');
      setEmailError('Email field is required.');
    }
  }

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  }

  const handleRoleChange = (value: option | null) => {
    if (value) {
      setRole(value);
      setRoleError('');
    } else {
      setRole(null);
      setRoleError('Phone field is required.');
    }
  }

  const action = (user) ? (!isEditMode ? (
    <Button variant='contained' onClick={() => setEditMode(true)}>
      Edit
    </Button>
  ) : (
    <Stack direction={'row'} gap={2}>
      <Button variant='outlined' onClick={handleCancle}>
        Cancel
      </Button>
      <Button variant='contained' disabled={!isValidateForm()} onClick={handleSaveUser}>
        Edit
      </Button>
    </Stack>
  )) : <></>;

  const content = (user) ? (
    <Box>
      <Stack direction={'column'}>
        <Stack direction={'row'} gap={3}>
          <Typography variant='body2'>Full Name: </Typography>
          <Typography variant='body1'>{(user.first_name + ' ' + user.last_name).trim()}</Typography>
        </Stack>

        <Stack direction={'row'} gap={3}>
          <Typography variant='body2'>Email: </Typography>
          <Typography variant='body1'>{user.email.trim()}</Typography>
        </Stack>

        <Stack direction={'row'} gap={3}>
          <Typography variant='body2'>Phone: </Typography>
          <Typography variant='body1'>{user.phone ? user.phone.trim() : 'Not Set'}</Typography>
        </Stack>

        <Stack direction={'row'} gap={3}>
          <Typography variant='body2'>Role: </Typography>
          <Typography variant='body1'>{user.role.trim()}</Typography>
        </Stack>
      </Stack>
    </Box>
  ) : <></>;

  const editContent = (user) ? (
    <Box>
      <Stack direction={'column'} gap={2}>
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

        <FormControl>
          <TextField
            label={'Email'}
            value={email}
            onChange={(event) => handleEmailChange(event.target.value ?? '')}
            placeholder='Enter your email address...'
            error={Boolean(emailError)}
            helperText={emailError}
          />
        </FormControl>

        <FormControl>
          <TextField
            label={'Phone'}
            value={phone}
            onChange={(event) => handlePhoneChange(event.target.value ?? '')}
            placeholder='Enter your phone...'
          />
        </FormControl>

        <FormControl>
          <Autocomplete
            title={'Role'}
            options={UserRoleOptions}
            value={role ? role : null}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => handleRoleChange(value)}
            renderInput={(props) => (
              <TextField
                {...props}
                error={Boolean(roleError)}
                helperText={roleError} />)}
          />
        </FormControl>
      </Stack>
    </Box>
  ) : <></>;


  return (
    <Page
      title={pageTitle}
      breadcrumb={[{ label: 'Dashboard', link: PATH.root }, { label: 'Users', link: PATH.root }, { label: pageTitle }]}
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

export default UserView;
