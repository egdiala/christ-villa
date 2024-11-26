import { FieldInputProps, FormikConfig, FormikValues, useFormik } from "formik";

interface Option {
  label: string;
  value: string;
}

export const useFormikWrapper = <T extends FormikValues>(props: FormikConfig<T>) => {
  const formik = useFormik(props);

  // get nested value from object
  const getTarget = (object: Record<string, any>, path: string) =>
    path.split(".").reduce((target, step) => target?.[step], object);

  const register = (name: keyof T, overrides: Record<string, any> = {}) => {
    return {
      name,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: overrides?.value ?? getTarget(formik.values, name as string), // travel path when field is nested,
      error: getTarget(formik.touched, name as string)
        ? getTarget(formik.errors, name as string)
        : undefined,
    } as FieldInputProps<any>;
  };

  const registerDropdown = (
    name: keyof T,
    {
      options = [],
      multiple = false,
      key,
    }: { options: Option[]; multiple?: boolean; key?: any }
  ) => {
    const matchingOption = options.find(
      (o) => o.value === formik?.values?.[name]
    );

    const sameOptions = multiple
      ? options?.filter((o: Option) =>
          (formik?.values?.[name] as Option[])?.some(
            (formikValue: any) => o.value === (formikValue.value ?? formikValue)
          )
        )
      : undefined;

    return {
      onSelect: (value: any) => {
        return multiple
          ? formik.setFieldValue(
              name as string,
              value?.map((option: Record<string, any>) => option.value)
            )
          : formik.setFieldValue(name as string, value?.value);
      },
      defaultOption: [matchingOption],
      defaultMultipleOptions: sameOptions,
      error: formik.touched[name] ? (formik.errors?.[name] as string) : "",
      key: matchingOption ? formik.values[name] : key,
      options,
    };
  };

  return { ...formik, register, registerDropdown };
};