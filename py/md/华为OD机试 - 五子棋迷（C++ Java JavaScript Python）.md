## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

### 题目描述：五子棋迷

张兵和王武是五子棋迷，工作之余经常切磋棋艺。这不，这会儿又下起来了。走了一会儿，轮张兵了，对着一条线思考起来了，这条线上的棋子分布如下:

用数组表示: -1 0 1 1 1 0 1 0 1 -1

棋子分布说明:

  1. -1代表白子，0代表空位，1 代表黑子

  2. 数组长度L, 满足 1 < L < 40, 且L为奇数

你得帮他写一个程序，算出最有利的出子位置。 最有利定义:  
3\. 找到一个空位(0)，用棋子(1/-1)填充该位置，可以使得当前子的最大连续长度变大;  
4\. 如果存在多个位置，返回最靠近中间的较小的那个坐标;  
5\. 如果不存在可行位置，直接返回-1;  
6\. 连续长度不能超过5个(五字棋约束);

### 输入描述：

第一行: 当前出子颜色 第二行: 当前的棋局状态

### 输出描述：

1个整数，表示出子位置的数组下标

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

### 用例1

输入：

    
    
    1
    -1 0 1 1 1 0 1 0 1 -1 1
    

输出：

    
    
    5
    

说明：

当前为黑子（1），放置在下标为5的位置，黑子的最大连续长度，可以由3到5

### 用例2

输入：

    
    
    -1
    -1 0 1 1 1 0 1 0 1 -1 1
    

输出：

    
    
    1
    

说明：

当前为白子，唯一可以放置的位置下标为1， 白子的最大长度，由1变为2

### 用例3

输入：

    
    
    1
    0 0 0 0 1 0 0 0 0 1 0
    

输出：

    
    
    5
    

说明：

可行的位置很多，5最接近中间的位置坐标

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

### java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner in = new Scanner(System.in);
    
            int currentPlayer = in.nextInt(); // 当前出子颜色
    
            List<Integer> board = new ArrayList<>(); // 当前的棋局状态
            while (in.hasNextInt()) {
                int num = in.nextInt();
                board.add(num);
            }
    
            int curMaxConsecutive = 0; // 当前棋局下最大连续长度
            int consecutiveCount = 0; // 当前连续长度
            for (int i = 0; i < board.size(); ++i) {
                if (board.get(i) == currentPlayer) {
                    consecutiveCount += 1;
                } else {
                    consecutiveCount = 0;
                }
                curMaxConsecutive = Math.max(curMaxConsecutive, consecutiveCount);
            }
    
            int[] lenArr = new int[board.size()]; // 存储每个空位下子后的最大连续长度
            int maxLen = 0; // 最大连续长度
            for (int i = 0; i < board.size(); ++i) {
                if (board.get(i) == 0) { // 如果是空位
                    int left = i - 1, right = i + 1;
                    while (left >= 0 && board.get(left) == currentPlayer) left -= 1; // 向左扩展
                    while (right < board.size() && board.get(right) == currentPlayer) right += 1; // 向右扩展
                    if (right - left - 1 <= 5) { // 连续长度不超过5个
                        lenArr[i] = right - left - 1;
                        maxLen = Math.max(maxLen, right - left - 1);
                    }
                }
            }
    
            if (maxLen <= curMaxConsecutive || board.size() == 0) { // 如果最大连续长度小于等于当前连续长度或者棋局为空
                System.out.println("-1");
            } else {
                int ansIdx = -1; // 最有利的出子位置
                int mid = (board.size() - 1) / 2; // 棋盘中间位置的索引
                for (int i = 0; i < board.size(); ++i) {
                    if (lenArr[i] > curMaxConsecutive) {
                        if (ansIdx == -1 || Math.abs(ansIdx - mid) > Math.abs(i - mid)) {
                            ansIdx = i;
                        }
                    }
                }
                System.out.println(ansIdx);
            }
        }
    }
    
    
    

### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let currentPlayer;
    let board = [];
    
    rl.on('line', (line) => {
      if (!currentPlayer) {
        currentPlayer = parseInt(line);
      } else {
        board = line.split(' ').map(num => parseInt(num));
        rl.close();
      }
    }).on('close', () => {
      let curMaxConsecutive = 0;
      let consecutiveCount = 0;
    
      for (let i = 0; i < board.length; ++i) {
        if (board[i] === currentPlayer) {
          consecutiveCount += 1;
        } else {
          consecutiveCount = 0;
        }
        curMaxConsecutive = Math.max(curMaxConsecutive, consecutiveCount);
      }
    
      let lenArr = new Array(board.length).fill(0);
      let maxLen = 0;
    
      for (let i = 0; i < board.length; ++i) {
        if (board[i] === 0) {
          let left = i - 1;
          let right = i + 1;
          while (left >= 0 && board[left] === currentPlayer) left -= 1;
          while (right < board.length && board[right] === currentPlayer) right += 1;
          if (right - left - 1 <= 5) {
            lenArr[i] = right - left - 1;
            maxLen = Math.max(maxLen, right - left - 1);
          }
        }
      }
    
      if (maxLen <= curMaxConsecutive || board.length === 0) {
        console.log("-1");
      } else {
        let ansIdx = -1;
        let mid = Math.floor((board.length - 1) / 2);
        for (let i = 0; i < board.length; ++i) {
          if (lenArr[i] > curMaxConsecutive) {
            if (ansIdx === -1 || Math.abs(ansIdx - mid) > Math.abs(i - mid)) {
              ansIdx = i;
            }
          }
        }
        console.log(ansIdx);
      }
    });
    
    

