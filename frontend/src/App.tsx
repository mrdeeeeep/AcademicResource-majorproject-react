import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";


const queryClient = new QueryClient();

const App = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout><Index /></AppLayout>} />
            <Route path="/project/:id" element={<AppLayout><ProjectDetail /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <div>{message && <p>Message from backend: {message}</p>}</div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
