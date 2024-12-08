import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import ForgotPasswordCss from "./ForgotPassword.module.css";
import { resetPassword } from "../../services/actions/data-action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [inputState, setInputState] = useState("");

  const changeInput = (e) => {
    setInputState(e.target.value);
  };

  const handleRecover = async (e) => {
    e.preventDefault();
    dispatch(resetPassword(inputState));
  };

  return (
    <div className={ForgotPasswordCss.container}>
      <div className={ForgotPasswordCss.formBlock}>
        <form className={ForgotPasswordCss.form} onSubmit={handleRecover}>
          <p className={`${ForgotPasswordCss.textCenter} text text_type_main-default`}>Восстановление пароля</p>
          <Input type={"text"} placeholder={"Укажите Email"} value={inputState} onChange={changeInput} />
          <Button htmlType="submit" type="primary" size="medium" extraClass={ForgotPasswordCss.button}>
            Восстановить
          </Button>
        </form>
        <div className={ForgotPasswordCss.textBlock}>
          <p className={`${ForgotPasswordCss.textCenter} text text_type_main-default text_color_inactive`}>
            Вспомнили пароль?
            <Link to={"/login"} className={ForgotPasswordCss.textSpan}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
