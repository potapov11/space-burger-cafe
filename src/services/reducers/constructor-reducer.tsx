import { ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT, CLEAR_CONSRUCTOR } from "../../utils/vars";

import { ItemConstructor } from "../../utils/types";

// Тип для состояния конструктора
interface ConstructorState {
  constructorElems: {
    bunItems: ItemConstructor[];
    ingredients: ItemConstructor[];
  };
}

// Типы действий
interface AddIngredientAction {
  type: typeof ADD_INGREDIENT;
  payload: ItemConstructor[];
}

interface RemoveIngredientAction {
  type: typeof REMOVE_INGREDIENT;
  payload: [string, number];
}

interface MoveIngredientAction {
  type: typeof MOVE_INGREDIENT;
  payload: {
    fromIndex: number;
    toIndex: number;
  };
}

interface ClearConstructorAction {
  type: typeof CLEAR_CONSRUCTOR;
}

type ConstructorAction = AddIngredientAction | RemoveIngredientAction | MoveIngredientAction | ClearConstructorAction;

// Начальное состояние
const initialState: ConstructorState = {
  constructorElems: {
    bunItems: [],
    ingredients: [],
  },
};

// Редюсер
const constructorReducer = (state = initialState, action: ConstructorAction): ConstructorState => {
  const newIngredient = action.payload;

  const stateIngredients = state.constructorElems.ingredients;

  switch (action.type) {
    case MOVE_INGREDIENT: {
      const { fromIndex, toIndex } = newIngredient;

      if (fromIndex === toIndex) {
        return state;
      }

      const updatedIngredients = [...stateIngredients];
      const [movedIngredient] = updatedIngredients.splice(fromIndex, 1);
      updatedIngredients.splice(toIndex, 0, movedIngredient);

      return {
        ...state,
        constructorElems: {
          ...state.constructorElems,
          ingredients: updatedIngredients,
        },
      };
    }

    case ADD_INGREDIENT: {
      const newIngredients = newIngredient;

      if (newIngredients?.[0]?.type === "bun") {
        return {
          ...state,
          constructorElems: {
            ...state.constructorElems,
            bunItems: newIngredients,
          },
        };
      } else {
        if (!newIngredients) {
          return state;
        }
        return {
          ...state,
          constructorElems: {
            ...state.constructorElems,
            ingredients: [...stateIngredients, ...newIngredients],
          },
        };
      }
    }

    case REMOVE_INGREDIENT: {
      const [id, index] = action.payload;
      const filteredArrIngredient = stateIngredients.filter((item, i) => !(i === index && item._id === id));

      return {
        ...state,
        constructorElems: {
          ...state.constructorElems,
          ingredients: filteredArrIngredient,
        },
      };
    }

    case CLEAR_CONSRUCTOR: {
      return {
        ...state,
        constructorElems: {
          bunItems: [],
          ingredients: [],
        },
      };
    }

    default:
      return state;
  }
};

export default constructorReducer;
