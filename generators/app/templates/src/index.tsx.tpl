import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Index = (): JSX.Element => {
  return (
    <p className="it-works">
      It works!
    </p>
  );
};

export default Index;

ReactDOM.render(<Index />, document.getElementById('root'));
