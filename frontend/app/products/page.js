'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { productAPI, categoryAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.css';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'rating', label: 'Avg. Customer Review' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

const RATING_OPTIONS = [4, 3, 2, 1];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters from URL
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'featured';
  const minRating = searchParams.get('minRating') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [priceMin, setPriceMin] = useState(minPrice);
  const [priceMax, setPriceMax] = useState(maxPrice);

  useEffect(() => {
    categoryAPI.getAll().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = { sort, page, limit: 20 };
        if (search) params.search = search;
        if (category) params.category = category;
        if (minRating) params.minRating = minRating;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;

        const data = await productAPI.getAll(params);
        setProducts(data.products);
        setPagination(data.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category, sort, minRating, minPrice, maxPrice, page]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (priceMin) params.set('minPrice', priceMin);
    else params.delete('minPrice');
    if (priceMax) params.set('maxPrice', priceMax);
    else params.delete('maxPrice');
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setPriceMin(''); setPriceMax('');
    router.push('/products');
  };

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <p className={styles.resultCount}>
          {loading ? 'Searching...' : (
            <>
              {search && <><strong>Results for "{search}"</strong> — </>}
              {pagination.total.toLocaleString()} results
              {category && <> in <strong>{categories.find(c => c.slug === category)?.name || category}</strong></>}
            </>
          )}
        </p>
        <div className={styles.sortWrapper}>
          <label className={styles.sortLabel}>Sort by:</label>
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={e => updateParam('sort', e.target.value)}
            id="sort-select"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Department</h3>
            <ul className={styles.filterList}>
              <li>
                <button
                  className={`${styles.filterItem} ${!category ? styles.activeFilter : ''}`}
                  onClick={() => updateParam('category', '')}
                >
                  All Categories
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    className={`${styles.filterItem} ${category === cat.slug ? styles.activeFilter : ''}`}
                    onClick={() => updateParam('category', cat.slug)}
                  >
                    {cat.name} <span className={styles.filterCount}>({cat._count?.products})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.filterDivider} />

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Avg. Customer Review</h3>
            {RATING_OPTIONS.map(r => (
              <button
                key={r}
                className={`${styles.ratingFilter} ${minRating === String(r) ? styles.activeFilter : ''}`}
                onClick={() => updateParam('minRating', minRating === String(r) ? '' : String(r))}
              >
                {'★'.repeat(r)}{'☆'.repeat(5 - r)} & Up
              </button>
            ))}
          </div>

          <div className={styles.filterDivider} />

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Price</h3>
            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder="Min ₹"
                value={priceMin}
                onChange={e => setPriceMin(e.target.value)}
                className={styles.priceInput}
                id="price-min"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max ₹"
                value={priceMax}
                onChange={e => setPriceMax(e.target.value)}
                className={styles.priceInput}
                id="price-max"
              />
            </div>
            <button className={styles.applyBtn} onClick={applyPriceFilter}>Go</button>
          </div>

          <div className={styles.filterDivider} />
          <button className={styles.clearBtn} onClick={clearFilters}>Clear all filters</button>
        </aside>

        {/* Products */}
        <div className={styles.productsArea}>
          {loading ? (
            <div className="loading-overlay"><div className="spinner"/></div>
          ) : products.length === 0 ? (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h2>No results found</h2>
              <p>Try adjusting your search or filters</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    className={styles.pageBtn}
                    disabled={page <= 1}
                    onClick={() => updateParam('page', String(page - 1))}
                  >
                    ← Previous
                  </button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`}
                      onClick={() => updateParam('page', String(p))}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    className={styles.pageBtn}
                    disabled={page >= pagination.totalPages}
                    onClick={() => updateParam('page', String(page + 1))}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
