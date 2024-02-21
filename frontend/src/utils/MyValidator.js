export const MyValidator = async (value, field, method) => {
  try {
    method(value, field);
    return {};
  } catch (err) {
    return err;
  }
};
