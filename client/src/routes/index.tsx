import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../assets/sass/pages.sass';
import { Limiter } from './layouts/Limiter';
import { Instrument } from './pages';
import { PATHS } from './paths';

export const Router = () => {
  return (
    <BrowserRouter>
      <Limiter>
        <Routes>
          <Route path={PATHS.HOME} element={<div className="lol">2</div>} />
          <Route path={PATHS.INSTRUMENT} element={<Instrument />} />
        </Routes>
      </Limiter>
    </BrowserRouter>
  );
};
