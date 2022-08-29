import React from "react"
import RNumberFormat from "react-number-format"

const NumberFormat = (props) => <RNumberFormat { ...props} />;

NumberFormat.propTypes = { ...RNumberFormat.propTypes }

NumberFormat.defaultProps = {
  allowNegative: true,
  fixedDecimalScale: true,
  displayType: "text",
  prefix: "",
  decimalScale: 2,
  thousandSeparator: ".",
  decimalSeparator: ","
}

export default NumberFormat