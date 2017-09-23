function copyAttrExcept(source, ...args) {
  let res = {};
  for (const attr in source) {
    if (source.hasOwnProperty(attr) && args.every((ele) => ele !== attr)) {
      res[ attr ] = source[ attr ];
    }
  }
  return res;
}

function copyAttr(target, source, cover) {
  for (const attr in source) {
    if (source.hasOwnProperty(attr)) {
      if (!target.hasOwnProperty(attr)) {
        target[ attr ] = source[ attr ];
      } else if (cover) {
        target[ attr ] = source[ attr ];
      }
    }
  }
  return target;
}

function zeroArr(length) {
  return [ ...Array(length) ].map(_ => 0);
}

function generalKey() {
  let i = 1;
  if(i > 1000){
    i = 1;
  }
  return Date.now().toString() + i;
}

export const tools = {
  copyAttrExcept,
  zeroArr,
  copyAttr,
  generalKey
}