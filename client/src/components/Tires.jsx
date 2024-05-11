import React, { useState } from 'react';

export const Tires = () => {
  const [hoveredWheel, setHoveredWheel] = useState(null);

  const Wheel = ({ onClick, isHovered, wheelNumber }) => (
    <div
      style={{
        width: '40px',
        height: '70px',
        borderRadius: '7px',
        backgroundColor: isHovered ? 'red' : 'black',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setHoveredWheel(wheelNumber)}
      onMouseLeave={() => setHoveredWheel(null)}
      onClick={() => {
        onClick();
      }}
    />
  );

  const Circle = () => (
    <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'grey' }} />
  );

  const Stick = () => (
    <div style={{ width: '180px', height: '10px', backgroundColor: 'grey', alignSelf: 'center' }} />
  );

  const VerticalStick = () => (
    <div style={{ height: '100px', width: '10px', backgroundColor: 'grey', alignSelf: 'center' }} />
  );

  const VerticalStickLarge = () => (
    <div style={{ height: '200px', width: '10px', backgroundColor: 'grey', alignSelf: 'center' }} />
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' , marginBottom: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '-55px' }}>
        <Circle />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px' }}>
        <Wheel onClick={() => console.log('Clicked wheel 1')} isHovered={hoveredWheel === 1} wheelNumber={1} />
        <Stick />
        <Wheel onClick={() => console.log('Clicked wheel 2')} isHovered={hoveredWheel === 2} wheelNumber={2} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '-40px' }}>
        <VerticalStickLarge />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-3px', marginBottom: '-23px' }}>
        <Circle />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px', marginTop: '-30px' }}>
        <Wheel onClick={() => console.log('Clicked wheel 3')} isHovered={hoveredWheel === 3} wheelNumber={3} />
        <Stick />
        <Wheel onClick={() => console.log('Clicked wheel 4')} isHovered={hoveredWheel === 4} wheelNumber={4} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '-40px' }}>
        <VerticalStick />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-3px', marginBottom: '-23px' }}>
        <Circle />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px', marginTop: '-30px' }}>
        <Wheel onClick={() => console.log('Clicked wheel 5')} isHovered={hoveredWheel === 5} wheelNumber={5} />
        <Stick />
        <Wheel onClick={() => console.log('Clicked wheel 6')} isHovered={hoveredWheel === 6} wheelNumber={6} />
      </div>
    </div>
  );
};
