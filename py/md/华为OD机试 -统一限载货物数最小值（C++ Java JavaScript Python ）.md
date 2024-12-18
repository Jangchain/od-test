#### 题目描述

火车站附近的货物中转站负责将到站货物运往仓库，小明在中转站负责调度2K辆中转车（K辆干货中转车，K辆湿货中转车）。

货物由不同供货商从各地发来，各地的货物是依次进站，然后小明按照卸货顺序依次装货到中转车，一个供货商的货只能装到一辆车上，不能拆装，但是一辆车可以装多家供货商的货；

中转车的限载货物量由小明统一指定，在完成货物中转的前提下，请问中转车的统一限载货物数最小值为多少。

#### 输入描述

  * 第一行 length 表示供货商数量 1 <= length <= 10^4
  * 第二行 goods 表示供货数数组 1 <= goods[i] <= 10^4
  * 第三行 types表示对应货物类型，types[i]等于0或者1，其中0代表干货，1代表湿货
  * 第四行 k表示单类中转车数量 1 <= k <= goods.length

#### 输出描述

运行结果输出一个整数，表示中转车统一限载货物数

#### 备注

中转车最多跑一趟仓库

#### 用例

输入| 4  
3 2 6 3  
0 1 1 0  
2  
---|---  
输出| 6  
说明|
货物1和货物4为干货，由2辆干货中转车中转，每辆车运输一个货物，限载为3货物2和货物3为湿货，由2辆湿货中转车中转，每辆车运输一个货物，限载为6这样中转车统一限载货物数可以设置为6（干货车和湿货车限载最大值），是最小的取值  
输入| 4  
3 2 6 8  
0 1 1 1  
1  
---|---  
输出| 16  
说明|
货物1为干货，由1辆干货中转车中转，限载为3货物2、货物3、货物4为湿货，由1辆湿货中转车中转，限载为16这样中转车统一限载货物数可以设置为16（干货车和湿货车限载最大值），是最小的取值  
  
#### 题目解析

本题需要装货顺序：

干、湿两种货车同时等待装货，然后，按goods顺序装货，如果goods[i]是干货，则装入干货车，如果goods[i]是湿货，则装入湿货车，当某个车装满后，且后续同类型车辆还有的话，下一辆相同类型的货车就会继续装货，只要还有相应类型的货车有剩余

#### 代码思路

根据题目描述，货物依次进站，小明按照卸货顺序依次装货到中转车，一个供货商的货只能装到一辆车上，不能拆装，但是一辆车可以装多家供货商的货。因此，我们可以遍历每一个货物，判断它是干货还是湿货，然后判断当前车是否能够装下这个货物，如果能够装下，则将货物装入车内；否则，如果当前的干货车或湿货车已经达到了最大数量，则返回无法按照限制装货；否则，干货车数量或湿货车数量加1，将货物装入新的车内。

在这个过程中，我们需要判断是否可以按照限制装货。具体来说，我们可以使用二分查找法，从最小限制为最大的货物重量开始，最大限制为所有货物重量之和。每次计算当前限制，判断是否可以按照限制装货，如果可以，则尝试减小限制；否则，尝试增大限制。最终输出最小限制即可。

