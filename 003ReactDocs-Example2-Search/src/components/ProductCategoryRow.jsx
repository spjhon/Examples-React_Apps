import PropTypes from 'prop-types';

export default function  ProductCategoryRow({ category }) {

  ProductCategoryRow.propTypes = {
    category: PropTypes.object.isRequired,
  };

    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }