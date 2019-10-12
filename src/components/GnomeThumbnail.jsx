import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

import '../styles/components/GnomeThumbnail.scss';

const GnomeThumbnail = ({ gnome, index, onSelected }) => {
    return (
        <div className="gnome-thumbnail-container">
            <Avatar
                className="gnome-avatar"
                onClick={() => onSelected(index)}
                alt={gnome.name}
                key={`gnome-${index}`}
                src={gnome.thumbnail}
            />
            <p className="gnome-name">{ gnome.name }</p>
        </div>
    );
};

GnomeThumbnail.propTypes = {
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
    }).isRequired
};

export default GnomeThumbnail;