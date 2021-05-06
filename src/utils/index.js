/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-loop-func */
/* eslint-disable vars-on-top */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/*
 * @Author: your name
 * @Date: 2020-12-08 15:48:05
 * @LastEditTime: 2021-05-06 16:41:09
 * @LastEditors: yinzhegang
 * @Description: In User Settings Edit
 * @FilePath: /yzg-calendar/src/utils/index.js
 */

const rankWidth = function (arr) {
  const len = arr.length;
  for (let l = 0; l < len; l++) {
    for (let li = 0; li < arr[l].length; li++) {
      if (l === len - 1) {
        arr[l][li].width = 1;
      }
      for (let nl = l; nl < len - 1; nl++) {
        let bre = false;

        for (let nLi = 0; nLi < arr[nl + 1].length; nLi++) {
          // console.log(88,arr[l][li], arr[nl+1][nLi])

          if (levelOverAtoB(arr[l][li], arr[nl + 1][nLi])) {
            arr[l][li].width = nl - l + 1;
            bre = true;
            break;
          }
        }
        if (bre) {
          break;
        } else {
          arr[l][li].width = len - l;
        }
      }
    }
  }
  return arr;
};
var levelOverAtoB = function (a, b) {
  //  true 为相交  false 不相交
  return compareTimeByHM(a.end, b.start) > 0;
};

var compareTimeByHM = function (a, b) {
  a = a.split(':').map((i) => Number(i));
  b = b.split(':').map((i) => Number(i));
  return a[0] > b[0] ? 1 : (
    a[0] === b[0] ? (
      a[1] - b[1]
    )
      : -1
  );
};

const ChannelPlace = function (A, B) { // 判断A和B是否为同一通道
  return compareTimeByHM(A.end, B.start) <= 0;
};
// dayConstructor(test)
// console.log(99,dayConstructor(test))
export function dayConstructor(arr) {
  arr.sort((A, B) => compareTimeByHM(A.start, B.start));
  const sortArrr = [[]];
  for (var d = 0; d < arr.length; d++) {
    const lnum = sortArrr.length; // 当前通道数

    for (let l = 0; l < lnum; l++) { // 循环每个通道
      const isChannel = !sortArrr[l].some((li) => // 循环通道内元素
      // console.log(ChannelPlace(li,arr[d]))
        !ChannelPlace(li, arr[d]));
      // console.log({l,d},isChannel)
      if (isChannel) {
        sortArrr[l].push(arr[d]);
        break;
      }

      if ((lnum === l + 1) && !isChannel) {
        sortArrr[lnum] = [arr[d]]; // 如果没有放置通道 新建通道
      }
    }
  }

  return rankWidth(sortArrr);
}

export function divideLength(len, cut) {
  if (typeof len === 'string') {
    if (len.substr(-1) === '%') {
      return `${Number(len.split('%')[0]) / cut}%`;
    }
    if (len.substr(-2) === 'px') {
      return `${Number(len.split('px')[0]) / cut}px`;
    }
  }
  if (typeof len === 'number') {
    return `${len / cut}px`;
  }
}
export function countLength(f, a, b) {
  let numa = a;
  let numb = b;
  let d = 0;
  if (typeof a === 'string') {
    if (a.substr(-1) === '%') {
      numa = Number(a.split('%')[0]);
      numb = typeof b === 'number' ? b : Number(b.split('%')[0]);
      d = '%';
    }
    if (a.substr(-2) === 'px') {
      numa = Number(a.split('px')[0]);
      numb = typeof b === 'number' ? b : Number(b.split('px')[0]);
      d = 'px';
    }
  }
  if (typeof a === 'number') {
    numa = a;
    numb = b;
    d = 0;
  }
  switch (f) {
    case '+':
      return (numa + numb) + d;
    case '-':
      return (numa - numb) + d;
    case '*':
      return (numa * b) + d;
    case '/':
      return (numa / b) + d;
    default:
      return null;
  }
}
