import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';

import { changeDoneTasksVisibility } from 'Store/todoList/actions';

import { ReactComponent as GearIcon } from 'Assets/icons/cog.svg';

import styles from './OptionsDropdown.module.scss';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    type="button"
    className="button"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </button>
));

const OptionsDropdown = () => {
  const dispatch = useDispatch();
  const { doneTasksVisibility } = useSelector((state) => state.todoList);

  return (
    <Dropdown align="end">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <GearIcon />
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.OptionsDropdown__dropdown}>
        <Dropdown.Item onClick={() => dispatch(changeDoneTasksVisibility())} eventKey="1">
          {doneTasksVisibility ? <span> Hide done tasks </span> : <span> Show done tasks </span>}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

CustomToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default OptionsDropdown;
