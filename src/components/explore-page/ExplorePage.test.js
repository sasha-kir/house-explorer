import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import nock from 'nock';
import waitUntil from 'async-wait-until';
import { HelmetProvider } from 'react-helmet-async';
import { act } from 'react-dom/test-utils';

import ExplorePage from './ExplorePage';

describe ('ExplorePage', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <HelmetProvider>
            <ExplorePage />
        </HelmetProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    // it("gets user's IP when initialising", async (done) => {
    //     const wrapper = mount(shallow(
    //         <HelmetProvider>
    //             <ExplorePage />
    //         </HelmetProvider>).get(0)); //{disableLifecycleMethods: true});

    //     nock('http://ip-api.com')
    //         //.log(console.log)
    //         .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    //         .persist()
    //         .get("/json")
    //         .reply(200, { 
    //             json: () => {
    //                         return Promise.resolve({
    //                                 lat: 56,
    //                                 lon: 37,
    //                                 query: '127.0.0.1'});
    //             }
    //         });
        
    //     await act(async() => {
    //         await waitUntil(() => wrapper.state('mapCoords') !== [0, 0]);
    //         console.log(wrapper.debug())
    //         //expect(wrapper.state('mapCoords')).toBe([56, 37]);
    //         done();
    //     });
        
    // });
});