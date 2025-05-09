'use client';

import { useState, useCallback } from 'react';
import { Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/reducerHooks';
import { updateUserThunk } from '@/store/actions';

interface UpdateButtonProps {
  label?: string;
  nameToUpdate?: string;
  onSuccess?: () => void;
}

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error'>('success');
  const [message, setMessage] = useState('');

  const showSnackbar = useCallback((type: 'success' | 'error', message: string) => {
    setType(type);
    setMessage(message);
    setOpen(true);
  }, []);

  const closeSnackbar = () => setOpen(false);

  return { open, type, message, showSnackbar, closeSnackbar };
};

const UpdateButton = ({ label = 'Update', nameToUpdate, onSuccess }: UpdateButtonProps) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const { open, type, message, showSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token || !nameToUpdate?.trim()) {
      showSnackbar('error', 'Invalid name or token');
      return;
    }

    const res = await dispatch(updateUserThunk({ token, data: { name: nameToUpdate } }));

    if (res.meta.requestStatus === 'fulfilled') {
      showSnackbar('success', 'Update successful!');
    } else {
      showSnackbar('error', 'Failed to update user.');
    }
  }, [dispatch, nameToUpdate, showSnackbar]);

  const handleSnackbarClose = () => {
    closeSnackbar();
    if (onSuccess) onSuccess();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={loading || open}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {label}
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateButton;
