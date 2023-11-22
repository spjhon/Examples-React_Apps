import PropTypes from "prop-types";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import { useState } from 'react';

export default function FilterableProductTable({ products }) {
  //Despues de seguir los pasos de la guia de los react docs para definir en donde vive el state, se llega a la conclusion que el state
  //es cambiado desde SearchBar en donde tambien esta el checkbox

  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  FilterableProductTable.propTypes = {
    products: PropTypes.object.isRequired,
  };

  return (
    <div>
      <SearchBar 
      filterText={filterText} 
      inStockOnly={inStockOnly} 
      />
      <ProductTable
        filterText={filterText}
        inStockOnly={inStockOnly}
        products={products}
      />
    </div>
  );
}
