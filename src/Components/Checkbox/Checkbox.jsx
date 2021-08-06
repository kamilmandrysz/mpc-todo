import React from 'react';
import PropTypes from 'prop-types';
import { cnb } from 'cnbuilder';

import { ReactComponent as CheckIcon } from 'Assets/icons/check.svg';

import styles from './Checkbox.module.scss';

const Checkbox = ({ className, defaultChecked, onClick, label, name, ...rest }) => {
  return (
    <div className="d-flex">
      <label className={cnb(styles.Checkbox, className)} htmlFor={name}>
        <input
          type="checkbox"
          checked={defaultChecked}
          className={styles.Checkbox__input}
          name={name}
          {...rest}
          onChange={onClick}
        />
        <button className={cnb(styles.Checkbox__checkbox, 'button')} onClick={onClick} type="button">
          <figure
            className={cnb(styles.Checkbox__check, 'd-inline-flex align-items-center justify-content-center mb-0')}
          >
            <CheckIcon />
          </figure>
        </button>
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.node,
};

Checkbox.defaultProps = {
  className: '',
  defaultChecked: false,
  onClick: undefined,
  name: '',
  label: undefined,
};

export default Checkbox;
