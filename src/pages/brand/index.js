import React from 'react';
import BrandRecognitionComponent from './components/BrandRecognitionComponent';
import BreadContent from '../../components/BreadContent/index';

const BrandRecognition = props => {
  // console.log('BrandRecognition', props.location);

  return (
    <BreadContent>
      <BrandRecognitionComponent />
    </BreadContent>
  );
};

export default BrandRecognition;
