import css from './Layout.module.css';

interface NoteLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const NoteLayout = ({ children, sidebar }: NoteLayoutProps) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NoteLayout;
