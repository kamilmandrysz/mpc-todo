import React from 'react';
import PropTypes from 'prop-types';
import { cnb } from 'cnbuilder';
import { Spinner } from 'react-bootstrap';

import styles from './Button.module.scss';

const Button = ({ className, type, label, buttonType, isSubmitting, isDisabled, onClick, ...rest }) => {
  return (
    <button
      className={cnb(
        className,
        styles.Button,
        buttonType && styles[`Button__${buttonType}`],
        isDisabled && styles[`Button__isDisabled__${buttonType}`],
      )}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      {...rest}
    >
      {isSubmitting ? <Spinner className={styles.Button__loader} animation="border" /> : label}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  buttonType: PropTypes.oneOf(['primary', 'secondary']),
  isSubmitting: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  buttonType: 'primary',
  isSubmitting: false,
  isDisabled: false,
  onClick: undefined,
};

export default Button;
