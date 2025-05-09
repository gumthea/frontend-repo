'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, CircularProgress, Button, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/reducerHooks';
import { fetchUserThunk } from '@/store/actions';
import EditModal from '@/components/EditModal';

const HomePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, loading, error } = useAppSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) router.replace('/');
  }, [router, token]);

  const fetchUser = () => {
    if (token) dispatch(fetchUserThunk(token));
  };

  const handleModalClose = useCallback(() => {
    setOpenModal(false);
    fetchUser();
  }, [token]);

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Welcome to the Home Page
      </Typography>

      <Box mb={3} textAlign="center">
        <Button variant="contained" onClick={fetchUser} disabled={loading}>
          {loading ? 'Loading...' : 'Load User Info'}
        </Button>
      </Box>

      {loading && (
        <Box textAlign="center" mb={2}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box textAlign="center" mb={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {user && (
        <>
          <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 12">
                <Typography><strong>Email:</strong> {user.email}</Typography>
              </Box>
              <Box gridColumn="span 12">
                <Typography><strong>Name:</strong> {user.name}</Typography>
              </Box>
              <Box gridColumn="span 12">
                <Button variant="outlined" fullWidth onClick={() => setOpenModal(true)}>
                  Update Info
                </Button>
              </Box>
            </Box>
          </Paper>

          <EditModal
            key={user.name}
            open={openModal}
            onClose={handleModalClose}
            currentName={user.name}
            currentEmail={user.email}
          />
        </>
      )}
    </Box>
  );
};

export default HomePage;
