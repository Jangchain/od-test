#### 题目描述

有一堆长方体积木，它们的高度和宽度都相同，但长度不一。

小橙想把这堆积木叠成一面墙，墙的每层可以放一个积木，也可以将两个积木拼接起来，要求每层的长度相同。

若必须用完这些积木，叠成的墙最多为多少层？

如下是叠成的一面墙的图示，积木仅按宽和高所在的面进行拼接。

![35b527e2c0a6887b4c5b6d3c95383a7a.png](https://i-blog.csdnimg.cn/blog_migrate/ae9f6a7a8f60a2cc25d19944bb57deb1.png)

#### 输入描述

输入为一行，为各个积木的长度，数字为正整数，并由空格分隔。积木的数量和长度都不超过5000。

#### 输出描述

输出一个数字，为墙的最大层数，如果无法按要求叠成每层长度一致的墙，则输出-1。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 3 6 3 3 3  
---|---  
输出| 3  
说明| 以 6 为底的墙，第一层为 6 ，第二层为 3 + 3，第三层 3 + 3。  
输入| 9 9 9 5 3 2 2 2 2 2  
---|---  
输出| 5  
说明| 5+2+2=93+2+2+2=99,9,9共五层  
  
#### 注意

请注意本题题意和用例有冲突！！！

  1. 题目中写着: 小橙想把这堆积木叠成一面墙，墙的每层可以放一个积木，也可以将两个积木拼接起来，要求每层的长度相同。  
也就是说，每一层最少一个最多两个  
但是用例2中却出现了一层三个，本题题解是按照一层可以放置多个来解答的。

  2. 按照题目：如果无法按要求叠成每层长度一致的墙，则输出-1。这里应该是不允许只有一层墙，不然把所有的都放在第一层，这样永远不会出现-1。题解是按照至少两层来解答的

#### 解题思路

题目要求我们找到最多可以叠成多少层的墙，每层长度相同，且必须用完所有积木。

  1. 首先，读取输入数据，将积木的长度存储在一个列表中，并计算所有积木的总长度。
  2. 对积木长度进行排序，这样我们可以从最长的积木开始尝试放置。
  3. 遍历所有可能的层数，从 2 到总长度。对于每个可能的层数，我们需要检查总长度是否可以被当前层数整除。如果不能整除，说明当前层数不满足条件，继续尝试下一个层数。
  4. 对于满足条件的层数，计算每层的目标长度（总长度除以层数）。如果最长的积木长度大于目标长度，说明当前层数无法满足条件，继续尝试下一个层数。
  5. 对于可能满足条件的层数，我们使用深度优先搜索（DFS）来尝试放置积木。DFS 函数的目的是检查当前状态下是否可以成功放置所有积木。我们从最长的积木开始尝试放置，逐个尝试将积木放入每一层，直到找到一个满足条件的放置方式或尝试完所有可能的放置方式。
  6. 在 DFS 函数中，我们需要记录当前正在处理的积木索引、已使用的层数、每层的当前长度、最大层数和目标长度。我们首先尝试将当前积木放入新的一层，然后递归调用 DFS 函数处理下一个积木。如果放入新层后，DFS 函数返回 true，说明找到了一个满足条件的放置方式，我们可以结束搜索。如果放入新层后，DFS 函数返回 false，说明当前放置方式不满足条件，我们需要将当前积木从新层中移除，然后尝试将当前积木放入已有的层中。
  7. 当 DFS 函数返回 true 时，说明找到了一个满足条件的放置方式，我们更新最大层数为当前层数和已找到的最大层数中的较大值。
  8. 遍历完所有可能的层数后，输出最大层数。如果没有找到满足条件的放置方式，输出 -1。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <sstream>
    #include <algorithm>
    using namespace std;
    // 深度优先搜索函数
    bool dfs(const vector<int>& bricks, int currentIndex, int usedLayers, vector<int>& layerLengths, int maxLayers, int targetLength) {
        // 当所有积木都已使用完时，返回 true
        if (currentIndex < 0) {
            return true;
        }
        // 当前层还未堆满，继续往上堆
        if (usedLayers < maxLayers) {
            layerLengths[usedLayers] = bricks[currentIndex];
            if (dfs(bricks, currentIndex - 1, usedLayers + 1, layerLengths, maxLayers, targetLength)) {
                return true;
            }
            layerLengths[usedLayers] = 0;
        }
        // 把当前积木加入已有的每一层中，看是否能够满足条件
        for (int i = 0; i < usedLayers; i++) {
            // 如果当前层和上一层积木长度相同，则不需要重复计算
            if (i > 0 && layerLengths[i] == layerLengths[i - 1]) {
                continue;
            }
            // 如果当前积木可以放入当前层，则把当前积木放入当前层
            if (layerLengths[i] + bricks[currentIndex] <= targetLength) {
                layerLengths[i] += bricks[currentIndex];
                if (dfs(bricks, currentIndex - 1, usedLayers, layerLengths, maxLayers, targetLength)) {
                    return true;
                }
                layerLengths[i] -= bricks[currentIndex];
            }
        }
        return false;
    }
    
    int main() {
        // 读取输入
        string inputStr;
        getline(cin, inputStr);
        istringstream iss(inputStr);
        vector<int> bricks;
        int brick;
        while (iss >> brick) {
            bricks.push_back(brick);
        }
    
        // 计算所有积木的总长度
        int totalLength = 0;
        for (int brick : bricks) {
            totalLength += brick;
        }
    
        // 对积木长度进行排序
        sort(bricks.begin(), bricks.end());
    
        int maxLayers = -1;
        // 遍历所有可能的层数
        for (int i = 2; i <= totalLength; i++) {
            // 如果所有数字的和除不尽层数，自然肯定不满足条件
            if (totalLength % i != 0) {
                continue;
            }
            // 计算每一层的目标长度
            int targetLength = totalLength / i;
            // 如果最大的积木长度大于当前层的长度，则无法满足条件
            if (bricks.back() > targetLength) {
                continue;
            }
            // 初始化每层的长度列表
            vector<int> layerLengths(i, 0);
            // 使用深度优先搜索判断是否可以堆成满足条件的墙
            if (dfs(bricks, bricks.size() - 1, 0, layerLengths, i, targetLength)) {
                maxLayers = max(maxLayers, i);
            }
        }
    
        // 输出最大层数
        cout << maxLayers << endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 深度优先搜索函数，用于递归地尝试将积木放入不同的层
    function dfs(bricks, currentIndex, usedLayers, layerLengths, maxLayers, targetLength) {
      // 当所有积木都已使用完时，返回true
      if (currentIndex < 0) {
        return true;
      }
      // 当前层还未堆满，继续往上堆
      if (usedLayers < maxLayers) {
        layerLengths[usedLayers] = bricks[currentIndex];
        if (dfs(bricks, currentIndex - 1, usedLayers + 1, layerLengths, maxLayers, targetLength)) {
          return true;
        }
        layerLengths[usedLayers] = 0;
      }
      // 把当前积木加入已有的每一层中，看是否能够满足条件
      for (let i = 0; i < usedLayers; i++) {
        // 如果当前层和上一层积木长度相同，则不需要重复计算
        if (i > 0 && layerLengths[i] === layerLengths[i - 1]) {
          continue;
        }
        // 如果当前积木可以放入当前层，则把当前积木放入当前层
        if (layerLengths[i] + bricks[currentIndex] <= targetLength) {
          layerLengths[i] += bricks[currentIndex];
          if (dfs(bricks, currentIndex - 1, usedLayers, layerLengths, maxLayers, targetLength)) {
            return true;
          }
          layerLengths[i] -= bricks[currentIndex];
        }
      }
      return false;
    }
    
    // 从标准输入读取数据
    rl.on('line', (input) => {
      // 将输入的积木长度转换为数字数组
      const bricks = input.split(' ').map(Number);
      // 计算所有积木的总长度
      const totalLength = bricks.reduce((a, b) => a + b, 0);
      // 对积木长度进行排序
      bricks.sort((a, b) => a - b);
    
      // 初始化最大层数为-1
      let maxLayers = -1;
      // 遍历所有可能的层数
      for (let i = 2; i <= totalLength; i++) {
        // 如果所有数字的和除不尽层数，自然肯定不满足条件
        if (totalLength % i !== 0) {
          continue;
        }
        // 计算每一层的目标长度
        const targetLength = totalLength / i;
        // 如果最大的积木长度大于当前层的长度，则无法满足条件
        if (bricks[bricks.length - 1] > targetLength) {
          continue;
        }
        // 初始化每层的长度列表
        const layerLengths = new Array(i).fill(0);
        // 使用深度优先搜索判断是否可以堆成满足条件的墙
        if (dfs(bricks, bricks.length - 1, 0, layerLengths, i, targetLength)) {
          maxLayers = Math.max(maxLayers, i);
        }
      }
      // 输出最大层数
      console.log(maxLayers);
    });
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        // 深度优先搜索函数
        public static boolean dfs(List<Integer> bricks, int currentIndex, int usedLayers, List<Integer> layerLengths, int maxLayers, int targetLength) {
            // 当所有积木都已使用完时，返回true
            if (currentIndex < 0) {
                return true;
            }
            // 当前层还未堆满，继续往上堆
            if (usedLayers < maxLayers) {
                layerLengths.set(usedLayers, bricks.get(currentIndex));
                if (dfs(bricks, currentIndex - 1, usedLayers + 1, layerLengths, maxLayers, targetLength)) {
                    return true;
                }
                layerLengths.set(usedLayers, 0);
            }
            // 把当前积木加入已有的每一层中，看是否能够满足条件
            for (int i = 0; i < usedLayers; i++) {
                // 如果当前层和上一层积木长度相同，则不需要重复计算
                if (i > 0 && layerLengths.get(i).equals(layerLengths.get(i - 1))) {
                    continue;
                }
                // 如果当前积木可以放入当前层，则把当前积木放入当前层
                if (layerLengths.get(i) + bricks.get(currentIndex) <= targetLength) {
                    layerLengths.set(i, layerLengths.get(i) + bricks.get(currentIndex));
                    if (dfs(bricks, currentIndex - 1, usedLayers, layerLengths, maxLayers, targetLength)) {
                        return true;
                    }
                    layerLengths.set(i, layerLengths.get(i) - bricks.get(currentIndex));
                }
            }
            return false;
        }
    
        public static void main(String[] args) {
            // 读取输入
            Scanner scanner = new Scanner(System.in);
            String inputStr = scanner.nextLine();
            List<Integer> bricks = new ArrayList<>();
            for (String str : inputStr.split(" ")) {
                bricks.add(Integer.parseInt(str));
            }
            // 计算所有积木的总长度
            int totalLength = 0;
            for (int brick : bricks) {
                totalLength += brick;
            }
            // 对积木长度进行排序
            Collections.sort(bricks);
    
            int maxLayers = -1;
            // 遍历所有可能的层数
            for (int i = 2; i <= totalLength; i++) {
                // 如果所有数字的和除不尽层数，自然肯定不满足条件
                if (totalLength % i != 0) {
                    continue;
                }
                // 计算每一层的目标长度
                int targetLength = totalLength / i;
                // 如果最大的积木长度大于当前层的长度，则无法满足条件
                if (bricks.get(bricks.size() - 1) > targetLength) {
                    continue;
                }
                // 初始化每层的长度列表
                List<Integer> layerLengths = new ArrayList<>(Collections.nCopies(i, targetLength));
                // 使用深度优先搜索判断是否可以堆成满足条件的墙
                if (dfs(bricks, bricks.size() - 1, 0, layerLengths, i, targetLength)) {
                    maxLayers = Math.max(maxLayers, i);
                }
            }
            // 输出最大层数
            System.out.println(maxLayers);
        }
    }
    
    

#### Python算法源码

    
    
    from typing import List
    
    # 深度优先搜索函数
    def dfs(bricks: List[int], currentIndex: int, usedLayers: int, layerLengths: List[int], maxLayers: int, targetLength: int) -> bool:
        # 当所有积木都已使用完时，返回 True
        if currentIndex < 0:
            return True
        # 当前层还未堆满，继续往上堆
        if usedLayers < maxLayers:
            layerLengths[usedLayers] = bricks[currentIndex]
            if dfs(bricks, currentIndex - 1, usedLayers + 1, layerLengths, maxLayers, targetLength):
                return True
            layerLengths[usedLayers] = 0
        # 把当前积木加入已有的每一层中，看是否能够满足条件
        for i in range(usedLayers):
            # 如果当前层和上一层积木长度相同，则不需要重复计算
            if i > 0 and layerLengths[i] == layerLengths[i - 1]:
                continue
            # 如果当前积木可以放入当前层，则把当前积木放入当前层
            if layerLengths[i] + bricks[currentIndex] <= targetLength:
                layerLengths[i] += bricks[currentIndex]
                if dfs(bricks, currentIndex - 1, usedLayers, layerLengths, maxLayers, targetLength):
                    return True
                layerLengths[i] -= bricks[currentIndex]
        return False
    
    # 读取输入
    inputStr = input()
    bricks = list(map(int, inputStr.split()))
    
    # 计算所有积木的总长度
    totalLength = sum(bricks)
    
    # 对积木长度进行排序
    bricks.sort()
    
    maxLayers = -1
    # 遍历所有可能的层数
    for i in range(2, totalLength + 1):
        # 如果所有数字的和除不尽层数，自然肯定不满足条件
        if totalLength % i != 0:
            continue
        # 计算每一层的目标长度
        targetLength = totalLength // i
        # 如果最大的积木长度大于当前层的长度，则无法满足条件
        if bricks[-1] > targetLength:
            continue
        # 初始化每层的长度列表
        layerLengths = [0] * i
        # 使用深度优先搜索判断是否可以堆成满足条件的墙
        if dfs(bricks, len(bricks) - 1, 0, layerLengths, i, targetLength):
            maxLayers = max(maxLayers, i)
    
    # 输出最大层数
    print(maxLayers)
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例
      * 注意
      * 解题思路
      * C++
      * JavaScript
      * Java
      * Python算法源码

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

