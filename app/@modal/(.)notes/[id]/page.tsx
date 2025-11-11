import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { NotePreview } from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;

  const queryClinet = new QueryClient();

  queryClinet.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClinet)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
