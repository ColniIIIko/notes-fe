import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

import { deleteUserNote, getUserNote } from '@/fetchRoutes/notesRoutes';
import { useAuthContext } from '@/hooks/useAuthContext';
import { UserNote } from '@/utils/types';
import NoteSkeleton from '@/components/NoteSkeleton';

const NotePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useAuthContext();
  const [note, setNote] = useState<UserNote | null>(null);

  useEffect(() => {
    getUserNote(user?.token!, id!)
      .then((r) => setNote(r.note))
      .catch(() => navigate('/oops'));
  }, [id, navigate, user?.token]);

  const handleDeleteNote = useCallback(async () => {
    setNote(null);
    await deleteUserNote(user?.token!, note?._id!);
    navigate('/notes');
  }, [navigate, note?._id, user?.token]);

  return (
    <div className='flex justify-center pt-8'>
      {!note ? (
        <NoteSkeleton />
      ) : (
        <div className='w-full'>
          <div className='flex justify-around items-center mb-5'>
            <div
              onClick={() => navigate('/notes')}
              className='cursor-pointer'
            >
              <Tooltip title='back'>
                <ArrowBackIosIcon fontSize='large' />
              </Tooltip>
            </div>
            <h3 className='text-3xl text-center'>{note.title}</h3>
            <div className='flex gap-1'>
              <Link to={`/notes/${note._id}/edit`}>
                <Tooltip title='edit'>
                  <EditIcon
                    color='warning'
                    fontSize='large'
                  />
                </Tooltip>
              </Link>
              <Tooltip title='delete'>
                <DeleteIcon
                  onClick={() => handleDeleteNote()}
                  color='error'
                  fontSize='large'
                  className='cursor-pointer'
                />
              </Tooltip>
            </div>
          </div>
          <div className='rounded-lg p-8 bg-slate-100'>
            <p>{note.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotePage;
