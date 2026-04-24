import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'

function PageContent() {
  return (
    <main className="flex flex-col">
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* İleride eklenecek:
        <Route path="/shop" component={ShopPage} />
        <Route path="/product/:id" component={ProductDetail} />
        */}
      </Switch>
    </main>
  )
}

export default PageContent