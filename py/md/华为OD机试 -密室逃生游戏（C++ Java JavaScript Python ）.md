#### 题目描述

小强在参加《密室逃生》游戏，当前关卡要求找到符合给定 密-码K（升序的不重复小写字母组成） 的箱子，并给出箱子编号，箱子编号为 1~N 。  
每个箱子中都有一个 字符串s ，字符串由大写字母、小写字母、数字、标点符号、空格组成，需要在这些字符串中找到所有的字母，忽略大小写后排列出对应的密-
码串，并返回匹配密-码的箱子序号。

提示：满足条件的箱子不超过1个。

#### 输入描述

第一行为 key 的字符串，  
第二行为箱子 boxes，为数组样式，以空格分隔

  * 箱子 N 数量满足 1 ≤ N ≤ 10000,
  * s 长度满足 0 ≤ s.length ≤ 50，
  * 密-码为仅包含小写字母的升序字符串，且不存在重复字母，
  * 密-码 K 长度1 ≤ K.l e n g t h ≤ 26

#### 输出描述

返回对应箱子编号  
如不存在符合要求的密-码箱，则返回 -1。

#### 用例

输入| abc  
s,sdf134 A2c4b  
---|---  
输出| 2  
说明| 第 2 个箱子中的 Abc ，符合密-码 abc。  
  
#### 题目解析

简单题，最简单的就是双重for循环，统计字符数量，在和key的数量对比。大于等于，则说明当前box就是可以匹配密-
码的箱子，返回当前箱子的序号。如果一直找不到，则返回-1。

但是不知道会不会超时：另一种就是

先将key转成数组，进行字典序排序

外层循环依旧遍历每个box，

如果box.length < key.length，则肯定不行，直接下次循环。

如果box.length >=
key.length，则先将box转为小写模式，然后将box转为数组字典序排序，接下来利用两个指针k,j，分别从key的0索引位置，和box的0索引位置开始扫描，如果扫描到的key[k]
== box[j]，则k++，j++，否则只有j++。

当k===key.length时，则说明当前box中就是匹配密-码的箱子。

这种算法，最坏的情况是O(n*slen)，但是其他情况都有优化可能。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        string password, boxes_str;
        getline(cin, password); // 读取第一行输入，即密-码
        getline(cin, boxes_str); // 读取第二行输入，即所有盒子的字符串
        vector<string> boxes; // 创建一个字符串向量，用于存储所有盒子的字符串
        string box = "";
        for (char c : boxes_str) {
            if (c == ' ') { // 如果遇到空格，则将当前盒子字符串加入向量中
                boxes.push_back(box);
                box = "";
            } else {
                box += c;
            }
        }
        boxes.push_back(box); // 将最后一个盒子字符串加入向量中
        int result = -1; // 初始化结果为-1，表示未找到
    
        // 遍历所有盒子
        for (int i = 0; i < boxes.size(); i++) {
            string lowerCase = boxes[i];
            transform(lowerCase.begin(), lowerCase.end(), lowerCase.begin(), ::tolower); // 将盒子字符串转为小写字母
            vector<char> letters; // 创建一个字符向量，用于存储盒子中的字母
    
            // 遍历盒子中的每个字符
            for (char c : lowerCase) {
                if (c >= 'a' && c <= 'z') { // 如果是小写字母
                    letters.push_back(c); // 将其加入字符向量
                }
            }
    
            sort(letters.begin(), letters.end()); // 将字符向量按字典序排序
            string sortedLetters = ""; // 创建一个字符串，用于拼接排好序的字母
    
            // 遍历排好序的字母向量
            for (char c : letters) {
                sortedLetters += c; // 将每个字母加入字符串中
            }
    
            if (sortedLetters == password) { // 如果拼接后的字符串与密-码相等
                result = i + 1; // 将结果设为当前盒子的编号
                break; // 跳出循环
            }
        }
    
        cout << result << endl; // 输出结果
        return 0;
    }
    

