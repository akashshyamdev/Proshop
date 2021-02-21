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
import Order from './pages/Order';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';

function App({ match }) {
	return (
		<Router>
			<Header />

			<main style={{ marginLeft: '8rem', marginRight: '8rem' }}>
				<Route path="/order/:id" component={Order} />
				<Route path="/placeorder" component={PlaceOrder} />
				<Route path="/payment" component={Payment} />
				<Route path="/checkout" component={Shipping} />
				<Route path="/shipping" component={Shipping} />
				<Route path="/cart/:id?" component={Cart} />
				<Route path="/admin/user/:id/edit" component={UserEdit} />
				<Route path="/admin/product/:id/edit" component={ProductEdit} />
				<Route path="/userlist" component={UserList} />
				<Route path="/profile" component={Profile} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/product/:id" component={ProductDetails} />
				<Route path="/productlist" component={ProductList} />
				<Route exact path="/" component={Home} />
			</main>

			<Footer />
		</Router>
	);
}

export default App;
