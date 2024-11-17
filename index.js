// // 5 100 10
// // 10 20 30 40 50
// // 3 4 5 6 10
// // 20 30 20 40 30

// var all = 100;
// //可接受的总风险
// let risk = 10;
// var prodList = [10, 20, 30, 40, 50];
// var riskList = [3, 4, 5, 6, 10];
// var limtList = [20, 30, 20, 40, 30];
// var max = 0;
// var obj = {};
// for (let i = 0; i < prodList.length; i++) {
//   //   const risk = riskList[i];
//   for (let j = i; j < prodList.length; j++) {
//     // const limit = limtList[j];
//     const risk1 = riskList[i];
//     const risk2 = riskList[j];
//     const limit1 = limtList[i];
//     const limit2 = limtList[j];
//     const pro1 = prodList[i];
//     const pro2 = prodList[j];
//     var temp = max;
//     if (risk1 + risk2 <= risk) {
//       const limit_1 = Math.min(limit1, all);
//       const limit_2 = Math.min(all - limit_1, limit2);
//       max = Math.max(max, pro1 * limit_1 + limit_2 * pro2);
//       if (max > temp) {
//         obj = { [i]: limit_1, [j]: limit_2 };
//       }

//       const limit_22 = Math.min(limit2, all);
//       const limit_11 = Math.min(all - limit_22, limit1);
//       max = Math.max(max, pro2 * limit_22 + limit_11 * pro1);
//       if (max > temp) {
//         obj = { [i]: limit_11, [j]: limit_22 };
//       }
//     } else {
//       if (risk1 <= risk) {
//         const limit_1 = Math.min(limit1, all);
//         max = Math.max(max, pro1 * limit_1);
//         if (max > temp) {
//           obj = { [i]: limit_1 };
//         }
//       }
//       if (risk2 <= risk) {
//         const limit_2 = Math.min(limit2, all);
//         max = Math.max(max, pro2 * limit_2);
//         if (max > temp) {
//           obj = { [j]: limit_2 };
//         }
//       }
//     }
//   }
// }
// var result = Array(5).fill(0);
// Object.keys(obj).forEach((i) => {
//   result[i] = obj[i];
// });
// // console.log(obj);
// // console.log(result);
// console.log(result.join(" "));
// // 0 30 0 40 0

// // // var list = [1, 0, 1, 0];
// // var list = [1, 1, 1, 1, 1, 1, 1, 0];
// // // var list = [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1];
// // var sum = 0;
// // var count = 0;
// // var init = true;
// // list.push(0);

// // for (let i = 0; i < list.length; i++) {
// //   const val = list[i];
// //   if (val) {
// //     init = false;
// //     if (count == 3) {
// //       sum++;
// //       count = 0;
// //     }
// //     // if(!list[i+1] ||!list[i+2]){
// //     //     sum++;
// //     // }
// //     count++;
// //   } else {
// //     if (init) continue;
// //     sum++;
// //     count = 0;
// //     init = true;
// //   }
// // }
// // console.log(sum);

// // list.forEach((val) => {
// //   if (val) {
// //     init = false;
// //     if (count == 3) {
// //       sum++;
// //       count++;
// //     }
// //     count++;
// //   } else {
// //     if (init) return;
// //     sum++;
// //     count = 0;
// //     init = true;
// //   }
// // });

// tokens  1,2<A>00
const str = "1,2<A>00";
let list = str.split(",");
// console.log(list);
for (let i = 0; i < list.length; i++) {
  const val = list[i];
  const left = (val.match(/</g) || []).length;
  const right = (val.match(/>/g) || []).length;
  if (left !== right) {
    console.log(-1);
    return;
  }
  const res = val.match(/(<([A-Z])>)/g);
  //   res[0];
}

const res = "2<A>00B".match(/(<([A-Z])>)/g);
console.log(res.length, res);
console.log(res[0]);
console.log("A".charCodeAt());
