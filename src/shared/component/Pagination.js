import { Link, useSearchParams ,useLocation } from "react-router-dom";
const Pagination = ({pages})=>{
    const location = useLocation();
    const [searchParams,getSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const {
        limit,
        total,
        currentPage,
        next,
        prev,
        hasNext,
        hasPrev,
    }=pages;
    const formatUrl = (page)=>{
        return `${location.pathname}?keyword=${keyword}&&page=${page}`;
    };
    const totalPages= Math.ceil(total/limit);
    const renderPagesHtml = (delta=2)=>{
        const letf= currentPage-delta;
        const right = currentPage+delta;
        const pagesHtml = [];
        for(let i= 1;i<=totalPages;i++){
            if(
                i===1 ||
                i===totalPages ||
                i===currentPage ||
                (i>= letf && i<=right)
            ){
                pagesHtml.push(i);
            }
            else if(i===letf-1|| i===right+1){
                pagesHtml.push("...");
            }
        }
        return pagesHtml;
    }
    return(
        <>
            <ul className="pagination">
                {
                    hasPrev && <li className="page-item"><Link className="page-link" to={formatUrl(prev)}>Trang trước</Link></li>
                }
                {
                    
                    renderPagesHtml().map((page)=>{
                        if(page!="..."){
                           return <li className={`page-item ${currentPage===page && "active"}`}><Link className="page-link" to={formatUrl(page)}>{page}</Link></li>
                        }
                        else{
                           return <li className={`page-item ${currentPage===page && "active"}`}><span className="page-link">{page}</span></li>

                        }
                    }
                    )
                }
                
                {
                    hasNext && <li className="page-item"><Link className="page-link" to={formatUrl(next)}>Trang sau</Link></li>

                }
            </ul> 
        </>
    ); 
};
export default Pagination;