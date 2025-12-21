import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import CreatePostForm from "./CreatePostForm";

import PostsComponent from "./PostsComponent";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CreatePostForm />
      <PostsComponent />
    </QueryClientProvider>
  );
}
export default App;
