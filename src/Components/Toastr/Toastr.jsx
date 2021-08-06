import React from 'react';
import ReduxToastr from 'react-redux-toastr';

import { TOASTR_OPTIONS } from 'config';

const Toastr = () => <ReduxToastr {...TOASTR_OPTIONS} />;

export default Toastr;
