import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import ContactPage from '../pages/ContactPage'
import TeamPage from '../pages/TeamPage'
import AboutPage from '../pages/AboutPage'

function PageContent() {
  return (
    <main className="flex flex-col">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </main>
  )
}

export default PageContent
