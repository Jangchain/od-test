#### 题目描述

对一个数据a进行分类，**分类方法** 为：

此数据a（四个字节大小）的四个字节相加对一个给定的值b[取模]如果得到的结果小于一个给定的值c，则数据a为有效类型，其类型为取模的值；如果得到的结果大于或者等于c，则数据a为无效类型。

比如一个数据a=0x01010101，b=3，按照分类方法计算（0x01+0x01+0x01+0x01）%3=1，

所以如果c=2，则此a为有效类型，其类型为1，如果c=1，则此a为无效类型；

又比如一个数据a=0x01010103，b=3，按照分类方法计算（0x01+0x01+0x01+0x03）%3=0，

所以如果c=2，则此a为有效类型，其类型为0，如果c=0，则此a为无效类型。

输入12个数据，第一个数据为c，第二个数据为b，剩余10个数据为需要分类的数据，

请找到有效类型中包含数据最多的类型，并输出该类型含有多少个数据。

#### 输入描述

输入12个数据，用空格分隔，第一个数据为c，第二个数据为b，剩余10个数据为需要分类的数据。

#### 输出描述

输出最多数据的有效类型有多少个数据。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 3 4 256 257 258 259 260 261 262 263 264 265  
---|---  
输出| 3  
说明| 10个数据4个字节相加后的结果分别为1 2 3 4 5 6 7 8 9 10，故对4取模的结果为1 2 3 0 1 2 3 0 1
2，c为3，所以0 1 2都是有效类型，类型为1和2的有3个数据，类型为0的只有2个数据，故输出3。  
输入| 1 4 256 257 258 259 260 261 262 263 264 265  
---|---  
输出| 2  
说明| 10个数据4个字节相加后的结果分别为1 2 3 4 5 6 7 8 9 10，故对4取模的结果为1 2 3 0 1 2 3 0 1
2，c为1，所以只有0是有效类型，类型为0的有2个数据，故输出2。  
  
#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### 代码思路

  1. 首先从输入中读取两个整数c和b，分别表示取模的阈值和取模的除数。
  2. 然后读取剩余的10个数据，将它们存储在一个列表中。
  3. 创建一个哈希映射count，用于统计每个有效类型出现的次数。
  4. 对于每个数据，将其四个字节相加得到sum，然后对b取模得到取模的值t。
  5. 如果t小于c，则将t作为键在count中对应的值加1。
  6. 遍历count中的所有值，找到最大值maxCount。
  7. 输出maxCount。

#### C++

    
    
    #include <iostream>
    #include <unordered_map>
    #include <sstream>
    #include <vector>
    using namespace std;
    
    
    int main() {
        int c, b;
        vector<int> data(10);
        cin >> c >> b; // 读入 c 和 b
        for (int i = 0; i < 10; i++) {
            cin >> hex >> data[i]; // 以十六进制读入数据
        }
        unordered_map<int, int> count; // 统计每种类型出现的次数
        for (int i = 0; i < data.size(); i++) {
            int sum = 0;
            for (int j = 0; j < 4; j++) {
                sum += (data[i] >> (j * 8)) & 0xFF; // 取出每个字节，累加
            }
            int t = sum % b; // 计算类型
            if (t < c) { // 是有效类型
                count[t]++; // 统计次数
            }
        }
        int maxCount = 0;
        for (auto& p : count) { // 找出出现次数最多的类型
            maxCount = max(maxCount, p.second);
        }
        cout << maxCount << endl; // 输出最多的有效类型出现次数
        return 0;
    }
    

#### java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int c = sc.nextInt();
            int b = sc.nextInt();
            List<Integer> data = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                data.add(sc.nextInt(16));
            }
            Map<Integer, Integer> count = new HashMap<>();
            for (int i = 0; i < data.size(); i++) {
                int sum = 0;
                for (int j = 0; j < 4; j++) {
                    sum += (data.get(i) >> (j * 8)) & 0xFF;
                }
                int t = sum % b;
                if (t < c) {
                    count.put(t, count.getOrDefault(t, 0) + 1);
                }
            }
            int maxCount = 0;
            for (int val : count.values()) {
                maxCount = Math.max(maxCount, val);
            }
            System.out.println(maxCount);
        }
    }
    

#### javascript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', function(line){
      const input = line.trim().split(' ');
      const c = parseInt(input[0]);
      const b = parseInt(input[1]);
      const data = input.slice(2).map(x => parseInt(x, 16));
      const count = new Map();
      for (let i = 0; i < data.length; i++) {
        let sum = 0;
        for (let j = 0; j < 4; j++) {
          sum += (data[i] >> (j * 8)) & 0xFF;
        }
        const t = sum % b;
        if (t < c) {
          count.set(t, (count.get(t) || 0) + 1);
        }
      }
      let maxCount = 0;
      for (let val of count.values()) {
        maxCount = Math.max(maxCount, val);
      }
      console.log(maxCount);
    });
    

#### python

    
    
    import sys
    
    tmp = list(map(int, input().split()))
    c = tmp[0]
    b = tmp[1]
    data = tmp[2:]
    count = {}
    for i in range(len(data)):
        sum = 0
        for j in range(4):
            sum += (data[i] >> (j * 8)) & 0xFF
        t = sum % b
        if t < c:
            count[t] = count.get(t, 0) + 1
    maxCount = 0
    for val in count.values():
        maxCount = max(maxCount, val)
    print(maxCount)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * 代码思路
>       * C++
>       * java
>       * javascript
>       * python
>       * 完整用例
>       *         * 用例1
>         * 用例2
>         * 用例3
>         * 用例4
>         * 用例5
>         * 用例6
>         * 用例7
>         * 用例8
>         * 用例9
>         * 用例10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    3 4 256 257 258 259 260 261 262 263 264 265
    

##### 用例2

    
    
    1 4 256 257 258 259 260 261 262 263 264 265
    

##### 用例3

    
    
    2 5 256 257 258 259 260 261 262 263 264 265
    

##### 用例4

    
    
    4 3 256 257 258 259 260 261 262 263 264 265
    

##### 用例5

    
    
    0 2 256 257 258 259 260 261 262 263 264 265
    

##### 用例6

    
    
    5 6 256 257 258 259 260 261 262 263 264 265
    

##### 用例7

    
    
    3 4 256 257 258 259 260 261 262 263 264 265
    

##### 用例8

    
    
    2 5 256 257 258 259 260 261 262 263 264 265
    

##### 用例9

    
    
    4 3 256 257 258 259 260 261 262 263 264 265
    

##### 用例10

    
    
    0 2 256 257 258 259 260 261 262 263 264 265
    

