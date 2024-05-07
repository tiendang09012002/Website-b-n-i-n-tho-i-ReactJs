import { Link } from "react-router-dom";

const Menu = ({catrgories})=>{
    return (
        <>
            <div id="menu" className="collapse navbar-collapse">
              <ul>
                {
                  catrgories.map((a)=>
                  <li className="menu-item">
                    <Link to={`/Category-${a._id}`}>{a.name}</Link>
                    </li>)
                }
              </ul>
            </div>
        </>
    );
};
export default Menu;