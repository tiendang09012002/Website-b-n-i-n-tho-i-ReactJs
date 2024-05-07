import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = ()=>{
    const navigate = useNavigate();
    const [keyword,setKeyword] = React.useState("");
    const changeKeyword = (e)=>setKeyword(e.target.value);

    const clickSearch = (e)=>{
      e.preventDefault();
      navigate(`/Search?keyword=${keyword}`);
    };
    const totalCart = useSelector(({Cart})=>{
      return Cart.items.reduce((total,item)=>total + item.qty,0);
    })

    
    return (
        <>
        <div id="header">
    <div className="container">
      <div className="row">
        <div id="logo" className="col-lg-3 col-md-3 col-sm-12">
          <h1><a href="/"><img className="img-fluid" src="images/logo.png" /></a></h1>
        </div>
        <div id="search" className="col-lg-6 col-md-6 col-sm-12">
          <form className="form-inline">
            <input className="form-control mt-3" onChange={changeKeyword} name="keyword" type="search" placeholder="Tìm kiếm" aria-label="Search" />
            <button className="btn btn-danger mt-3" onClick={clickSearch} type="submit">Tìm kiếm</button>
          </form>
        </div>
        <div id="cart" className="col-lg-3 col-md-3 col-sm-12">
          <Link className="mt-4 mr-2" to="/cart">giỏ hàng</Link><span className="mt-3">{totalCart}</span>
        </div>
      </div>
    </div>
    {/* Toggler/collapsibe Button */}
    <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#menu">
      <span className="navbar-toggler-icon" />
    </button>
  </div>
        </>
    );
};
export default Header;