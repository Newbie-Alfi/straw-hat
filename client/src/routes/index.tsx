import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../assets/sass/pages.sass';
import { Limiter } from './layouts/Limiter';

export const Router = () => {
  return (
    <BrowserRouter>
      <Limiter>
        <Routes>
          <Route path="/" element={<div className="lol">2</div>} />
          <Route path="expenses" element={'lok'} />
          <Route path="invoices" element={'ki'} />
        </Routes>
      </Limiter>
    </BrowserRouter>
  );
};
