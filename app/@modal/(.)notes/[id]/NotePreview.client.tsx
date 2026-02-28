'use client';
import css from '@/app/@modal/(.)notes/[id]/NoteDetails.module.css';
import Modal from '@/components/Modal/Modal';
import { getSingleNote } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

// 1. Додано інтерфейс для типізації props компонента
interface NoteDetailsClientPreviewProps {}

const NoteDetailsClientPreview = (props: NoteDetailsClientPreviewProps) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const closeModal = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  // Залишаємо вашу логіку дати або можна просто вивести note.createdAt,
  // оскільки в завданні згадується саме він.
  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal closeModal={closeModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            {/* 2. Додано відображення поля tag */}
            {note.tag && <span className={css.tag}>Tag: {note.tag}</span>}
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
        <button
          onClick={closeModal}
          className={css.backBtn}
          type="button">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NoteDetailsClientPreview;