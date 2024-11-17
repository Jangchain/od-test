#### 题目描述

某农场主管理了一大片果园，fields[i]表示不同果林的面积，单位：m^2，现在要为所有的果林施肥且必须在n天之内完成，否则影响收成。小布是果林的工作人员，他每次选择一片果林进行施肥，且一片果林施肥完后当天不再进行施肥作业。

假设施肥机的能效为k，单位：m^2/day，请问至少租赁能效 k 为多少的施肥机才能确保不影响收成？如果无法完成施肥任务，则返回-1。

#### 输入描述

第一行输入为m和n，m表示fields中的元素个数，n表示施肥任务必须在n天内（含n天）完成；

第二行输入为fields，fields[i]表示果林 i 的面积，单位：m^2

#### 输出描述

对于每组数据，输出最小施肥机的能效 k ，无多余空格。

#### 备注

  * 1 ≤ fields.length ≤ 10^4
  * 1 ≤ n ≤ 10^9
  * 1 ≤ fields[i] ≤ 10^9

#### 用例

输入| 5 7  
5 7 9 15 10  
---|---  
输出| 9  
说明|
当能效k为9时，fields[0]需要1天，fields[1]需要1天，fields[2]需要1天，fields[3]需要2天，fields[4]需要2天，共需要7天，不会影响收成。  
输入| 3 1  
2 3 4  
---|---  
输出| -1  
说明| 由于一天最多完成一片果林的施肥，无论k为多少都至少需要3天才能完成施肥，因此返回-1。  
  
#### 题目解析

原型，可参照题解：

[875\. 爱吃香蕉的珂珂 - 力扣（LeetCode）](https://leetcode.cn/problems/koko-eating-
bananas/ "875. 爱吃香蕉的珂珂 - 力扣（LeetCode）")

#### 代码思路

这道题目可以使用二分查找来解决。首先，最小的能效为1，最大的能效为所有果林中的最大面积。然后，我们通过二分查找来寻找最小的能效，使得在这个能效下可以在规定天数内完成施肥任务。具体地，我们使用lambda表达式来定义一个check函数，用于判断在当前能效下是否能完成施肥任务。在check函数中，我们遍历所有果林，如果果林的面积小于等于能效，则施肥一天即可完成；否则需要向上取整计算需要的天数。最后我们将实际完成天数和规定天数的差值返回。如果返回的值大于0，则说明需要提高能效；否则记录当前能效，并降低能效以寻找更小的能效。最终，我们输出记录的最小能效即可。

#### c++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
        int num_of_fields;
        int num_of_days;
        cin >> num_of_fields >> num_of_days;
        vector<int> fields(num_of_fields);
        for (int i = 0; i < num_of_fields; i++) {
            cin >> fields[i];
        }
        int minK = 1;
        int maxK = 0;
        for (int field : fields) {
            maxK = max(maxK, field);
        }
        int ans = -1;
        while (minK <= maxK) {
            int k = (minK + maxK) / 2;
            long long spend = 0;
            for (int field : fields) {
                spend += (field + k - 1) / k;
            }
            if (spend > num_of_days) {
                minK = k + 1;
            } else {
                ans = k;
                maxK = k - 1;
            }
        }
        cout << ans << endl;
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 监听line事件，读取第一行输入
    rl.on('line', (input) => {
      // 将输入字符串分割成数组，分别赋值给num_of_fields和num_of_days
      const [num_of_fields, num_of_days] = input.split(' ').map(Number);
      // 监听line事件，读取第二行输入
      rl.on('line', (input) => {
        // 将输入字符串分割成数组，转换成数字后赋值给fields
        const fields = input.split(' ').map(Number);
        // 初始化最小能效k为1，最大能效k为所有果林中面积最大的果林的面积
        let minK = 1;
        let maxK = 0;
        for (let field of fields) {
          maxK = Math.max(maxK, field);
        }
        let ans = -1;
        while (minK <= maxK) {
          let k = (minK + maxK) >>> 1;
          let spend = 0;
          for (let field of fields) {
            spend += Math.ceil(field / k);
          }
          if (spend > num_of_days) {
            minK = k + 1;
          } else {
            ans = k;
            maxK = k - 1;
          }
        }
        console.log(ans);
      });
    });
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int num_of_fields = scanner.nextInt(); // 果林数量
            int num_of_days = scanner.nextInt(); // 施肥任务必须在n天内完成
            int[] fields = new int[num_of_fields]; // 果林面积列表
            for (int i = 0; i < num_of_fields; i++) {
                fields[i] = scanner.nextInt();
            }
            int minK = 1; // 最小能效
            int maxK = 0; // 最大能效不会超过果林面积的最大值
            for (int field : fields) {
                maxK = Math.max(maxK, field);
            }
            int ans = -1; // 最终的答案
            while (minK <= maxK) {
                int k = (minK + maxK) >>> 1; // 二分查找中间值
                long spend = 0; // 完成任务需要的天数
                for (int field : fields) {
                    spend += (field + k - 1) / k; // 使用位运算来代替除法运算
                }
                if (spend > num_of_days) { // 如果需要的天数大于n，则k太小，需要增大k
                    minK = k + 1;
                } else { // 否则k可能过大或者正好，需要减小k
                    ans = k;
                    maxK = k - 1;
                }
            }
            System.out.println(ans);
        }
    }
    

#### Python

    
    
    import math
    
    num_of_fields , num_of_days = map(int, input().split())
    fields = list(map(int, input().split()))
    
    minK = 1
    maxK = max(fields)
    ans = -1
    
    while minK <= maxK:
        k = (minK + maxK) // 2
        spend = 0
        for field in fields:
            spend += math.ceil(field / k)
        if spend > num_of_days:
            minK = k + 1
        else:
            ans = k
            maxK = k - 1
    
    print(ans)
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 题目解析
      * 代码思路
      * c++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

