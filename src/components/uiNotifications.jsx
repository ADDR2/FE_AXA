import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import { uiNotificationsTimer } from '../constants';

export default ({ message, type, onClose }) => (
    <Snackbar
        open
        message={message}
        autoHideDuration={uiNotificationsTimer}
        onClose={() => onClose()}
    />
);