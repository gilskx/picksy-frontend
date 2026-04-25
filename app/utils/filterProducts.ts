export function filterProducts(products: any[], filters: any) {
  let updated = [...products];

  if (filters.minPrice) {
    updated = updated.filter(p => p.price >= Number(filters.minPrice));
  }

  if (filters.maxPrice) {
    updated = updated.filter(p => p.price <= Number(filters.maxPrice));
  }

  if (filters.searchInResults) {
    updated = updated.filter(p =>
      p.name?.toLowerCase().includes(filters.searchInResults.toLowerCase())
    );
  }

  return updated;
}