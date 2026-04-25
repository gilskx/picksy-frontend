// FILTER
useEffect(() => {
  let updated = [...products];

  if (minPrice) updated = updated.filter(p => p.price >= Number(minPrice));
  if (maxPrice) updated = updated.filter(p => p.price <= Number(maxPrice));

  if (searchInResults) {
    updated = updated.filter(p =>
      p.name?.toLowerCase().includes(searchInResults.toLowerCase())
    );
  }

  setFilteredProducts(updated);
}, [products, minPrice, maxPrice, searchInResults]);