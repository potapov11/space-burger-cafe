import React from "react";
import OrderModalCss from "./OrderModal.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderInfo = () => {
  const { orderId } = useParams();
  const { mainArray, rollsArray, sauceArray } = useSelector((store) => store.data);
  const concatedArrayIngredients = [...mainArray, ...rollsArray, ...sauceArray];
  const arrayAllOrdersSocket = useSelector((store) => store.feedReducer.orders.orders);
  const selectedOrder = arrayAllOrdersSocket.find((socketItem) => socketItem._id == orderId);
  const ingredients = selectedOrder.ingredients;

  console.log(orderId, "..id.selectedOrder...");

  console.log(arrayAllOrdersSocket, "...arrayAllOrdersSocket...");

  console.log(selectedOrder, "...selectedOrder...");

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

  const totalCost = ingredients.reduce((sum, id) => {
    const ingredient = targetArrElements.find((item) => item._id === id);
    // if (ingredient.type == "bun") {
    //   return ingredient ? sum + ingredient.price * 2 : sum;
    // }
    return ingredient ? sum + ingredient.price : sum;
  }, 0);

  console.log(targetArrElements, "...targetArrElements...OrderInfo...");

  return (
    <div className={OrderModalCss.modalWrapper}>
      <p className={`${OrderModalCss.textCenter} text text_type_digits-default`}>#{selectedOrder.number}</p>
      <p className="text text_type_main-medium">{selectedOrder.name}</p>
      <p className={`${OrderModalCss.textStatus} text text_type_main-default`}>{selectedOrder.status}</p>
      <div className={OrderModalCss.wrapper}>
        <p className="text text_type_main-default">Состав :</p>
        <ul className={OrderModalCss.list}>
          {targetArrElements?.length > 0 &&
            targetArrElements.map((item) => {
              return (
                <li className={OrderModalCss.item}>
                  <div className={OrderModalCss.imgWrapper}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <p className="text text_type_main-default">{item.name}</p>
                  <div className={OrderModalCss.priceWrapper}>
                    {item.type === "bun" ? <span className="text text_type_digits-default">2</span> : <span className="text text_type_digits-default">{item.quantity}</span>}
                    <span>Х</span>
                    <span className="text text_type_digits-default">{item.price}</span>
                    <span>
                      <CurrencyIcon type="primary" />
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div className={OrderModalCss.bottomWrapper}>
        <span className={`text text_type_main-default`}>{formatDate(selectedOrder.createdAt)}</span>
        <div className={OrderModalCss.priceWrapper}>
          <CurrencyIcon type="primary" />
          <span className="text text_type_digits-default">{totalCost}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
