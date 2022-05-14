import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../assets/sass/pages.sass';
import { Limiter } from './layouts/Limiter';
import { AboutInsrument, Instrument, Instruments } from './pages';

import { PATHS } from './paths';

export const Router = () => {
  return (
    <BrowserRouter>
      <Limiter>
        <Routes>
          <Route
            path={PATHS.HOME}
            element={
              <>
                <Instrument />
                <Instruments />
              </>
            }
          />
          <Route path={'/:ticket'} element={<AboutInsrument />} />
        </Routes>
      </Limiter>
    </BrowserRouter>
  );
};