### C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
       int currentPlayer;
       cin >> currentPlayer;
    
       vector<int> board;
       int num;
       while (cin >> num) {
           board.push_back(num);
       }
    
       int curMaxConsecutive = 0;
       int consecutiveCount = 0;
       for (int i = 0; i < board.size(); ++i) {
           if (board[i] == currentPlayer) {
               consecutiveCount += 1;
           } else {
               consecutiveCount = 0;
           }
           curMaxConsecutive = max(curMaxConsecutive, consecutiveCount);
       }
    
       vector<int> lenArr(board.size(), 0);
       int maxLen = 0;
       for (int i = 0; i < board.size(); ++i) {
           if (board[i] == 0) {
               int left = i - 1, right = i + 1;
               while (left >= 0 && board[left] == currentPlayer) left -= 1;
               while (right < board.size() && board[right] == currentPlayer) right += 1;
               if (right - left - 1 <= 5) {
                   lenArr[i] = right - left - 1;
                   maxLen = max(maxLen, right - left - 1);
               }
           }
       }
    
       if (maxLen <= curMaxConsecutive || board.size() == 0) {
           cout << "-1" << endl;
       } else {
           int ansIdx = -1;
           int mid = (board.size() - 1) / 2;
           for (int i = 0; i < board.size(); ++i) {
               if (lenArr[i] > curMaxConsecutive) {
                   if (ansIdx == -1 || abs(ansIdx - mid) > abs(i - mid)) {
                       ansIdx = i;
                   }
               }
           }
           cout << ansIdx << endl;
       }
    
       return 0;
    }
    
    
    

### python

    
    
    import sys
    
    def main():
        currentPlayer = int(input()) # 当前出子颜色
    
        board = [] # 当前的棋局状态
        for line in sys.stdin:
            board.extend(map(int, line.split()))
    
        curMaxConsecutive = 0 # 当前棋局下最大连续长度
        consecutiveCount = 0 # 当前连续长度
        for i in range(len(board)):
            if board[i] == currentPlayer:
                consecutiveCount += 1
            else:
                consecutiveCount = 0
            curMaxConsecutive = max(curMaxConsecutive, consecutiveCount)
    
        lenArr = [0] * len(board) # 存储每个空位下子后的最大连续长度
        maxLen = 0 # 最大连续长度
        for i in range(len(board)):
            if board[i] == 0: # 如果是空位
                left = i - 1
                right = i + 1
                while left >= 0 and board[left] == currentPlayer:
                    left -= 1 # 向左扩展
                while right < len(board) and board[right] == currentPlayer:
                    right += 1 # 向右扩展
                if right - left - 1 <= 5: # 连续长度不超过5个
                    lenArr[i] = right - left - 1
                    maxLen = max(maxLen, right - left - 1)
    
        if maxLen <= curMaxConsecutive or len(board) == 0: # 如果最大连续长度小于等于当前连续长度或者棋局为空
            print("-1")
        else:
            ansIdx = -1 # 最有利的出子位置
            mid = (len(board) - 1) // 2 # 棋盘中间位置的索引
            for i in range(len(board)):
                if lenArr[i] > curMaxConsecutive:
                    if ansIdx == -1 or abs(ansIdx - mid) > abs(i - mid):
                        ansIdx = i
            print(ansIdx)
    
    if __name__ == "__main__":
        main()
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    1
    -1 0 1 1 1 0 1 -1 1
    

##### 用例3

    
    
    -1
    -1 0 1 1 1 0 1 0 1 -1 1
    

##### 用例4

    
    
    1
    0 0 0 0 1 0 0 0 0 1 0
    

##### 用例5

    
    
    -1
    0 0 0 0 0 0 0 0 0 0 0
    

##### 用例6

    
    
    1
    -1 1 -1 1 -1 1 -1 1 -1 1 -1
    

##### 用例7

    
    
    1
    -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1
    

##### 用例8

    
    
    -1
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    

##### 用例9

    
    
    1
    -1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1
    

##### 用例10

    
    
    -1
    -1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1
    

