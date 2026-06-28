import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n/context";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import VacantesPage from "./pages/VacantesPage";
import BlogPage from "./pages/BlogPage";
import ServicePage from "./pages/ServicePage";
import EmpresaPage from "./pages/EmpresaPage";
import CandidatoPage from "./pages/CandidatoPage";
import ContactoPage from "./pages/ContactoPage";
import RecursoPage from "./pages/RecursoPage";
import InsiderClubPage from "./pages/InsiderClubPage";
import RecursosDigitalesPage from "./pages/RecursosDigitalesPage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/empresa" element={<EmpresaPage />} />
            <Route path="/empresa/:slug" element={<ServicePage />} />
            <Route path="/candidato" element={<CandidatoPage />} />
            <Route path="/candidato/:slug" element={<ServicePage />} />
            
            <Route path="/vacantes" element={<VacantesPage />} />
            <Route path="/recursos/blog" element={<BlogPage />} />
            <Route path="/recursos/insider-club" element={<InsiderClubPage />} />
            <Route path="/recursos-digitales" element={<RecursosDigitalesPage />} />
            <Route path="/recursos/:slug" element={<RecursoPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
