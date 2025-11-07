///////////////
'use client';

import Section from '@/components/Section/Section';
import { fetchNotesById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import Modal from '@/components/Modal/Modal';

const NotePreview = () => {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNotesById(id),
    refetchOnMount: false,
  });
  if (isLoading) {
    return (
      <Section>
        <p className={css.mid}>Loading, please wait...</p>
      </Section>
    );
  }

  if (isError || !note) {
    return (
      <Section>
        <p className={css.mid}>
          Something went wrong
          {error instanceof Error ? `: ${error.message}` : ''}.
        </p>
      </Section>
    );
  }

  return (
    <Modal closeModal={onClose}>
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <p className={css.tag}>{note.tag}</p>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
            <button onClick={onClose} className={css.backBtn}>
              Back
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default NotePreview;
