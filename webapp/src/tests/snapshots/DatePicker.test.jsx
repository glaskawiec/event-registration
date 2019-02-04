import React from 'react';
import renderer from 'react-test-renderer';
import DatePicker from '../../components/DatePicker';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';

test('DatePicker snapshot', () => {
    Moment.locale('en');
    momentLocalizer();

    const props = {
        input: {
            onChange: () => ({})
        },
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