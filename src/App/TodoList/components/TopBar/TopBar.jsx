import React, { useState } from 'react';
import { cnb } from 'cnbuilder';

import AddTaskModal from 'App/TodoList/components/TopBar/components/AddTaskModal';
import OptionsDropdown from 'App/TodoList/components/TopBar/components/OptionsDropdown';

import { ReactComponent as AddIcon } from 'Assets/icons/plus.svg';

import styles from './TopBar.module.scss';

const TopBar = () => {
  const [addModalVisibility, setAddModalVisibility] = useState(false);

  const handleAddButtonPress = () => {
    setAddModalVisibility(true);
  };

  return (
    <>
      <div className={cnb('d-flex justify-content-between align-items-center p-2 px-md-4', styles.TopBar)}>
        <button className="button" type="button" onClick={handleAddButtonPress}>
          <AddIcon width={22} height={22} />
        </button>
        <h3>Todo List</h3>
        <button className="button" type="button">
          <OptionsDropdown />
        </button>
      </div>

      <AddTaskModal visibility={addModalVisibility} setVisibility={setAddModalVisibility} />
    </>
  );
};

export default TopBar;