#### JavaScript

    
    
    // 导入所需模块
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    const cmp = (a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    }
    
    let password = '';
    let boxes = [];
    
    // 读取输入
    rl.on('line', (input) => {
      if (!password) {
        password = input.trim();
      } else {
        boxes = input.trim().split(' ');
        let result = -1; // 初始化结果为-1，表示未找到
    
        // 遍历所有盒子
        for (let i = 0; i < boxes.length; i++) {
          let lower_case = boxes[i].toLowerCase(); // 将盒子字符串转为小写字母
          let letters = []; // 创建一个字符列表，用于存储盒子中的字母
    
          // 遍历盒子中的每个字符
          for (let j = 0; j < lower_case.length; j++) {
            let c = lower_case[j];
            if (c >= 'a' && c <= 'z') { // 如果是小写字母
              letters.push(c); // 将其加入字符列表
            }
          }
    
          letters.sort(cmp); // 将字符列表按字典序排序
          let builder = []; // 创建一个列表，用于拼接排好序的字母
    
          // 遍历排好序的字母列表
          for (let j = 0; j < letters.length; j++) {
            builder.push(letters[j]); // 将每个字母加入列表中
          }
    
          if (builder.join('') === password) { // 如果拼接后的字符串与密-码相等
            result = i + 1; // 将结果设为当前盒子的编号
            break; // 跳出循环
          }
        }
    
        console.log(result); // 输出结果
      }
    });
    

#### Java

    
    
    import java.util.Scanner; // 导入Scanner类
    import java.util.ArrayList; // 导入ArrayList类
    import java.util.List; // 导入List类
    import java.util.stream.Collectors; // 导入stream和Collectors类
    
    public class Main {
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in); // 创建Scanner对象，用于从控制台读取输入
            String password = scanner.nextLine(); // 读取第一行输入，即密-码
            String[] boxes = scanner.nextLine().split(" "); // 读取第二行输入，即所有盒子的字符串，使用空格分隔并转为数组
            int result = -1; // 初始化结果为-1，表示未找到
    
            // 遍历所有盒子
            for (int i = 0; i < boxes.length; i++) {
                String lowerCase = boxes[i].toLowerCase(); // 将盒子字符串转为小写字母
                List<Character> letters = new ArrayList<>(); // 创建一个字符列表，用于存储盒子中的字母
    
                // 遍历盒子中的每个字符
                for (char c : lowerCase.toCharArray()) {
                    if (c >= 'a' && c <= 'z') { // 如果是小写字母
                        letters.add(c); // 将其加入字符列表
                    }
                }
    
                letters = letters.stream().sorted().collect(Collectors.toList()); // 将字符列表按字典序排序
                StringBuilder builder = new StringBuilder(); // 创建一个StringBuilder对象，用于拼接排好序的字母
    
                // 遍历排好序的字母列表
                for (Character c : letters) {
                    builder.append(c); // 将每个字母加入StringBuilder中
                }
    
                if (builder.toString().equals(password)) { // 如果拼接后的字符串与密-码相等
                    result = i + 1; // 将结果设为当前盒子的编号
                    break; // 跳出循环
                }
            }
    
            System.out.println(result); // 输出结果
        }
    }
    

#### Python

    
    
    # 导入所需模块
    import sys
    from typing import List
    from functools import cmp_to_key
    
    # 定义比较函数，用于按字典序排序
    def cmp(a: str, b: str) -> int:
        if a < b:
            return -1
        elif a > b:
            return 1
        else:
            return 0
    
    # 读取输入
    password = sys.stdin.readline().strip()
    boxes = sys.stdin.readline().strip().split()
    
    result = -1 # 初始化结果为-1，表示未找到
    
    # 遍历所有盒子
    for i in range(len(boxes)):
        lower_case = boxes[i].lower() # 将盒子字符串转为小写字母
        letters = [] # 创建一个字符列表，用于存储盒子中的字母
    
        # 遍历盒子中的每个字符
        for c in lower_case:
            if c >= 'a' and c <= 'z': # 如果是小写字母
                letters.append(c) # 将其加入字符列表
    
        letters.sort(key=cmp_to_key(cmp)) # 将字符列表按字典序排序
        builder = [] # 创建一个列表，用于拼接排好序的字母
    
        # 遍历排好序的字母列表
        for c in letters:
            builder.append(c) # 将每个字母加入列表中
    
        if ''.join(builder) == password: # 如果拼接后的字符串与密-码相等
            result = i + 1 # 将结果设为当前盒子的编号
            break # 跳出循环
    
    print(result) # 输出结果
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

