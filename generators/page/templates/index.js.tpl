import React from 'react';
import ReactDOM from 'react-dom';

const <%= pageName %>Page = () => {
  return (
    <>
      It works!
    </>
  );
};

export default <%= pageName %>Page

ReactDOM.render(<<%= pageName %>Page />, document.getElementById('<%= entryPoint %>'));
