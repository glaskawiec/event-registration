import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from '../../components/TextInput';

test('TextInput snapshot', () => {
    const props = {
        input: {},
        meta: {
            touched: false,
            error: ''
        }
    };
    const tree = renderer
        .create(
            <TextInput {...props} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});