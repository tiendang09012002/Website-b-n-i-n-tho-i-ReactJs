import { getProducts } from "../../services/Api";
import React from "react";
import ProductItem from "../../shared/component/product-item";
const Home = ()=>{
    const [futureProduct,setFutureProduct] = React.useState([]);
    const [LatestProduct,setLatestProduct] = React.useState([]);
    React.useEffect(()=>{
      //getProduct Latest
      getProducts({
        params: {limit: 6},
      }).then(({data})=>setLatestProduct(data.data.docs));

      //getProduct Future
      getProducts({
        params: {limit: 6,
          "filter[is_featured]":true,
        }
      })
      .then(({data})=>setFutureProduct(data.data.docs));

    },[]);
    return (
        <>
        {/*	Feature Product	*/}
        <div className="products">
            <h3>Sản phẩm nổi bật</h3>
            <div className="product-list card-deck">
            {
              futureProduct?.map((data)=>{
                return <ProductItem item={data}/>
              })
            }
            
            </div>
          </div>
          {/*	End Feature Product	*/}
          {/*	Latest Product	*/}
          <div className="products">
            <h3>Sản phẩm mới</h3>
            <div className="product-list card-deck">
            {
              LatestProduct?.map((data)=>{
                return <ProductItem item={data}/>
              })
            }
            
            </div>
          </div>
          {/*	End Latest Product	*/}
        </>
    );
};
export default Home;