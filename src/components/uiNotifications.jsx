import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

import { uiNotificationsTimer } from '../constants';
import '../styles/components/UINotifications.scss';

// TODO: Handle other type of messages (not only errors)
export default ({ show = false, message, type, onClose }) => (
    <Snackbar
        open={show}
        autoHideDuration={uiNotificationsTimer}
        className="snackbar-error-type"
        message={
            <div className="snackbar-message-container">
              <ErrorIcon />
              <p className="snackbar-message">{message}</p>
            </div>
        }
        action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={() => onClose()}>
                <CloseIcon />
            </IconButton>
        ]}
        onClose={() => onClose()}
    />
);