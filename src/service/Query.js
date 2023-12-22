import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getCategory,
  getProducts,
  deleteProduct,
  createProduct,
  detailProduct,
  getMovies,
  getDetailMovies
} from "../api/ProductsAPI";

export const useGetCategory = () => {
  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
    select: (category) => category.sort((a, b) => a.id - b.id),
  });

  return { category, isLoading, isError, error };
};

export const useGetProduct = () => {
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => a.id - b.id),
  });

  return { products, isLoading, isError, error };
};

export const useDetailProduct = (id) => {
  return useQuery(['products', id], () => detailProduct(id))
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: DeleteProd } = useMutation((id) => deleteProduct(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return {
    DeleteProd,
  };
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: addProd } = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return {
    addProd,
  };
};

export const useGetMovie = () => {
  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  return { movies, isLoading, isError, error };
};

export const useDetailMovie = (id) => {
  return useQuery(['movies', id], () => getDetailMovies(id))
};
