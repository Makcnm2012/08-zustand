import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Add a new note with title, content, and tags in Notes App.",
  openGraph: {
    title: "Create Note | Notes App",
    description: "Add a new note with title, content, and tags in Notes App.",
    url: "https://08-zustand-gamma-henna.vercel.app/notes/action/create", // замінити на актуальну URL
    images: [
      {
        url: "https://cdn-icons-png.flaticon.com/512/1827/1827933.png",
        width: 1200,
        height: 630,
        alt: "Create a new note page preview",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm />
    </div>
  );
}
