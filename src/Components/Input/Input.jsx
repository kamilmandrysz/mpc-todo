import React from 'react';
import PropTypes from 'prop-types';
import { cnb } from 'cnbuilder';

import styles from './Input.module.scss';

const Input = ({ className, innerRef, name, placeholder, label, isError, feedback, ...rest }) => {
  return (
    <div className={cnb(styles.InputWrapper, className)}>
      {label !== '' && <span className={styles.Input__label}>{label}</span>}
      <input ref={innerRef} className={styles.Input} placeholder={placeholder} {...rest} name={name} />

      {isError && <span className={styles.Input__feedback}>{feedback}</span>}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  isError: PropTypes.bool,
  feedback: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  innerRef: undefined,
  name: '',
  placeholder: '',
  label: '',
  isError: false,
  feedback: '',
};

export default Input;
