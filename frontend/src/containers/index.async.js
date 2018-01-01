import asyncRoute from 'lib/asyncRoute'

export const AppContainer = asyncRoute(() => import('./AppContainer'))
export const Main = asyncRoute(() => import('./Main'))