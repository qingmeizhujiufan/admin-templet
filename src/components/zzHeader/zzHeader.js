import React from 'react';
import './zzHeader.less';

class ZZHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className='header header-fixed navbar'>
        <div className='brand'>
          <a>
            <i></i>
            <span>ADMIN</span>
          </a>
        </div>
      </header>
    );
  }
}

export default ZZHeader;
