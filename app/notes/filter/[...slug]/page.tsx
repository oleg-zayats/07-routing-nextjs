import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesByCategoryClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const initialPage = 1;
  const initialSearch = '';
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', category, initialSearch, initialPage],
    queryFn: () => fetchNotes(initialPage, initialSearch, category),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByCategoryClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
