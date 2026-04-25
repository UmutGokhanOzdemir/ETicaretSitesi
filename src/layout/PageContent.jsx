import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import ContactPage from '../pages/ContactPage'
import TeamPage from '../pages/TeamPage'
import AboutPage from '../pages/AboutPage'
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
import CartPage from '../pages/CartPage'
import OrderPage from '../pages/OrderPage'
import PreviousOrdersPage from '../pages/PreviousOrdersPage'
import ProtectedRoute from '../components/ProtectedRoute'

function PageContent() {
  return (
    <main className="flex flex-col">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          component={ProductDetailPage}
        />
        <Route
          path="/shop/:gender/:categoryName/:categoryId"
          component={ShopPage}
        />
        <Route path="/shop" component={ShopPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/cart" component={CartPage} />
        <ProtectedRoute path="/order" component={OrderPage} />
        <ProtectedRoute path="/previous-orders" component={PreviousOrdersPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </main>
  )
}

export default PageContent
