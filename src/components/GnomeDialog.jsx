import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import {
    Slide,
    Dialog,
    Avatar,
    AppBar,
    Toolbar,
    IconButton,
    Typography
} from '@material-ui/core';
import { pick, camelCase, upperFirst } from 'lodash';

import '../styles/components/GnomeDialog.scss';
  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const complexInfoRows = (friends = [], professions = []) => {
    const result = [];

    for(let index = 0; index < Math.max(friends.length, professions.length); index++) {
        result.push(
            <tr key={`complex-info-row-${index}`}>
                <td>{ friends[index] || '' }</td>
                <td>{ professions[index] || '' }</td>
            </tr>
        );
    }

    return result;
};

const GnomeDialog = ({ gnome, show, onClose }) => {
    const simpleInfoEntries = Object.entries(pick(gnome, ['age', 'hair_color', 'height', 'weight']));
    const friendsAndProfessions = pick(gnome, ['friends', 'professions']);
    const complexInfoKeys = Object.keys(friendsAndProfessions);
    const [ friends, professions ] = Object.values(friendsAndProfessions);

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
            <div className="gnome-avatar-container">
                <Avatar
                    className="gnome-dialog-avatar"
                    alt={gnome.name}
                    src={gnome.thumbnail}
                />
            </div>
            <div className="gnome-dialog-content">
                <div className="gnome-content-info">
                    <h3 className="info-title">Personal Info</h3>
                    {
                        simpleInfoEntries.map(([ key, value ], index) => (
                            <div key={`gnome-info-${index}`} className="gnome-info">
                                <h4 className="info-key">{ upperFirst(camelCase(key)) }:</h4>
                                <p className="info-value">{ value }</p>
                            </div>
                        ))
                    }
                </div>
                <div className="gnome-content-relations">
                    <h3 className="info-title">Relations</h3>
                    <table className="gnome-content-table">
                        <thead>
                            <tr>
                                {
                                    complexInfoKeys.map((key, index) => (
                                        <th key={`complex-info-${index}`}>{ upperFirst(camelCase(key)) }</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            { complexInfoRows(friends, professions) }
                        </tbody>
                    </table>
                </div>
            </div>
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