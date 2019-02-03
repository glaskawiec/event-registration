import React from 'react';
import renderer from 'react-test-renderer';
import ValidationBadge from '../../components/ValidationBadge';

test('ValidationBadge snapshot', () => {
    const props = {
        touched: false,
        error: ''
    };
    const tree = renderer
        .create(
            <ValidationBadge {...props} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});