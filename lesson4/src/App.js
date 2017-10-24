import React, { Component } from 'react';
import List from './components/List';
import styled, { injectGlobal } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background: tomato;
  height: 600px;
  width: 100%;
  padding: 60px 0;
  display: flex;
`;

const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const dataItems = [
  {
    name: 'first item',
    price: 12
  },
  {
    name: 'second item',
    price: 123
  }
];

class App extends Component {
  render() {
    return (
      <Wrapper className="App">
        <Content>
          <List data={dataItems} title="Хуй">
            <div someProp="asdasd" />dfsdf
          </List>
        </Content>
      </Wrapper>
    );
  }
}

export default App;
