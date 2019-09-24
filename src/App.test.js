import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { act } from 'react-dom/test-utils';

import App from './App';
import Navigation from './components/navigation/Navigation';
import PublicHomePage from './components/public-home-page/PublicHomePage';
import PlaceholderPage from './components/placeholder-page/PlaceholderPage';
import LogInPage from './components/login-page/LogInPage';
import RegisterPage from './components/register-page/RegisterPage';
import ExplorePage from './components/explore-page/ExplorePage';
import NotFoundPage from './components/404-page/NotFoundPage';

describe ('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <App />
      </MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders 404 page for invalid path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(PublicHomePage)).toHaveLength(0);
    expect(wrapper.find(NotFoundPage)).toHaveLength(1);
  });
  it('renders public home page for default path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(PublicHomePage)).toHaveLength(1);
  });
  it('renders placeholder page for about & cities paths', () => {
    let wrapper = mount(
      <MemoryRouter initialEntries={[ '/about' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(PublicHomePage)).toHaveLength(0);
    expect(wrapper.find(PlaceholderPage)).toHaveLength(1);
    wrapper = mount(
      <MemoryRouter initialEntries={[ '/cities' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(PublicHomePage)).toHaveLength(0);
    expect(wrapper.find(PlaceholderPage)).toHaveLength(1);
  });
  it('renders login page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/login' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(LogInPage)).toHaveLength(1);
  });
  it('renders register page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/register' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(RegisterPage)).toHaveLength(1);
  });
  it('renders explore page only when logged in, else renders login page', () => {
    let wrapper = mount(
      <MemoryRouter initialEntries={[ '/explore' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(ExplorePage)).toHaveLength(0);
    expect(wrapper.find(LogInPage)).toHaveLength(1);
  });
})
