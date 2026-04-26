export function filterProducts(products: any[], minPrice: any, maxPrice: any, searchInResults: any) {
  let updated = [...products];

  if (minPrice) {
    updated = updated.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    updated = updated.filter(p => p.price <= Number(maxPrice));
  }

  if (searchInResults) {
    updated = updated.filter(p =>
      p.name.toLowerCase().includes(searchInResults.toLowerCase())
    );
  }

  return updated;
}	