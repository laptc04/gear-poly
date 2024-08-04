import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import image1 from "../../../../images/sanpham1.webp";
import { fetch } from '../../../../services/ProductDt';
const ProductDetail = () => {
  const { productID } = useParams();
  const [productDt, setProductDt] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // const response = await fetch(productID);
        // const data = await response.json();
        // console.log(data)
        // setProductDt(data);
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
              <strong>{productDt.price} VNĐ</strong>
            </h2>
            <Button type="submit" className="btn btn-primary mt-5">
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
