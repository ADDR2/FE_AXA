import React from 'react';
import { Snackbar } from '@material-ui/core';

import { uiNotificationsTimer } from '../constants';

export default ({ show = false, message, type, onClose }) => (
    <Snackbar
        open={show}
        message={message}
        autoHideDuration={uiNotificationsTimer}
        onClose={() => onClose()}
    />
);