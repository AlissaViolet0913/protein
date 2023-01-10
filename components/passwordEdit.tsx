import { GetServerSideProps } from 'next';
import styles from '/styles/users.edit.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Users,Users2,Users3,User,Item } from '../types/type';

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
// }) => {
//   const cookies = req.cookies;
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/users?id=${cookies.id}`
//   );
//   const users = await res.json();
//   const user = users[0];
//   return {
//     props: { user },
//   };
// };

const PasswordEdit = ({
  formValues,
  setFormValues,
  readOnly,
}:{
  formValues:Users2;
  setFormValues:Users3;
  readOnly:boolean;
}) => {
  const router = useRouter();

  // const initialValues = {
  //   password: user.password,
  //   passwordConfirmation: user.passwordConfirmation,
  // };

  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const EditHandler = (event: any) => {
  //   event.preventDefault();
  //   const newErrors = validate(formValues);
  //   setFormErrors(newErrors);
  //   setIsSubmit(true);
  //   if (Object.keys(newErrors).length !== 0) {
  //     return isSubmit;
  //   } else {
  //     fetch(`/api/users/${user.id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formValues),
  //     }).then(() => {
  //       router.push('/items/');
  //     });
  //   }
  // };

  const validate = (values: Users) => {
    const errors = {} as Users;

    const passwordReg = /^[0-9a-zA-Z]*$/;

    if (values.password.length < 8) {
      errors.password =
        'パスワードは８文字以上１６文字以内で設定してください';
    } else if (values.password.length > 16) {
      errors.password =
        'パスワードは８文字以上１６文字以内で設定してください';
    } else if (!passwordReg.test(values.password)) {
      errors.password = 'パスワードは半角英数字で記載してください';
    }

    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation =
        'パスワードと確認用パスワードが不一致です';
    } else if (!passwordReg.test(values.passwordConfirmation)) {
      errors.passwordConfirmation =
        '確認用パスワードは半角英数字で記載してください';
    }
    return errors;
  };

  return (
    <div>
      <input
        type="password"
        id="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        className={styles.input}
        placeholder="例:半角英数でご入力ください"
        required
      />
      <div className={styles.passwordDisplay}>

        <div>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formValues.passwordConfirmation}
            onChange={handleChange}
            className={styles.input}
            placeholder="例:もう一度パスワードをご入力ください"
            readOnly={readOnly}
            required
          />
          <div className={styles.passwordConfirmation}>(パスワード確認用)</div>
        </div>
      </div>
    </div>
  );
};
export default PasswordEdit;
