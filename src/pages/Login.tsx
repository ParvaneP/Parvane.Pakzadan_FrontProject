import '../App.css'
import { Stack, Button, Box, FormControl, Paper, TextField } from '@mui/material'
import UserApi from '../api/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../routes/path';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const isFromValid = Boolean(username && !usernameError) && Boolean(password && !passwordError);

  const handleLogin = async () => {
    await UserApi.login(username, password).then(response => {
      if(response.status === 200) {
        window.localStorage.setItem('username', response.data.email);
        window.localStorage.setItem('password', response.data.password);
        window.localStorage.setItem('role', response.data.role);
        navigate(PATH.root);
      }
    }).catch(error => console.error('error', error));
  }

  const handleUsernameChange = (value: string) => {
    if(!value) 
      setUsernameError('Username field is required.');
    else setUsernameError('');
    setUsername(value);
  }

  const handlePasswordChange = (value: string) => {
    if(!value) 
      setPasswordError('Password field is required.');
    else setPasswordError('');
    setPassword(value);
  }

  return (
    <Box>
        <Paper sx={{ borderRadius: 2 }}>
          <Box p={4}>
            <Stack gap={2}>
              <FormControl>
                <TextField
                  label={'Username'}
                  value={username}
                  onChange={(event) => handleUsernameChange(event.target.value ?? '')}
                  placeholder='Enter your email address...'
                  error={Boolean(usernameError)}
                  helperText={usernameError}
                />
              </FormControl>

              <FormControl>
                <TextField 
                  label={'Password'}
                  type='password' 
                  placeholder='Enter your password...'
                  value={password}
                  onChange={(event) => handlePasswordChange(event.target.value ?? '')}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                />
              </FormControl>

              <Button variant='contained' disabled={!isFromValid} onClick={handleLogin}>
                Login
              </Button>
            </Stack>
          </Box>
        </Paper>
    </Box>
  );
}

export default Login;
