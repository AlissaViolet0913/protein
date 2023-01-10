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

const AddressEdit = ({
  formValues,
  setFormValues,
  readOnly,
}: {
  formValues:Users2;
  setFormValues:Users3;
  readOnly:boolean;
}) => {
  const router = useRouter();

  // const initialValues = {
  //   postCode: user.postCode,
  //   prefecture: user.prefecture,
  //   city: user.city,
  //   aza: user.aza,
  //   building: user.building,
  // };

  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [addressErrors, setAddressErrors] = useState('');

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
  //       router.reload();
  //     });
  //   }
  // };

  const validate = (values: Users) => {
    const errors = {} as Users;
    const postCodeReg = /^[0-9]{3}-[0-9]{4}$/;
    if (!postCodeReg.test(values.postCode)) {
      errors.postCode = '郵便番号はXXX-XXXXの形式で入力してください';
    }
    return errors;
  };

  // 住所検索機能
  const setAuto = async () => {
    const res = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formValues.postCode}`
    );
    const getAddress = await res.json();
    if (getAddress.results === null) {
      const message = '存在しない郵便番号です';
      setAddressErrors(message);
    } else {
      const pre = getAddress.results[0].address1;
      const city = getAddress.results[0].address2;
      const aza = getAddress.results[0].address3;
      setFormValues({
        ...formValues,
        prefecture: pre,
        city: city,
        aza: aza,
      });
      //   setAddressErrors('');
    }
  };

  return (
    <div className={styles.formGroup}>
      <div className={styles.group}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="prefecture" className={styles.lables}>
              住所1(都道府県)
            </label>
          </div>

          <div className={styles.inputs}>
            <div className={styles.button}>
              <input
                type="text"
                name="postCode"
                className={styles.input}
                value={formValues.postCode}
                placeholder="例:●●●-●●●●"
                onChange={handleChange}
                readOnly={readOnly}
                required
              />
              <button
                className={styles.button2}
                type="button"
                onClick={setAuto}
              >
                住所検索
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.group}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="city" className={styles.lables}>
              住所2(市区町村)
            </label>
          </div>

          <div className={styles.inputs}>
            <input
              type="text"
              name="prefecture"
              id="prefecture"
              placeholder="都道府県"
              value={formValues.prefecture}
              onChange={handleChange}
              className={styles.input}
              readOnly={readOnly}
              required
            />
          </div>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="aza" className={styles.lables}>
              住所3(字丁目)
            </label>
          </div>

          <div className={styles.inputs}>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="市区町村"
              value={formValues.city}
              onChange={handleChange}
              className={styles.input}
              readOnly={readOnly}
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.group}>
        <div className={styles.grid}>
          <label htmlFor="building" className={styles.lables}>
            住所4(建物名)
          </label>

          <div className={styles.inputs}>
            <input
              type="text"
              name="aza"
              id="aza"
              placeholder="字丁目"
              value={formValues.aza}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="building"
              id="building"
              placeholder="建物名"
              value={formValues.building}
              onChange={handleChange}
              className={styles.input}
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddressEdit;
