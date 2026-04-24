import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import Footer from './layout/Footer'

function App() {
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
