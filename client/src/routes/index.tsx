import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../assets/sass/pages.sass';
import { Limiter } from './layouts/Limiter';
import { Instrument, Instruments } from './pages';

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
        </Routes>
      </Limiter>
    </BrowserRouter>
  );
};
