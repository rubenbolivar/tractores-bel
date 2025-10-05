import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { TractorDetailPage } from './pages/TractorDetailPage';
import { QuizPage } from './pages/QuizPage';
import { Contact } from './pages/Contact';
import { Comparador } from './pages/Comparador';
import { Financiamiento } from './pages/Financiamiento';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/tractor/:id" element={<TractorDetailPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/comparador" element={<Comparador />} />
            <Route path="/financiamiento" element={<Financiamiento />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
