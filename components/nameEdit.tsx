import { GetServerSideProps } from 'next';
import styles from '/styles/users.edit.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import{ Users2,Users3 } from '../types/type';

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

const NameEdit = ({ formValues, setFormValues, readOnly }:{
  formValues:Users2;
  setFormValues:Users3;
  readOnly:boolean;
}) => {
  const router = useRouter();

  // const initialValues = {
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   firstNameKana: user.firstNameKana,
  //   lastNameKana: user.lastNameKana,
  // };

  // const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const EditHandler = (event: any) => {
  //   event.preventDefault();
  //   fetch(`/api/users/${user.id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formValues),
  //   }).then(() => {
  //     router.push('/items/');
  //   });
  // };

  return (
    <>
      <div className={styles.formGroup}>
        <div>
          <input
            type="text"
            name="firstName"
            className={styles.input}
            placeholder="例:姓"
            value={formValues.firstName}
            onChange={handleChange}
            required
            readOnly={readOnly}
          />
          <br />
          <input
            type="text"
            name="lastName"
            className={styles.input}
            placeholder="例:名"
            value={formValues.lastName}
            onChange={handleChange}
            readOnly={readOnly}
            required
          />
        </div>
        <br />
        {/* <p>{formErrors?.name}</p> */}
        <div>
          <div>
            <input
              type="text"
              name="firstNameKana"
              className={styles.input}
              placeholder="例:ふりがな（姓）"
              value={formValues.firstNameKana}
              onChange={handleChange}
              readOnly={readOnly}
              required
            />
            <br />
            <span>
              <input
                type="text"
                name="lastNameKana"
                className={styles.input}
                placeholder="例:ふりがな（名）"
                value={formValues.lastNameKana}
                onChange={handleChange}
                readOnly={readOnly}
                required
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default NameEdit;
