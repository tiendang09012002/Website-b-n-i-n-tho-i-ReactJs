import logo from './logo.svg';  
import './App.css';
import Header from './shared/component/Layout/Header';
import Menu from './shared/component/Layout/Menu';
import Slider from './shared/component/Layout/Slider';
import Sidebar from './shared/component/Layout/Sidebar';
import Footer from './shared/component/Layout/Footer';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Success from './pages/Success';
import NotFound from './pages/NotFound';
import { getCategories } from './services/Api';
import React from 'react';
import store from './redux-setup/store';
import { Provider } from 'react-redux';
function App() {
  const [catrgories, setCategories] = React.useState([]);
 
  //const id = props.match.params.id;
    React.useEffect(()=>{
      getCategories({}).then(({data})=>{setCategories(data.data.docs)});
    },[]);
    
  return (
    <Provider store={store}>
    <BrowserRouter>
      {/*	Header	*/}
      <Header/>
      {/*	End Header	*/}
      {/*	Body	*/}
      <div id="body">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <nav>
              <Menu catrgories={catrgories}/>
              </nav>
            </div>
          </div>
          <div className="row">
            <div id="main" className="col-lg-8 col-md-12 col-sm-12">
              {/*	Slider	*/}
              <Slider/>
              {/*	End Slider	*/}
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/Category-:id' element={<Category/>}/>
                <Route path='/ProductDetails-:id' element={<ProductDetails/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/success' element={<Success/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Routes>
            </div>
            <Sidebar/>
          </div>
        </div>
      </div>
      {/*	End Body	*/}
        <Footer/>
    </BrowserRouter>  
    </Provider>
    
  );
}

export default App;
