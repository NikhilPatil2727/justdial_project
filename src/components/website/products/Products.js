
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from './Service';
import { WEB_API } from "../../../common/constant";

const Products = () => {
    const { bs_id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log('Fetching products for bs_id:', bs_id);

        const fetchProductData = async () => {
            try {
                const response = await fetchProduct(bs_id);
                console.log('API Response:', response.data);
                setData(response.data.data);
            } catch (err) {
                console.log('Error fetching products:', err);
            }
        };

        if (bs_id) {
            fetchProductData();
        }

    }, [bs_id]);

    if (data.length === 0) {
        return null;
    }

    return (
        <div id="product-section" className="container-fluid blog pb-5">
            <div className="container pb-5">
                <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
                    <h2 className="display-4 text-capitalize mb-3">Our Products</h2>
                </div>
                <div className="row g-4">
                    {data.length > 0 ? (
                        data.map((product, index) => (
                            <div className="col-lg-4 wow fadeInUp" data-wow-delay={`${0.2 + index * 0.2}s`} key={product._id}>
                                <div className="blog-item h-100">
                                    <div className="blog-img">
                                        <img
                                            src={`${WEB_API}${product.pd_img}`}
                                            className="img-fluid"
                                            alt={product.pd_name}
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="blog-content p-4">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h4 className="mb-0 text-secondary">{product.pd_name}</h4>
                                        </div>
                                        <p className="h5 d-block mb-4">{product.pd_desc}</p>
                                        <span className="btn btn-secondary py-2 px-4">₹{product.pd_price}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Loading products...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;


