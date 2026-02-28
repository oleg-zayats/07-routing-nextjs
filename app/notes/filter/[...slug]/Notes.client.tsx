'use client';

import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from '@/app/notes/filter/[...slug]/notesPage.module.css';

interface NotesByCategoryClientProps {
  category: string | undefined;
}

const NotesByCategoryClient = ({ category }: NotesByCategoryClientProps) => {
  const [title, setTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setTitle(value);
    setCurrentPage(1);
  }, 1000);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['notes', category, title, currentPage],
    queryFn: () => fetchNotes(currentPage, title, category),
    refetchOnMount: false,
    enabled: true,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            onSearch={debouncedSearch}
            value={title}
          />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}

          <button
            className={css.button}
            onClick={() => setIsOpenModal(true)}>
            Create note +
          </button>
        </header>

        {/* {isError && <CustomErrorMessage />} */}

        {isOpenModal && (
          <Modal closeModal={() => setIsOpenModal(false)}>
            <NoteForm closeModal={() => setIsOpenModal(false)} />
          </Modal>
        )}

        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
    </>
  );
};

export default NotesByCategoryClient;
