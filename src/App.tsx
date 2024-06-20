import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserList, Layout } from "components";
import { Routes, Route } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<UserList />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
