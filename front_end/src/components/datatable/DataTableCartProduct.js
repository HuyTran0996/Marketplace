import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { usePage } from "../usePage";
import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";
import { FetchCreateOrder } from "../../data/FetchOrdersData";
import { DeleteProduct } from "../../data/FetchProductsData";

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableCartProduct = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(PageContext);
  const { dataCart } = state;
  const { isProductPage } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = dataCart.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch({
      type: "SET_DATA_CART",
      payload: updatedCart,
    });
    localStorage.setItem("favorite", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = dataCart.map((item) =>
      item._id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    dispatch({
      type: "SET_DATA_CART",
      payload: updatedCart,
    });
    localStorage.setItem("favorite", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const createOrder = async () => {
      try {
        setIsLoading(true);
        await FetchCreateOrder();
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    createOrder();
  }, [location]);

  if (!dataCart || dataCart.length === 0) {
    userColumns = [
      { field: "id", headerName: " Your Cart Is Empty...", width: 240 },
    ];
  } else if (error) {
    userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
  } else {
    dataOriginal = dataCart;
    userColumns = [
      { field: "id", headerName: "ID", width: 70 },
      {
        field: "storeName",
        headerName: "Store",
        width: 100,

        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.storeName}</div>;
        },
      },
      {
        field: "productName",
        headerName: "Product",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img
                className="cellImg"
                src={params.row.photo ? params.row.photo : avatar}
                alt="avatar"
              />
              {params.row.productName}
            </div>
          );
        },
      },
      {
        field: "price",
        headerName: "Price",
        width: 80,
      },
      {
        field: "unit",
        headerName: "Unit",
        width: 60,
      },
    ];

    actionColumn = [
      {
        field: "quantity",
        headerName: "Quantity",
        width: 75,
        renderCell: (params) => (
          <div className="quantity">
            <button onClick={() => handleDecreaseQuantity(params.row._id)}>
              -
            </button>
            <span>{params.row.quantity}</span>
            <button onClick={() => handleIncreaseQuantity(params.row._id)}>
              +
            </button>
          </div>
        ),
      },

      {
        field: "Total",
        headerName: "Total",
        width: 90,
        renderCell: (params) => {
          return (
            <span>
              {(params.row.quantity * params.row.price).toLocaleString()}
            </span>
          );
        },
      },

      {
        field: "action",
        headerName: "ACTION",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link
                to={`/userPage/detail/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="editButton">See Detail</div>
              </Link>

              <div
                className="deleteButton"
                onClick={() => handleRemoveFromCart(params.row.id)}
              >
                X
              </div>
            </div>
          );
        },
      },
    ];
  }

  const data = dataOriginal.map((user) => {
    return {
      ...user,
      id: user._id,
    };
  });

  const handleRemoveFromCart = async (id) => {
    let remove = dataCart.filter((cart) => cart._id !== id);

    dispatch({
      type: "SET_DATA_CART",
      payload: remove,
    });
    localStorage.setItem("favorite", JSON.stringify(remove));
  };

  return (
    <div className="datatable">
      <DataGrid
        rows={data} //userRows
        columns={userColumns.concat(actionColumn)} //userColumns
        className="datagrid"
        // checkboxSelection
        // pageSize={9}
        // rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default DataTableCartProduct;
