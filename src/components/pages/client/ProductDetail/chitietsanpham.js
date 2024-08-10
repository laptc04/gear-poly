import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import image1 from "../../../../images/sanpham1.webp";
import { fetch } from '../../../../services/ProductDt';
import { listCatId } from '../../../../services/ListIndex'; // Import your function
import { useCookies } from "react-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const { productID } = useParams();
  const [productDt, setProductDt] = useState(null);
  const [category, setCategory] = useState(null); // State for a single category


  const [userId, setUserId] = React.useState('');
  const [cookies] = useCookies(["token"]);

  const [soluong, setSoluong] = useState(1);

  useEffect(() => {
    if (cookies.token) {
      // Giải mã user ID từ cookie
      const decodedUserId = atob(cookies.token); // Giải mã Base64
      setUserId(decodedUserId);
    }
  }, [cookies]);

  console.log(userId)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await fetch(productID);
        const productData = productResponse?.data;
        setProductDt(productData);

        if (productData?.categories_id) {
          const categoryResponse = await listCatId(productData.categories_id);
          setCategory(categoryResponse?.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productID]);

  if (!productDt) {
    return <div>Loading...</div>;
  }

  const addToCart = async (id,gia) => {
    console.log('adding to cart');
    const account_id = userId;
    const newData = {
      accountEntity: {id: account_id},
      productEntity:{id: id},
      quantity: soluong,
      price: gia
    };
    console.log(newData)
    try {
      const response = await axios.post('http://localhost:8080/api/cart', newData);
      console.log(response)
      if (response.status === 201) {
        Swal.fire({
          title: 'Added to cart',
          timer: 1500,
          icon: "success"
        });
      } else {
        Swal.fire({
          title: 'Can not add to cart',
          timer: 1500,
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        title: 'Can not add to cart',
        timer: 1500,
        icon: "error"
      });
    }
  };

  return (
    <div className="container">
      <form action="/user/chitiet" method="post" encType="multipart/form-data">
        <div className="row mt-3">
          <div className="col-5">
            <img src={image1} className="card-img-top" alt="Example" />
          </div>
          <div className="col-7">
            <hr />
            <div className="row">
              <h5>CHI TIẾT SẢN PHẨM</h5>
              <h2>{productDt.product_name}</h2>
              <div className="col-3">
                <p>Danh mục:</p>
              </div>
              <div className="col-9">
              <strong>{category?.categories_name || 'Loading category...'}</strong> {/* Display category name */}
              </div>
            </div>
            <h2 className="text-danger">
              <p className="text-danger">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productDt.price)}
              </p>
            </h2>
            <Button type="button" onClick={() => addToCart(productDt.id,productDt.price)} className="btn btn-primary mt-5">
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <hr />
        <h4>MÔ TẢ SẢN PHẨM</h4>
        <p>{productDt.description}</p>
        <hr />
      </form>
    </div>
  );
};

export default ProductDetail;
