import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import { createUserNote } from '@/fetchRoutes/notesRoutes';
import { useAuthContext } from '@/hooks/useAuthContext';

function NoteAddPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [isPending, setPending] = useState<boolean>(false);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCreateSubmit = useCallback(async () => {
    setPending(true);
    const { note } = await createUserNote(user?.token!, { title, body });
    setPending(false);
    navigate(`/notes/${note._id}`);
  }, [body, navigate, title, user?.token]);

  return (
    <div className='w-full'>
      <div className='flex items-center justify-center mb-5'>
        <div
          onClick={() => navigate('/notes')}
          className='cursor-pointer self-start'
        >
          <Tooltip title='back'>
            <ArrowBackIosIcon fontSize='large' />
          </Tooltip>
        </div>
        <h3 className='text-3xl text-center m-auto'>Create note</h3>
      </div>
      <div className='flex flex-col gap-5'>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='rounded-lg bg-gray-100'
        />
        <TextField
          value={body}
          multiline
          onChange={(e) => setBody(e.target.value)}
          className='rounded-lg bg-gray-100'
        />
        <LoadingButton
          color='primary'
          variant='contained'
          className='self-start'
          disabled={!title || !body}
          loading={isPending}
          loadingPosition='start'
          startIcon={<AddIcon fontSize='inherit' />}
          onClick={() => handleCreateSubmit()}
        >
          create
        </LoadingButton>
      </div>
    </div>
  );
}

export default NoteAddPage;
