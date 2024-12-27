import React from "react";
import FeedListOrderCss from "./FeedListOrderCss.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { OrderFeed } from "../../utils/types";
import { formatDate } from "../../utils/utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// const mockId = 10;

const FeedListOrder: React.FC<OrderFeed> = ({ _id, ingredients, status, name, createdAt, updatedAt, number }): React.JSX.Element => {
  const { mainArray, rollsArray, sauceArray } = useSelector((store) => store.data);
  const concatedArrayIngredients = [...mainArray, ...rollsArray, ...sauceArray];
  const location = useLocation();

  // console.log(_id, "..._id");
  // console.log(ingredients, "...ingredients");

  const quantity = {};

  for (let i = 0; i < ingredients.length; i++) {
    const ingredientId = ingredients[i];
    if (quantity[ingredientId]) {
      quantity[ingredientId] += 1;
    } else {
      quantity[ingredientId] = 1;
    }
  }

  // Шаг 2: Фильтрация и добавление поля quantity
  const targetArrElements = concatedArrayIngredients
    .filter((item) => {
      return ingredients.some((someItem) => item._id === someItem);
    })
    .map((item) => {
      if (item.type === "bun") {
        return {
          ...item,
          quantity: 0,
        };
      }
      return {
        ...item,
        quantity: quantity[item._id] || 0,
      };
    });

  // console.log(targetArrElements);

  // console.log(quantity, "quantity");
  // console.log(ingredients);
  // console.log(targetArrElements, "targetArrElements");

  const totalCost = ingredients.reduce((sum, id) => {
    const ingredient = targetArrElements.find((item) => item._id === id);
    // if (ingredient.type == "bun") {
    //   return ingredient ? sum + ingredient.price * 2 : sum;
    // }
    return ingredient ? sum + ingredient.price : sum;
  }, 0);

  return (
    <Link className={FeedListOrderCss.link} to={`/profile/orders/${_id}`} state={{ background: location }}>
      <li key={_id} className={FeedListOrderCss.Item}>
        <div className={FeedListOrderCss.textDate}>
          <span className={`${FeedListOrderCss.textName} text text_type_main-default`}>#{number}</span>
          <span className="text text_type_main-default text_color_inactive">{formatDate(createdAt)}</span>
        </div>
        <div className={FeedListOrderCss.textName}>
          <p className="text text_type_main-default">{name}</p>
        </div>
        <div className={FeedListOrderCss.ingredients}>
          <ul className={FeedListOrderCss.imgsWrapper}>
            {targetArrElements &&
              targetArrElements.map((item, i) => {
                return (
                  <li key={i} className={FeedListOrderCss.imgWrapper}>
                    <img className={FeedListOrderCss.img} src={item.image} alt={item.name} />
                    {item.quantity > 1 && <span className={`${FeedListOrderCss.imgSpan} text text_type_digits-default`}>{item.quantity}</span>}
                  </li>
                );
              })}
          </ul>
          <div className={FeedListOrderCss.sumWrapper}>
            <CurrencyIcon type="primary" />
            <span className="text text_type_digits-default">{totalCost}</span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default FeedListOrder;
