import React, { useEffect, useState } from "react";
import { listIndex,listCat2 } from '../../../../services/ListIndex';
import image from "../../../../images/image.png";
import image1 from "../../../../images/sanpham1.webp";

import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const Index = () => {
  const [Listproducts, setProducts] = useState([])
  const [listCat, setCats] = useState([])
  const [product_name, setProduct_Name] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("-1");
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   listIndex().then((Response) => {
  //     setProducts(Response.data);
  //   }).catch(error => {
  //     console.error(error);
  //   })
  // }, [])


  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await listCat2();  // Await the promise returned by listCat
  //       console.log(response?.data);  // Log the response data
  //       setCats(response?.data);  // Set the data to state
  //     } catch (error) {
  //       console.error("Error fetching cat data:", error);  // Handle any errors
  //     }
  //   };
  
  //   fetchCategories();  // Call the async function
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/products"),
          axios.get("http://localhost:8080/api/categories"),
        ]);

        console.log("Products:", productResponse.data);
        console.log("Categories:", categoryResponse.data);
        setProducts(productResponse?.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/products/searchProd', {
          params: {
              product_name: product_name || "",
              minPrice: minPrice || "",
              maxPrice: maxPrice || "",
          }, 
      });
      setProducts(response.data); // Cập nhật danh sách sản phẩm sau khi tìm kiếm
  } catch (error) {
      console.error('Error searching products:', error);
  }
  };

  return (
    <div className="bg-body-tertiary">
      <div className=" pt-5">
        <div id="carouselExampleIndicators" className="carousel slide mt-3">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner ">
            <div className="carousel-item active">
              <img
                src={image}
                className="d-block w-100"
                alt="Slide 1"
                width="600px"
                height="500px"
              />
            </div>
            <div className="carousel-item">
              <img
                src="../images/banner2.png"
                className="d-block w-100"
                alt="Slide 2"
                width="600px"
                height="300px"
              />
            </div>
            <div className="carousel-item ">
              <img
                src="../images/banner3.png"
                className="d-block w-100"
                alt="Slide 3"
                width="600px"
                height="300px"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>



        <div className="row mt-3">
          <div className="col-1">

          </div>
          <div className="col-10">
          <form className="d-flex mb-4" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Tìm kiếm theo tên"
            value={product_name}
            onChange={(e) => setProduct_Name(e.target.value)}
          />
          <input
            className="form-control me-2"
            type="number"
            placeholder="Giá thấp nhất"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
          />
          <input
            className="form-control me-2"
            type="number"
            placeholder="Giá cao nhất"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
          />
          <button className="btn btn-outline-success" type="submit">
            Tìm
          </button>
        </form>
        <form action="/search-by-category" method="get" className="d-inline">
            <select
              className="form-select"
              name="categories_id"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="-1">Tìm theo danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categories_name}
                </option>
              ))}
            </select>
          </form>
            <div className="container">
              <h1>Sản phẩm nổi bật</h1>
              <div className="row">
                {
                  Listproducts.map((Listproducts) =>
                    <div className="card m-3" style={{ width: "17.5rem" }}>
                      <center>
                      {Array.isArray(Listproducts.imageEntity) &&
                        Listproducts.imageEntity.length > 0 && (
                          <img
                            className="image"
                            src={`http://localhost:8080/images/${Listproducts.imageEntity[0].name}`}
                            alt="Hình ảnh không hiển thị"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </center>
                      <div className="card-body">
                        <h6 className="card-title">{Listproducts.product_name}</h6>
                        <p className="text-danger">
                          {new Intl.NumberFormat('vi-VN',
                            { style: 'currency', currency: 'VND' }).
                            format(Listproducts.price)}</p>
                        <p className="text-warning">0.0 <FaStar /></p>
                        <a href={`ProductDetail/${Listproducts.id}`} className="btn btn-primary">
                          Xem chi tiết
                        </a>
                      </div>
                    </div>
                  )

                }



              </div>



              {/* {products.length === 0 ? (
            <p>Không tìm thấy sản phẩm nào.</p>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-4">
                  <div className="card mt-5 border border-dark-subtle" style={{ width: "18rem" }}>
                    <a href={`/user/chitiet?id=${product.id}`}>
                      <div style={{ position: "relative", width: "286px", height: "200px" }}>
                        {product.imageEntities.map((image, index) => (
                          <img
                            key={index}
                            className="rounded mx-auto d-block"
                            src={`/images/${image.name}`}
                            alt={product.product_name}
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                          />
                        ))}
                      </div>
                    </a>
                    <div className="card-body">
                      <h6 className="card-title">{product.product_name}</h6>
                      <p className="card-text bg-secondary-subtle">
                        {product.categoryEntity[0].categories_name}
                      </p>
                      <p className="text-danger">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                      </p>
                      <h6 className="text-warning">
                        0.0 <i className="fa-solid fa-star"></i>
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )} */}
              <div className="row mt-2">
                <div className="col-5"></div>
                <div className="col-2">
                  {/* <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li
                        className={`page-item ${currentPage === 0 ? "disabled" : ""
                          }`}
                      >
                        <a
                          className="page-link"
                          href={`/user/index?page=${currentPage > 0 ? currentPage - 1 : 0
                            }&size=6`}
                        >
                          <AiOutlineDoubleLeft />
                        </a>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${i === currentPage ? "active" : ""
                            }`}
                        >
                          <a
                            className="page-link"
                            href={`/user/index?page={i}&size=6`}
                          >
                            {i + 1}
                          </a>
                        </li>
                      ))}
                      <li
                        className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""
                          }`}
                      >
                        <a
                          className="page-link"
                          href={`/user/index?page=${currentPage < totalPages - 1
                            ? currentPage + 1
                            : totalPages - 1
                            }&size=6`}
                        >
                          <AiOutlineDoubleRight />
                        </a>
                      </li>
                    </ul>
                  </nav> */}
                </div>
                <div className="col-5"></div>
              </div>
            </div>
          </div>
          <div className="col-1">

          </div>

        </div>


      </div>
    </div>
  );
};

export default Index;
