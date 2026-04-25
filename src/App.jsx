import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setUser, verifyToken } from './store/actions/clientActions'
import { fetchCategories } from './store/actions/productActions'
import { hydrateCart } from './store/actions/cartActions'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import Footer from './layout/Footer'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Bootstrap: localStorage'tan user state'ini Redux'a yükle (refresh sonrası kayıp olmasın)
    try {
      const stored = localStorage.getItem('user')
      if (stored) dispatch(setUser(JSON.parse(stored)))
    } catch {
      /* ignore parse errors */
    }
    dispatch(hydrateCart())
    dispatch(verifyToken())
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageContent />
      <Footer />
      <ToastContainer position="top-right" />
    </div>
  )
}

export default App
