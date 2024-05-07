import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { getProduct,getCommentsProduct, createCommentsProduct } from "../../services/Api";
import { getImageProduct } from "../../shared/ultils";
import { formatVND } from "../../shared/ultils/fomatVND";
import moment from "moment";
import { ADD_TO_CART } from "../../shared/constants/action-type";
import { useDispatch } from "react-redux";
const ProductDetails = ()=>{
  
  const [productDetail, setProductDetail] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [inputComment, setInputComment] = React.useState({});
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  const addToCart = (type)=>{
    if(productDetail){
      const {_id, name, price, image} = productDetail;
      dispatch({
        type: ADD_TO_CART,
        payload: {
          _id,
          name,
          price,
          image,
          qty:1,
        },
      })
    }
    
    if(type === "buy-now"){
      navigate("/Cart");
    }
  }

  const changeInput = (e)=>{
    const {name,value} = e.target;
    setInputComment({...inputComment, [name]: value})
  };
  const clickSubmit =(e)=>{
    e.preventDefault();
    createCommentsProduct(id,inputComment,{}).then(({data})=>{
      if(data.status==="success"){
        setInputComment({});
        getComments(id);
      }
    });
  };

  const getComments = (id)=>{
    getCommentsProduct(id,{}).then(({data})=>{
      setComments(data.data.docs);
    })
  }
  React.useEffect(()=>{
    //Get Product
    getProduct(id,{}).then(({data})=>{
      setProductDetail(data.data);
    })
    //Get comments
    getComments(id);
  },[])
    return (
        <>
        <div>
  {/*	List Product	*/}
  <div id="product">
    <div id="product-head" className="row">
      <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
        <img src={getImageProduct(productDetail?.image)} alt="" />
      </div>
      <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
        <h1>{productDetail?.name}</h1>
        <ul>
          <li><span>Bảo hành:</span> 12 Tháng</li>
          <li><span>Đi kèm:</span> {productDetail?.accessories}</li>
          <li><span>Tình trạng:</span> {productDetail?.status}</li>
          <li><span>Khuyến Mại:</span>{productDetail?.promotion }</li>
          <li id="price">Giá Bán (chưa bao gồm VAT)</li>
          <li id="price-number">{formatVND(productDetail?.price)}</li>
          <li id="status">{productDetail?.is_stock===true?"CÒn hàng":"Hết hàng"}</li>
        </ul>
        <div id="add-cart">
	        <button onClick={()=>{addToCart("buy-now")}} className="btn btn-warning mr-2">Mua ngay</button>

	        <button onClick={addToCart} className="btn btn-info">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
    <div id="product-body" className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <h3>Đánh giá về {productDetail?.name}</h3>
        {productDetail?.details}
      </div>
    </div>
    {/*	Comment	*/}
    <div id="comment" className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <h3>Bình luận sản phẩm</h3>
        <form method="post">
          <div className="form-group">
            <label>Tên:</label>
            <input onChange={changeInput} name="name" required type="text" className="form-control" value={inputComment.name || ""} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input onChange={changeInput} name="email" required type="email" className="form-control" id="pwd" value={inputComment.email || ""}  />
          </div>
          <div className="form-group">
            <label>Nội dung:</label>
            <textarea onChange={changeInput} name="content" required rows={8} className="form-control" value={inputComment.content || ""}/>     
          </div>
          <button onClick={clickSubmit} type="submit" name="sbm" className="btn btn-primary">Gửi</button>
        </form> 
      </div>
    </div>
    {/*	End Comment	*/}  
    {/*	Comments List	*/}
    <div id="comments-list" className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        {comments?.map((item)=>{
          const m = moment(item?.createdAt);
          return(
          <div className="comment-item">
          <ul>
            <li><b>{item?.name}</b></li>
            <li>{m.fromNow()}</li>
            <li>
              <p>{item?.content}</p>
            </li>
          </ul>
        </div>
          )
        })}
      </div>
    </div>
    {/*	End Comments List	*/}
  </div>
  {/*	End Product	*/} 
  <div id="pagination">
    <ul className="pagination">
      <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
      <li className="page-item active"><a className="page-link" href="#">1</a></li>
      <li className="page-item"><a className="page-link" href="#">2</a></li>
      <li className="page-item"><a className="page-link" href="#">3</a></li>
      <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
    </ul> 
  </div>
</div>

        </>
    );
};
export default ProductDetails;