import { Link } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
import { getCategory,getProductsCategory } from "../../services/Api";
import ProductItem from "../../shared/component/product-item";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../shared/component/Pagination";
const Category = ()=>{
  const params = useParams();
  const id = params.id;
  const [category,setCategory] = React.useState("");
  const [products,setProducts] = React.useState([]);
  const [totalProduct, setTotalProduct] = React.useState([]);
  const limit=12;
  const [pages,setPages] = React.useState({
    limit,
  });
  const [searchParams,setSearchParams] = useSearchParams();
  
  const page = searchParams.get("page") || 1;
  React.useEffect(()=>{
    getCategory(id,{}).then(({data})=>{
      setCategory(data.data);
    })
    getProductsCategory(id,{
      params:{
        page,
        limit,
      }
    }).then(({data})=>{
      setProducts(data.data.docs);
      setTotalProduct(data.data.docs.length);
      setPages({...pages, ...data.data.pages});
    })  
  },[id,page]);  
    return (
        <>
        <div>
  {/*	List Product	*/}
  <div className="products">
    <h3> {category.name}  (hiện có {totalProduct} sản phẩm)</h3>
    <div className="product-list card-deck">
      {
        
        products.map((item)=><ProductItem item={item}/>)
      }

    </div>
    
    
  </div>
  {/*	End List Product	*/}
  <div id="pagination">
    <Pagination pages={pages}/>
  </div>
</div>

        </>
    );
};
export default Category;