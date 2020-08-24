import React from 'react';
import Block from './Block';

function App() {
  return (
    <div className="App">
      <Block position="left" className="bg-red-300" />
      <Block position="right" className="bg-red-300" />
      <Block position="top" className="bg-blue-300" />
      <Block position="bottom" className="bg-blue-300">
        <span className="font-led text-3xl">20</span>
      </Block>
    </div>
  );
}

export default App;
