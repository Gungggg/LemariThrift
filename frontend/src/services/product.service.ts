import api from './axios';

export const productService = {
  getProducts: async (params?: any) => {
    const response: any = await api.get('/products');
    let products = Array.isArray(response) ? response : response?.data || [];
    
    // 1. Filter by category (case-insensitive, loose matching)
    if (params?.category) {
      const cat = params.category.toLowerCase();
      products = products.filter((p: any) => {
        const prodCat = (p.category || '').toLowerCase();
        if (cat === 'tops') {
          return prodCat === 'tops' || prodCat === 't-shirt' || prodCat === 'hoodie';
        }
        if (cat === 'bottoms') {
          return prodCat === 'bottoms' || prodCat === 'denim' || prodCat === 'pants';
        }
        if (cat === 'outerwear') {
          return prodCat === 'outerwear' || prodCat === 'jacket' || prodCat === 'denim';
        }
        return prodCat === cat;
      });
    }

    // 2. Filter by sale/status
    if (params?.status) {
      products = products.filter((p: any) => p.status === params.status);
    }
    if (params?.sale === 'true') {
      // Mock sale logic: items priced below 500k or manually marked
      products = products.filter((p: any) => p.isSale || p.price < 500000);
    }
    
    // 3. Sort
    if (params?.sort) {
      if (params.sort === 'price-asc') {
        products.sort((a: any, b: any) => a.price - b.price);
      } else if (params.sort === 'price-desc') {
        products.sort((a: any, b: any) => b.price - a.price);
      } else if (params.sort === 'newest') {
        products.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }
    
    // 4. Paginate
    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedProducts = products.slice((page - 1) * limit, page * limit);
    
    return {
      success: true,
      data: paginatedProducts,
      meta: {
        total,
        page,
        limit,
        totalPages
      }
    };
  },
  getProduct: (id: string) => api.get(`/products/${id}`),
  getLatest: async () => {
    // Backend has no /latest endpoint, so we fetch all and slice
    const products: any = await api.get('/products');
    const data = Array.isArray(products) ? products : products?.data || [];
    // Sort by createdAt desc
    const sorted = [...data].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return { success: true, data: sorted.slice(0, 10) };
  },
  getPopular: async () => {
    // Backend has no /popular endpoint, so we fetch all and slice
    const products: any = await api.get('/products');
    const data = Array.isArray(products) ? products : products?.data || [];
    return { success: true, data: data.slice(0, 8) };
  },
};
