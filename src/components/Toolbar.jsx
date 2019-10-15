import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select, TextField } from '@material-ui/core';
import { camelCase, upperFirst } from 'lodash';

import { gnomeSortableAttributes, gnomeFilterAttributes } from '../constants';
import '../styles/components/Toolbar.scss';

const Toolbar = ({ onFilter, onSort, currentFilter, currentSort }) => {
    return (
        <div className="filters-and-sorts">
            <div className="content-panel-filters">
                <p className="filter-label">Filter by: </p>
                <Select
                    className="content-panel-dropdown"
                    value={currentFilter.filter}
                    onChange={({ target: { value } }) => onFilter({ filter: value })}
                >
                    {
                        gnomeFilterAttributes.map((attribute, index) => (
                            <MenuItem
                                key={`filter-option-${index}`}
                                value={attribute}
                            >{ upperFirst(camelCase(attribute)) }</MenuItem>
                        ))
                    }
                </Select>
                <TextField
                    label="Type what you're looking"
                    className="filter-text"
                    type="tex"
                    onChange={({ target: { value } }) => onFilter({ value })}
                />
            </div>
            <div className="content-panel-sorts">
                {
                    gnomeSortableAttributes.map((attribute, index) => (
                        <div
                            key={`sort-option-${index}`}
                            className={`
                                content-panel-sort-option
                                ${currentSort === attribute ? 'selected-sort' : ''}
                            `}
                            onClick={() => onSort(
                                currentSort === attribute ? '' : attribute
                            )}
                        >{ upperFirst(camelCase(attribute)) }</div>
                    ))
                }
            </div>
        </div>
    );
};

Toolbar.propTypes = {
    currentFilter: PropTypes.shape({
        filter: PropTypes.string,
        value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
    }),
    currentSort: PropTypes.string.isRequired,
    onFilter: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
};

export default Toolbar;