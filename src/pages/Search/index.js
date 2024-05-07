import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/component/product-item";
import React from "react";
import Pagination from "../../shared/component/Pagination";

const Search = ()=>{
    const [products, setProducts]=React.useState([]);
    const limit = 12;
    const [pages,setPages] = React.useState({
      limit,
    });
    const [searchParams,setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const page = searchParams.get("page") || 1;
    
    React.useEffect(()=>{
      getProducts({
        params:{
          name: keyword,
          limit,
          page,
        },
      }).then(({data})=>{
        setProducts(data.data.docs);
        setPages({...pages, ...data.data.pages});
      })
    },[page,keyword]);
    return (
        <>
        <div>
  <div className="products">
    <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
    <div className="product-list card-deck">
      {
        products?.map((product)=>
              <ProductItem item={product}/>
        )
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
export default Search;