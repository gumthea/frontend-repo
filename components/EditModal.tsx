'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import UpdateButton from '@/components/UpdateButton';

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  currentName: string;
  currentEmail: string;
}

const EditModal = ({ open, onClose, currentName, currentEmail }: EditModalProps) => {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    if (open) setName(currentName);
  }, [open, currentName]);

  const handleCancel = useCallback(() => {
    setName(currentName);
    onClose();
  }, [currentName, onClose]);

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Edit User Info</DialogTitle>

      <DialogContent>
        <TextField
          label="Email"
          value={currentEmail}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          autoFocus
          margin="dense"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <UpdateButton label="Update" nameToUpdate={name} onSuccess={onClose} />
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
