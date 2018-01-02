import asyncRoute from 'lib/asyncRoute'

export const Main = asyncRoute(() => import('./Main'))
export const Login = asyncRoute(() => import('./Login'))
export const Register = asyncRoute(() => import('./Register'))