import PropTypes from 'prop-types';

export default function ProductRow({ product }) {

  ProductRow.propTypes = {
    product: PropTypes.object.isRequired,
  };

    const name = product.stocked ? product.name :
      <span style={{ color: 'red' }}>
        {product.name}
      </span>;
  
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }