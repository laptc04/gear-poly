import React, { useEffect, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import image from "../../../../images/image.png";

const Index = () => {
  const [Listproducts, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product_name, setProduct_Name] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("-1");

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

  // Lọc sản phẩm có role "hien" là true
  const filteredProducts = Listproducts.filter(product => product.hien === false);

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
          <div className="col-1"></div>
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
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card m-3" style={{ width: "17.5rem" }}>
                    <center>
                      {Array.isArray(product.imageEntity) &&
                        product.imageEntity.length > 0 && (
                          <img
                            className="image"
                            src={`http://localhost:8080/images/${product.imageEntity[0].name}`}
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
                      <h6 className="card-title">{product.product_name}</h6>
                      <p className="text-danger">
                        {new Intl.NumberFormat('vi-VN',
                          { style: 'currency', currency: 'VND' }).
                          format(product.price)}
                      </p>
                      <p className="text-warning">0.0 <FaStar /></p>
                      <a href={`ProductDetail/${product.id}`} className="btn btn-primary">
                        Xem chi tiết
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
