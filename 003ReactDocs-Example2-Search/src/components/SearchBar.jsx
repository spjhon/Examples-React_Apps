import PropTypes from "prop-types";

export default function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  SearchBar.propTypes = {
    products: PropTypes.object.isRequired,
    filterText: PropTypes.string.isRequired,
    inStockOnly: PropTypes.bool.isRequired,

    onFilterTextChange: PropTypes.func.isRequired,
    onInStockOnlyChange: PropTypes.func.isRequired,
  };

  //Aqui se muestra como el set se forma al traer el setState desde arriba por medio de props

  //En este paso, resulta que si se coloca un input o cualquier cosa que cambie de estado por el usuario ocualquier otra cosa,
  //hay que avisarle al responsable de controlar ese estado para que actuelice el state, esto es por diseño de react para que no
  //hayan cambios de states sin rastrear.

  //El onChange es parte de la tabla de eventos HTML, segun veo se aplica los atributos de eventos html directamente en el JSX.

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}
