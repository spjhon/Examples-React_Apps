import PropTypes from 'prop-types';
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";

export default function FilterableProductTable({ products }) {

  FilterableProductTable.propTypes = {
    products: PropTypes.object.isRequired,
  };

  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}
