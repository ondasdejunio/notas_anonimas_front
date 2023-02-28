import {
  Grid,
  GridItem,
  FormLabel,
  FormControl,
  Input,
  Select,
  Button,
  Flex,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Formik, Form as FormikForm } from "formik";

const Form = (props) => {
  const {
    fields,
    validationSchema,
    initialValues,
    onSubmit,
    actions,
    styles,
    onChange,
  } = props;

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  const handleClear = (resetForm) => {
    resetForm();
  };

  return (
    <Box width="100%">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched, resetForm }) => (
          <FormikForm autoComplete="off">
            <Grid
              direction="column"
              gap="10px"
              templateColumns="repeat(6, 1fr)"
            >
              {fields.map((input) => {
                const {
                  id,
                  label,
                  type,
                  placeholder,
                  style,
                  disabled,
                  grid,
                  subtype,
                  options,
                  required,
                } = input;
                const isFieldInvalid = errors[id] && touched[id];
                const componentProps = {
                  name: id,
                  onChange: (e) => {
                    handleChange(e);
                    if (onChange) {
                      onChange({ ...values, [id]: e.target.value });
                    }
                  },
                  onBlur: handleBlur,
                  value: values[id],
                  disabled,
                  borderColor: isFieldInvalid ? "red.200" : "gray.400",
                  _hover: {
                    borderColor: isFieldInvalid ? "red.100" : "primary.600",
                  },
                  focusBorderColor: isFieldInvalid ? "red.100" : "primary.600",
                };
                let component;

                switch (type) {
                  case "text":
                    component = (
                      <Input
                        type={subtype || "text"}
                        placeholder={placeholder}
                        {...componentProps}
                      />
                    );
                    break;
                  case "select":
                    component = (
                      <Select width="100%" {...componentProps}>
                        <option
                          style={{ backgroundColor: "#E9EEF3" }}
                          value=""
                          hidden
                        >
                          {placeholder}
                        </option>
                        {options.map(({ id, name }) => (
                          <option
                            style={{ backgroundColor: "#E9EEF3" }}
                            key={id}
                            value={id}
                          >
                            {name}
                          </option>
                        ))}
                      </Select>
                    );
                    break;
                  case "date":
                    component = (
                      <Input
                        width="100%"
                        type="date"
                        sx={{
                          "::-webkit-calendar-picker-indicator": {
                            filter:
                              "invert(27%) sepia(17%) saturate(1822%) hue-rotate(174deg) brightness(89%) contrast(92%)",
                          },
                        }}
                        {...componentProps}
                      />
                    );
                    break;
                  default:
                    break;
                }

                return (
                  <GridItem
                    key={id}
                    colSpan={{
                      base: grid?.base || 6,
                      sm: grid?.sm || 6,
                      md: grid?.md || 6,
                      lg: grid?.lg || 6,
                    }}
                    direction="column"
                    sx={{ ...(style || {}) }}
                  >
                    <FormControl isRequired={required}>
                      <FormLabel
                        sx={{
                          color: isFieldInvalid ? "red.100" : "gray.200",
                          fontWeight: "500",
                          whiteSpace: "nowrap",
                          marginBottom: "5px",
                          _focus: {
                            color: isFieldInvalid ? "red.50" : "secondary.100",
                          },
                        }}
                      >
                        {label}
                      </FormLabel>
                      {component}
                      {isFieldInvalid && (
                        <FormHelperText
                          sx={{
                            marginTop: "3px",
                            color: "red.100",
                            fontSize: "12px",
                          }}
                        >
                          {errors[id]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </GridItem>
                );
              })}
            </Grid>
            <Flex
              direction={styles?.direction || "row"}
              sx={{
                marginTop: "15px",
                gap: "10px",
                width: "100%",
                justifyContent: "end",
                ...styles,
              }}
            >
              {actions.map(
                ({ id, name, variant, styles, disabled, onClick }) => (
                  <Button
                    key={id}
                    variant={variant || "primary"}
                    type={id === "submit" ? id : "button"}
                    disabled={disabled}
                    onClick={
                      id === "clear"
                        ? () => handleClear(resetForm)
                        : () => onClick && onClick()
                    }
                    sx={styles}
                  >
                    {name}
                  </Button>
                )
              )}
            </Flex>
          </FormikForm>
        )}
      </Formik>
    </Box>
  );
};

Form.propTypes = {
  fields: PropTypes.array,
  validationSchema: PropTypes.object,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  styles: PropTypes.object,
  actions: PropTypes.array,
  onChange: PropTypes.func,
};

Form.defaultProps = {
  fields: [],
  validationSchema: {},
  initialValues: {},
  onSubmit: undefined,
  styles: {},
  actions: [],
  onChange: undefined,
};

export default Form;
