import React from 'react';
import PropTypes from 'prop-types';
import { camelCase, upperFirst } from 'lodash';

import { gnomeSortableAttributes, gnomeFilterAttributes } from '../constants';
import '../styles/components/Toolbar.scss';

const Toolbar = ({ onFilter, onSort, currentFilter, currentSort }) => {
    return (
        <div className="filters-and-sorts">
            <div className="content-panel-filters">
                filters
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
                            onClick={() => onSort(attribute)}
                        >{ upperFirst(camelCase(attribute)) }</div>
                    ))
                }
            </div>
        </div>
    );
};

Toolbar.propTypes = {
    currentFilter: PropTypes.string.isRequired,
    currentSort: PropTypes.string.isRequired,
    onFilter: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
};

export default Toolbar;