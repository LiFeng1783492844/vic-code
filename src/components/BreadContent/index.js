import React from 'react';
import BreadContext from '../BreadContext/index';
// 封装面包屑
class BreadContent extends React.Component {
  render() {
    return (
      <div>
        <BreadContext.Consumer>{value => value}</BreadContext.Consumer>
        {this.props.children}
      </div>
    );
  }
}

export default BreadContent;
