// import { point2 } from './point2.mjs';

// export var point2c = (() => {
//   var points = Array.from({ length: 16 }, () => ({ x: 0, y: 0 }));
//   var counter = 0;

//   return (x, y) => {
//     var point = points[counter];

//     point.x = x;
//     point.y = y;

//     counter = (counter + 1) & 0xf;

//     return point;
//   };
// })();