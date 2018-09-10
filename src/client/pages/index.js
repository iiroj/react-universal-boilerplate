import universal from 'react-universal-component';

const options = { loadingTransition: false };

export const Home = universal(() => import('./Home.jsx'), options);
export const NotFound = universal(() => import('./NotFound.jsx'), options);
