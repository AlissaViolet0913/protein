import { GetServerSideProps } from 'next';
import styles from '/styles/users.edit.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import{ User,Users2,Users3 } from '../types/type';

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

const TelEdit = ({ formValues, setFormValues, readOnly }: {
  formValues:Users2;
  setFormValues:Users3;
  readOnly:boolean;
}) => {
  const router = useRouter();

  // const initialValues = {
  //   tel: user.tel,
  // };

  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const validate = (values: User) => {
    const errors = {} as User;
    const telReg =
      /^(0[5-9]0-[0-9]{4}-[0-9]{4}|0[0-9]{3}-[0-9]{2}-[0-9]{4})$/;
    if (!telReg.test(values.tel)) {
      errors.tel =
        '電話番号はXXX-XXXX-XXXXかXXXX-XX-XXXXの形式で入力してください';
    }
    return errors;
  };

  return (
    <div>
      <input
        type="tel"
        name="tel"
        className={styles.input}
        value={formValues.tel}
        placeholder="例:●●●-●●●●-●●●●（半角数字）"
        onChange={handleChange}
        required
      />
    </div>
  );
};
export default TelEdit;
