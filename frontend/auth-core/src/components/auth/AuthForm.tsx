'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { AuthFormProps, AuthFormSchema, AuthFormValues } from './AuthForm.types'

export default function AuthForm({ type }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(AuthFormSchema),
  })

  const onSubmit = (data: AuthFormValues) => {
    console.log(`[${type.toUpperCase()}]`, data)
    // TODO: connect to Django backend
  }

  const isLogin = type === 'login'
  const title = isLogin ? 'Sign In' : 'Sign Up'
  const buttonText = isLogin ? 'Login' : 'Register'
  const switchText = isLogin
    ? { question: "Don't have an account?", link: '/register', label: 'Register' }
    : { question: 'Already have an account?', link: '/login', label: 'Login' }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f4f6f8"
      px={2}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {title}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              {!isLogin && (
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
              <Button type="submit" variant="contained" size="large">
                {buttonText}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            {switchText.question}{' '}
            <a href={switchText.link} style={{ color: '#1976d2' }}>
              {switchText.label}
            </a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
