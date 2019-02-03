import React from 'react';
import renderer from 'react-test-renderer';
import Layout from '../../components/Layout';

test('Layout snapshot', () => {
    const tree = renderer
        .create(
            <Layout>
                <div>
                    Snapshot
                </div>
            </Layout>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});