import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getImageProduct } from "../../shared/ultils";
import {
  DELETE_TO_CART,
  UPDATE_TO_CART,
  SUCCESS_CART,
} from "../../shared/constants/action-type";
import { formatVND } from "../../shared/ultils/fomatVND";
import React from "react";
import { order } from "../../services/Api";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const [inputs, setInputs] = React.useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(({ Cart }) => {
    return Cart.items;
  });
  const newItems = items.map((item) => ({ prd_id: item._id, qty: item.qty }));

  console.log(newItems);
  const clickOrder = (e) => {
    e.preventDefault();
    order({ items: newItems, ...inputs }).then(({ data }) => {
      if (data.status === "success") {
        dispatch({
          type: SUCCESS_CART,
        });
        navigate("/Success");
      }
      console.log(data);
    });
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onClickDelete = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Bạn có muốn xoá sản phẩm khỏi giỏ hàng không ?");
    return isConfirm
      ? dispatch({
          type: DELETE_TO_CART,
          payload: {
            _id: id,
          },
        })
      : false;
  };
  const onChangeQty = (e, id) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      dispatch({
        type: UPDATE_TO_CART,
        payload: {
          _id: id,
          qty: value,
        },
      });
    } else {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm(
        "Bạn có muốn xoá sản phẩm khỏi giỏ hàng không ?"
      );
      return isConfirm
        ? dispatch({
            type: DELETE_TO_CART,
            payload: {
              _id: id,
            },
          })
        : false;
    }
  };
  return (
    <>
      <div>
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
              Thông tin sản phẩm
            </div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
              Tùy chọn
            </div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {items?.map((item) => {
              return (
                <div className="cart-item row">
                  <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                    <img src={getImageProduct(item?.image)} />
                    <h4>{item?.name}</h4>
                  </div>
                  <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                    <input
                      onChange={(e) => onChangeQty(e, item._id)}
                      type="number"
                      id="quantity"
                      className="form-control form-blue quantity"
                      value={item?.qty}
                    />
                  </div>
                  <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                    <b>{formatVND(item.price * item?.qty)}</b>
                    <a onClick={(e) => onClickDelete(e, item._id)} href="#">
                      Xóa
                    </a>
                  </div>
                </div>
              );
            })}

            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <button
                  id="update-cart"
                  className="btn btn-success"
                  type="submit"
                  name="sbm"
                >
                  Cập nhật giỏ hàng
                </button>
              </div>
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    items.reduce(
                      (total, item) => total + item.qty * item.price,
                      0
                    )
                  )}
                </b>
              </div>
            </div>
          </form>
        </div>

        <div id="customer">
          <form method="post">
            <div className="row">
              <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  onChange={(e) => onChangeInputs(e)}
                  placeholder="Họ và tên (bắt buộc)"
                  type="text"
                  name="name"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  onChange={(e) => onChangeInputs(e)}
                  placeholder="Số điện thoại (bắt buộc)"
                  type="text"
                  name="phone"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  onChange={(e) => onChangeInputs(e)}
                  placeholder="Email (bắt buộc)"
                  type="text"
                  name="email;"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                <input
                  onChange={(e) => onChangeInputs(e)}
                  placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                  type="text"
                  name="address"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </form>
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <Link onClick={(e) => clickOrder(e)} to="/success">
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
              </Link>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <Link to="success">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
