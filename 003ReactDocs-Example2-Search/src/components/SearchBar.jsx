export default function SearchBar( { filterText, inStockOnly } ) {
    return (
      <form>
        <input type="text" placeholder="Search..." value={filterText}/>
        <label>
          <input type="checkbox" checked={inStockOnly}/>
          {' '}
          Only show products in stock
        </label>
      </form>
    );
  }