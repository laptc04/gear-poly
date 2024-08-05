import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import image1 from "../../../../images/sanpham1.webp";
import { fetch } from '../../../../services/ProductDt';
import axios from "axios";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const { productID } = useParams();
  const [productDt, setProductDt] = useState(null);
  const [data, setData] = useState({ account_id: '', product_id: '', quantiy: 1, price: '', image: '' });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        fetch(productID).then((response) => {
          console.log(response?.data)
          setProductDt(response?.data)
        }).catch(error => {
          console.error(error);
        })
      } catch (error) {
        console.log(productID)
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productID]);

  if (!productDt) {
    return <div>Loading...</div>;
  }

  const addToCart = async () => {
    console.log('adding to cart');
    
    const account_id = 'A001';
    const newData = {
      account_id,
      product_id: productDt.id,
      quantiy: 1,
      price: productDt?.price,
      image: productDt?.image
    };

    await axios.post('http://localhost:8080/api/cart/addCart', newData).then((response) => {
      console.log(response.status);
      
      if (response.status === 201) {
        console.log("success");
        
        Swal.fire({
          title: 'Added to cart',
          timer: 1500,
          icon: "success"
        });
      } else {
        console.log("fail");
        Swal.fire({
          title: 'Can not add to cart',
          timer: 1500,
          icon: "error"
        });
      }
    });
}



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
                <p>Danh mục</p>
              </div>
              <div className="col-9">
                <p>{productDt.category}</p>
                <p>{productDt.manufacturer}</p>
                <p>{productDt.supplier}</p>
              </div>
            </div>
            <h2 className="text-danger">
              <p className="text-danger">
                {new Intl.NumberFormat('vi-VN',
                  { style: 'currency', currency: 'VND' }).
                  format(productDt.price)}</p>
            </h2>
            <Button type="button" onClick={addToCart} className="btn btn-primary mt-5">
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
