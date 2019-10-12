import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import {
    Slide,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography
} from '@material-ui/core';

import '../styles/components/GnomeDialog.scss';
  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GnomeDialog = ({ gnome, show, onClose }) => {
    return (
        <Dialog
            fullScreen
            open={show}
            onClose={() => onClose()}
            TransitionComponent={Transition}
            className="gnome-dialog-container"
        >
            <AppBar className="gnome-dialog-app-bar">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => onClose()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className="gnome-dialog-title">
                        { gnome.name }
                    </Typography>
                </Toolbar>
            </AppBar>
        </Dialog>
    );
};

GnomeDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    gnome: PropTypes.shape({
        name: PropTypes.string,
        age: PropTypes.number,
        friends: PropTypes.arrayOf(PropTypes.string),
        hair_color: PropTypes.string,
        height: PropTypes.number,
        id: PropTypes.number,
        professions: PropTypes.arrayOf(PropTypes.string),
        thumbnail: PropTypes.string,
        weight: PropTypes.number
    })
};

export default GnomeDialog;