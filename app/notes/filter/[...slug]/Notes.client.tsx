"use client";

import { useState } from "react";
import css from "./Notes.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Pagination } from "@/components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

function Notes({ tag }: NotesClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedQuery] = useDebounce(query, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedQuery, page, tag],
    queryFn: () => fetchNotes(debouncedQuery, page, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const totalPage = data?.totalPages || 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearchChange} />
        {totalPage > 1 && (
          <Pagination
            totalPages={totalPage}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {!isLoading &&
        !isError &&
        data &&
        (data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p className={css.empty}>No notes found 😕</p>
        ))}
    </div>
  );
}

export default Notes;
