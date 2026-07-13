import { ICategory } from '@/types';


// Mock categories since the railway backend doesn't support it natively
const MOCK_CATEGORIES: ICategory[] = [
  { 
    id: '1', 
    name: 'Tops', 
    slug: 'tops',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKUTpSVrE_nKEXJTN2Ob3xL0YSyFk88GJVj6qS7eZESABMn1vgqXhuYt9EExMjwi5qqaCgm0xb_ib4Amw6G5oOiiq6XquFNKnaq8TYzQEvJnYqtntH2_nQlkrdJ6vSx1n6dtENaUSvFNKwg0bYILYyKEcXhL_91DuozIKYWhziQ3a5R-8hdFMB0yR-qIALlogFHU7xKEM7QhbaDKR_c8cBtCyP7zjw1B5YcGcLcLZ6JgYRK1pKomjWcHFwaw1IqDceVSGD-tT9wc8'
  },
  { 
    id: '2', 
    name: 'Bottoms', 
    slug: 'bottoms',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9OabOGdLNGpLzY0qsIkqoO7s2H7cpg4hcCOF4g1DdRU2FEbRlxQ5D4bUpA4ROMH5ge4QVhvZlknV7Dl_RYKYvKAcodx13thRfUJ0iucdmXWriZ_m4vTC03uWoPy_orGOZU4qHxUFVCvttqDu2EVPJbsYNqbCYo6S0MZp4pcAX8I2dwW7xYnvzHZW6SEpzhHjTR0igQ-kxOWF7AbhiZSUJrp4ddpMJ4TRuZAAZhHWfU3y95fQMFuGQaopa54LLlNC1xwihiwiCu7I'
  },
  { 
    id: '3', 
    name: 'Outerwear', 
    slug: 'outerwear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMyCBue14G8JGTxP6O2szUtEBOulVf8d0RUZB5O3NNLjgc_ndzaFKGCjOtiq_wfppaF8iiBjQ_-XlD6bm3cb_QLLDDyA2Bqac5KHQ-af6SR1m7FWtaiw40F4WakMDuwT-lajx-Psog9yjUDR4zW0ZHNB2o0JC9QCZReoj0ja8OOYs2dzEIq9G4Eh2EykBN93QjOlK795dzEbdS_oEJjTXrqlL4aFiSqfTpzOuoo9vDbu3SXVQUpPkd5JH97CAbi0OXmL1NPE-XGa8'
  },
  { 
    id: '4', 
    name: 'Accessories', 
    slug: 'accessories',
    image: 'https://picsum.photos/id/26/500/500'
  },
];

export const categoryService = {
  getAll: async () => {
    return { success: true, data: MOCK_CATEGORIES };
  },
  getCategory: async (slug: string) => {
    return { success: true, data: MOCK_CATEGORIES.find(c => c.slug === slug) };
  },
};
