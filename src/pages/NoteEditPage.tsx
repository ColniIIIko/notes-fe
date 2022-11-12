import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TextField, Tooltip } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';

import NoteSkeleton from '@/components/NoteSkeleton';
import { getUserNote, updateUserNote } from '@/fetchRoutes/notesRoutes';
import { useAuthContext } from '@/hooks/useAuthContext';
import { UserNote } from '@/utils/types';
import { LoadingButton } from '@mui/lab';

function NoteEditPage() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useAuthContext();
  const [note, setNote] = useState<UserNote | null>(null);

  const [isPending, setPending] = useState<boolean>(false);

  useEffect(() => {
    getUserNote(user?.token!, id!)
      .then((r) => {
        setNote(r.note);
        setTitle(r.note.title);
        setBody(r.note.body);
      })
      .catch(() => navigate('/oops'));
  }, [id, navigate, user?.token]);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleEditSubmit = useCallback(async () => {
    setPending(true);
    const updatedNote = (await updateUserNote(user?.token!, note?._id!, { title, body })).note;
    setPending(false);
    navigate(`/notes/${updatedNote._id}`);
  }, [body, navigate, note?._id, title, user?.token]);

  return (
    <div className='flex justify-center pt-8'>
      {!note ? (
        <NoteSkeleton />
      ) : (
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
            <h3 className='text-3xl text-center m-auto'>Edit note</h3>
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
              startIcon={<EditIcon />}
              onClick={() => handleEditSubmit()}
            >
              edit
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteEditPage;
