import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";
import PropTypes from 'prop-types';

export default function ProductTable({ products, filterText, inStockOnly }) {

  ProductTable.propTypes = {
    products: PropTypes.object.isRequired,
    filterText: PropTypes.string.isRequired,
    inStockOnly: PropTypes.bool.isRequired,

  };

  const rows = [];
  let lastCategory = null;

console.log(products)

  //Este forEach es para que siempre recorra la lista sin importar su dimencion.
  //El if se pregunta que si la categoria es la misma que en la instancia anterior y si si lo es pues omite y manda un ProductRow
  //a la lista, pero si por el contrario es diferente pues manda a la lista un nuevo ProductCategoryRow
  //al final lo que hace es mandar toda la lista al tbody
  
  //Viejo forEach, el que solo renderizaba static content

  /*
  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

*/

  // Este de aca abajo es el nuevo en donde interfiere los states
  // Lo unico que se esta haciendo es mandar los props del state que se configuro mas arriba de acuerdo a los requerimientos de
  //los states.

  /*En este forEach:

  1. Se recibe el array product
  2. El primer if es para preguntar si el texto filtrado es igual al texto en cada iteracion del forEach, utilizando un truco con lo que retorna el indexOf cuando se ejecuta en una palabra.
  -false, (osea en caso de que se retorne otro numero que no sea -1, en el caso de un state("") vacio se retorna 0) 
  -true,
  3. El segundo if es para preguntar si el prop inStockOnly (cuyo estado inicial es false) 
*/
  products.forEach((product) => {

    //Este primer if lo que hace es mirar si el texto filtrado es igual al texto del nombre el producto.

    // el indexof marca -1 si la palabra no esta.

    // Con este for each lo que se esta haciendo es preguntar primero si el state del filtro es igual o no, y luego el state del stock
    //entonces si hay algo en el searchbox, pues se manda a renderizar solo ese producto, de lo contrario no.
    //Lo curiosos es que en este codigo al estar vacio, el resultado es 0 mas no -1
    //OJO, cuando se aplica el indexOf en una palabra mas no un array DEVUELVE 0.
    console.log(product.name.toLowerCase().indexOf ( filterText.toLowerCase() ))

    if (product.name.toLowerCase().indexOf ( filterText.toLowerCase() ) === -1) {
      return;
    }

    //Filtro por stock es que primero mira el propr para ver si el usuario selecciono el soloStock o no y luego transforma
    //lo que venga en stocked para asi saber cuando utilizar el return. solamente si ambos lados son true, se omite el producto
    //de renderizarlo.
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }


    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );

    lastCategory = product.category;
  });

//Con todo este codigo se tiene en cuenta cuando el usuario selecciona tanto el filtro como
//si mostrar o no lo que esta en stock.
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

