export function filterProducts(products, minPrice, maxPrice, searchText) {
  let updated = [...products];

  if (minPrice) updated = updated.filter(p => p.price >= Number(minPrice));
  if (maxPrice) updated = updated.filter(p => p.price <= Number(maxPrice));

  if (searchText) {
    updated = updated.filter(p =>
      p.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  return updated;
}