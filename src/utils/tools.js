function copyAttrExcept(source, ...args) {
  let res = {};
  for (const attr in source) {
    if (source.hasOwnProperty(attr) && args.every((ele) => ele !== attr)) {
      res[ attr ] = source[ attr ];
    }
  }
  return res;
}

function zeroArr(length) {
  return [ ...Array(length) ].map(_ => 0);
}


export const tools = {
  copyAttrExcept,
  zeroArr
}