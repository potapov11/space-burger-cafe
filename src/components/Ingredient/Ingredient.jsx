import PropTypes from "prop-types";
import IngredientCss from "./Ingredient.module.css";
import { IngredientType } from "../../utils/types";
import { useDrag } from "react-dnd";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const Ingredient = (props) => {
  const { dataStore, image, name, price, item } = props;

  function count(store, item) {
    let count = 0;

    if (store?.length > 0) {
      store.forEach((itemStore) => {
        if (itemStore._id === item._id) {
          count++;
        }
      });
    }
    return count;
  }

  const quantityNum = count(dataStore, item);

  const [, dragRef] = useDrag({
    type: "ingr",
    item: { item },
    collect: (monitor) => {
      return {
        isDrag: monitor.isDragging(),
      };
    },
  });

  return (
    <>
      <li className={IngredientCss.ingredient} ref={dragRef}>
        {quantityNum > 0 && <Counter count={quantityNum} size="default" extraClass="m-1" />}
        <div>
          <img src={image} alt={name} />
        </div>
        <div className={IngredientCss.textBox}>
          <p>
            <span className="text text_type_digits-default mb-1">{price}</span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
        <p className={`text text_type_main-default ${IngredientCss.bottomText}`}>{name}</p>
      </li>
    </>
  );
};

Ingredient.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  item: IngredientType.isRequired,
};

export default Ingredient;
