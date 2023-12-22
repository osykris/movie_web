import axios from "axios";

const ProductsAPI = axios.create({
  baseURL: "https://registrasiligatopskor.com/api/product",
});

export const getProducts = async () => {
  const res = await ProductsAPI.get("/");
  return res.data;
};

export const createProduct = (product) => {
  ProductsAPI.post("/store", product);
};

export const deleteProduct = (id) => {
  const res = ProductsAPI.delete(`/delete/${id}`);
  return res.data;
};

export const detailProduct = (id) => {
  return ProductsAPI.get(`/${id}`);
};

const categoryAPI = axios.create({
  baseURL: "https://registrasiligatopskor.com/api/category",
});

export const getCategory = async () => {
  const res = await categoryAPI.get("/");
  return res.data;
};

const apiKey = '3345153459db2f3af61b5eb0964f4677'
const baseUrl = 'https://api.themoviedb.org/3'

export const getMovies = async () => {
  const res = await axios.get(`${baseUrl}/movie/now_playing?api_key=${apiKey}`);
  return res.data.results;
};

export const getDetailMovies = async (id) => {
  const res = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
  return res.data;
};