import { GetServerSideProps } from 'next';
import styles from './../styles/detail_user.module.css';
import Link from 'next/link';
import React, { SyntheticEvent, useState } from 'react';
import EmailEdit from './emailEdit';
import NameEdit from './nameEdit';
import MiddleNameEdit from './middleNameEdit';
import AddressEdit from './addressEdit';
import TelEdit from './telEdit';
import PasswordEdit from './passwordEdit';
import router, { useRouter } from 'next/router';
import { Users,Users2,Users3,User,Item } from '../types/type';
import { supabase } from '../utils/supabase';

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
// }) => {
//     const cookies = req.cookies;
//     const cookie = cookies.id;
//     const users = await supabase.from("users").select().eq("id",cookie);

//   // const res = await fetch(
//   //   `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/users?id=${cookies.id}`
//   // );
//   // const users = await res.json();

//   const user = users.data![0];
//   return {
//     props: { user },
//   };
// };

export default function UsersElements({ user }: {user:Users}) {
  const [readOnly, setReadOnly] = useState(true);
  const clickHandler = (e: SyntheticEvent) => {
    setReadOnly((prev) => !prev);
    // readOnlyの初期値（true）を反転させる
  };

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    firstNameKana: user.firstNameKana,
    lastNameKana: user.lastNameKana,
    postCode: user.postCode,
    prefecture: user.prefecture,
    city: user.city,
    aza: user.aza,
    building: user.building,
    email: user.email,
    middleName: user.middleName,
    tel: user.tel,
    password: user.password,
    passwordConfirmation: user.passwordConfirmation,
  };

  const initialValues2 = {
    tel: '',
    password: '',
    passwordConfirmation: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues2);
  const [isSubmit, setIsSubmit] = useState(false);


  async function submit(e: SyntheticEvent) {
    e.preventDefault();

    const newErrors = validate(formValues);
    setFormErrors(newErrors);
    setIsSubmit(true);

    if (Object.keys(newErrors).length !== 0) {
      return isSubmit;
    } else {
      await supabase.from("users").update(formValues).eq("id",user.id)
    // fetch(`${process.env.NEXT_PUBLIC_PROTEIN}/api/users/${user.id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formValues),
    .then(() => {
      router.reload();
    });
  }
  }

  const validate = (formValues: Users2) => {
    const errors = {} as Users;

    const passwordReg = /^[0-9a-zA-Z]*$/;
    const telReg =
      /^(0[5-9]0-[0-9]{4}-[0-9]{4}|0[0-9]{3}-[0-9]{2}-[0-9]{4})$/;

    if (formValues.password.length < 8) {
      errors.password =
        'パスワードは８文字以上１６文字以内で設定してください';
    } else if (formValues.password.length > 16) {
      errors.password =
        'パスワードは８文字以上１６文字以内で設定してください';
    } else if (!passwordReg.test(formValues.password)) {
      errors.password = 'パスワードは半角英数字で記載してください';
    } else if (formValues.password !== formValues.passwordConfirmation) {
      errors.passwordConfirmation =
        'パスワードと確認用パスワードが不一致です';
    } else if (!passwordReg.test(formValues.passwordConfirmation)) {
      errors.passwordConfirmation =
        '確認用パスワードは半角英数字で記載してください';
    }

    if (!telReg.test(formValues.tel)) {
      errors.tel =
        '電話番号はXXX-XXXX-XXXXかXXXX-XX-XXXXの形式で入力してください';
    }
    return errors;
  };

  return (
    <>
      <form className={styles.font} onSubmit={submit}>
        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              ID(E-mail) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <EmailEdit
            formValues={formValues}
            setFormValues={setFormValues}
            readOnly={readOnly}
          />
        </div>
        {/* <div>{formErrors?.email}</div> */}
        <hr />

        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              お名前 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <div>
            <div>
              <NameEdit
                formValues={formValues}
                setFormValues={setFormValues}
                readOnly={readOnly}
              />
            </div>
            <hr />
            <div>
              <span>
                （ミドルネーム） &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <MiddleNameEdit
                formValues={formValues}
                setFormValues={setFormValues}
                readOnly={readOnly}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              住所 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <AddressEdit
            formValues={formValues}
            setFormValues={setFormValues}
            readOnly={readOnly}
          />
        </div>
        <hr />
        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              電話番号 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <TelEdit
            formValues={formValues}
            setFormValues={setFormValues}
            readOnly={readOnly}
          />
          <div>{formErrors?.tel}</div>
        </div>
        {/* <div>{formErrors?.tel}</div> */}
        <hr />
        {/* <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              クレジット &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <input
            type="credit"
            name="credit"
            className={styles.input}
            setFormvalues={setFormValues}
            placeholder="例:●●●●-●●●●-●●●●-●●●●（半角数字）"
            required
            {...user.credit}
            readOnly={readOnly}
            value={formValues.credit}
          />
        </div> */}

        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              パスワード &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <PasswordEdit
            formValues={formValues}
            setFormValues={setFormValues}
            readOnly={readOnly}
          />
        </div>
        <div>
          {formErrors?.passwordConfirmation}
          </div>

        <hr />

        <button className={styles.btnB}>
          <a>完了</a>
        </button>
      </form>

      <button onClick={clickHandler} className={styles.btnB_black}>
        <a>編集</a>
      </button>
    </>
  );
}
