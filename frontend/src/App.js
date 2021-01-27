import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './sass/main.scss';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
	return (
		<Router>
			<Header />

			<main style={{ marginLeft: '8rem', marginRight: '8rem' }}>
				<Route path="/product/:id" component={ProductDetails} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/cart/:id?" component={Cart} />
				<Route exact path="/" component={Home} />
			</main>

			<Footer />
		</Router>
	);
}

export default App;
