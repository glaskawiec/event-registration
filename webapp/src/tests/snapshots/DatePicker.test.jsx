import React from 'react';
import renderer from 'react-test-renderer';
import DatePicker from '../../components/DatePicker';

test('DatePicker snapshot', () => {
    const props = {
        input: {},
        meta: {
            touched: false,
            error: ''
        }
    };
    const tree = renderer
        .create(
            <DatePicker {...props} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});