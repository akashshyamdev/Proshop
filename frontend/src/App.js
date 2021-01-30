import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './sass/main.scss';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';

function App() {
	return (
		<Router>
			<Header />

			<main style={{ marginLeft: '8rem', marginRight: '8rem' }}>
				<Route path="/placeorder" component={PlaceOrder} />
				<Route path="/payment" component={Payment} />
				<Route path="/checkout" component={Shipping} />
				<Route path="/shipping" component={Shipping} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/profile" component={Profile} />
				<Route path="/cart/:id?" component={Cart} />
				<Route path="/product/:id" component={ProductDetails} />
				<Route exact path="/" component={Home} />
			</main>

			<Footer />
		</Router>
	);
}

export default App;
