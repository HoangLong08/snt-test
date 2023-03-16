import Home from '../pages/Home'
import Consents from '../pages/Consents'
// import NotFound from 'pages/Error/NotFound'

const publicRoutes = [
  { path: '/', page: Home },
  { path: '/home', page: Home },
  { path: '/consents', page: Consents }
  // { path: '*', page: NotFound },
  // { path: '/404', page: NotFound }
]

export { publicRoutes }
