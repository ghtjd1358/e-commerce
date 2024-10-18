import style from "./register.module.scss";
import { RegisterForm } from "./components/RegisterForm";

export const RegisterPage: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.container__register}>
        <h1 className={style.container__register__title}>이커머스</h1>
        <RegisterForm />
      </div>
    </div>
  );
};
