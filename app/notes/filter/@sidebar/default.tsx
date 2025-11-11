import Link from "next/link";
import css from "./SidebarNotes.module.css";

export default async function SidebarNotes() {
  const tags: string[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <>
      <ul className={css.menuList}>
        {/* Всі нотатки */}
        <li className={css.menuItem}>
          <Link href="/notes/action/create" className={css.menuLink}>
            Create note
          </Link>
        </li>

        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>

        {/* Унікальні теги */}
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
