import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import AppLayout from "@/layouts/app-layout";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import * as Yup from "yup";

type InputRefs = {
  old_password: TextInput | null;
  new_password: TextInput | null;
  confirm_password: TextInput | null;
};

type Values = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

const ChangePassword = () => {
  const [loader, setLoader] = useState(false);
  const inputRefs = useRef<InputRefs>({
    old_password: null,
    new_password: null,
    confirm_password: null,
  });
  const handleChangePassword = async (values: Values) => {
    // setLoader(true);
    // const res = await createPassword({ email, password: values.new_password });
    // if (res?.status == 200) {
    //   Toast.show("Password created successfully", Toast.SHORT);
    //   router.replace("/auth");
    // }
    // setLoader(false);
  };

  let ValidationSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("Password Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Confirm password does not match")
      .required("Confirm Password Required"),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik<Values>({
      initialValues: {
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      validationSchema: ValidationSchema,
      onSubmit: handleChangePassword,
    });

  return (
    <AppLayout title="Change Password">
      <CustomInput
        ref={(el) => (inputRefs.current["new_password"] = el)}
        placeholder={"Old Password"}
        password
        value={values.old_password}
        onChangeText={handleChange("old_password")}
        onBlur={handleBlur("old_password")}
        error={touched.old_password && errors.old_password}
        autoCapitalize="none"
        onSubmitEditing={() => inputRefs.current["confirm_password"]?.focus()}
        returnKeyType={"next"}
        submitBehavior={"submit"}
      />
      <CustomInput
        ref={(el) => (inputRefs.current["new_password"] = el)}
        placeholder={"New Password"}
        password
        value={values.new_password}
        onChangeText={handleChange("new_password")}
        onBlur={handleBlur("new_password")}
        error={touched.new_password && errors.new_password}
        autoCapitalize="none"
        onSubmitEditing={() => inputRefs.current["confirm_password"]?.focus()}
        returnKeyType={"next"}
        submitBehavior={"submit"}
      />
      <CustomInput
        ref={(el) => (inputRefs.current["confirm_password"] = el)}
        placeholder={"Confirm Password"}
        password
        value={values.confirm_password}
        onChangeText={handleChange("confirm_password")}
        onBlur={handleBlur("confirm_password")}
        error={touched.confirm_password && errors.confirm_password}
        autoCapitalize="none"
        onSubmitEditing={() => handleSubmit()}
        returnKeyType={"done"}
      />
      <CustomButton
        title="Submit"
        className="mt-10"
        loader={loader}
        onPress={handleSubmit}
      />
    </AppLayout>
  );
};

export default ChangePassword;
