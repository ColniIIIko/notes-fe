import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuthContext';
import { UserNote } from '@/utils/types';
import { deleteUserNote, getUserNotes } from '@/fetchRoutes/notesRoutes';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotesSkeleton from '@/components/NotesSkeleton';

function NotesPage() {
  const { user } = useAuthContext();
  const [notes, setNotes] = useState<UserNote[] | null>(null);

  useEffect(() => {
    getUserNotes(user?.token!).then((r) => {
      setNotes(r.notes);
    });
  }, [user?.token]);

  const handleDeleteNote = useCallback(
    async (noteId: string) => {
      await deleteUserNote(user?.token!, noteId);
      getUserNotes(user?.token!).then((r) => {
        setNotes(r.notes);
      });
    },
    [user?.token]
  );

  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-col pt-5'>
          <div className='flex gap-4 mb-5'>
            <h2 className='self-start text-4xl'>Notes</h2>
            <Link to='/notes/add'>
              <Tooltip title='add'>
                <Fab
                  aria-label='add'
                  color='secondary'
                  size='small'
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Link>
          </div>
          {!notes ? (
            <NotesSkeleton />
          ) : notes.length ? (
            <div className='flex gap-5 flex-col'>
              {notes.map((note) => (
                <div
                  key={note._id}
                  className='flex justify-between gap-1 flex-col md:flex-row md:gap-5 break-words'
                >
                  <Link to={`/notes/${note._id}`}>
                    <div className='flex flex-col'>
                      <h4 className='text-2xl font-medium'>{note.title}</h4>
                      <p>{new Date(note.createdAt).toISOString().split('T')[0]}</p>
                    </div>
                  </Link>
                  <div className='flex gap-2'>
                    <Link to={`/notes/${note._id}/edit`}>
                      <Tooltip title='edit'>
                        <Fab
                          aria-label='edit'
                          color='warning'
                          size='small'
                          variant='extended'
                        >
                          <EditIcon />
                        </Fab>
                      </Tooltip>
                    </Link>
                    <Tooltip title='delete'>
                      <Fab
                        aria-label='delete'
                        color='error'
                        size='small'
                        variant='extended'
                        onClick={() => handleDeleteNote(note._id)}
                      >
                        <DeleteIcon />
                      </Fab>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h4 className='text-center text-3xl pt-5'> No Notes 😥</h4>
          )}
        </div>
      </div>
    </>
  );
}

export default NotesPage;
