## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

3020年，空间通信集团的员工人数突破20亿人，即将遇到现有工号不够用的窘境。

现在，请你负责调研新工号系统。继承历史传统，新的工号系统由小写英文字母（a-z）和数字（0-9）两部分构成。

新工号由一段英文字母开头，之后跟随一段数字，比如”aaahw0001″,”a12345″,”abcd1″,”a00″。

注意新工号不能全为字母或者数字,允许数字部分有前导0或者全为0。

但是过长的工号会增加同事们的记忆成本，现在给出新工号至少需要分配的人数X和新工号中字母的长度Y，求新工号中数字的最短长度Z。

## 输入描述

一行两个非负整数 X Y，用数字用单个空格分隔。

0< X <=2^50 – 1

0< Y <=5

## 输出描述

输出新工号中数字的最短长度Z

## 示例1

输入

    
    
    260 1
    

输出

    
    
    1
    

说明

> 无

## 示例2

输入

    
    
    26 1
    

输出

    
    
    1
    

说明

> 数字长度不能为0

## 示例3

输入

    
    
    2600 1
    

输出

    
    
    2
    

说明

> ## 解题思路

这是一个数学问题，我们需要找到一个最小的数字长度Z，使得26的Y次方乘以10的Z次方大于等于X。这是因为26个小写字母可以组成26的Y次方种可能，10个数字可以组成10的Z次方种可能，所以总共可以组成26的Y次方乘以10的Z次方种工号。我们需要找到最小的Z使得这个数大于等于X。

下面我来分解为几个关键点来解释。

### 题目分析

#### 1\. 工号的构成：

工号由两部分构成：

  * 一段英文字母（小写字母 a-z）
  * 一段数字（数字0-9）

新工号必须以字母开头，然后是数字部分。数字部分可以有前导0或全为0。

#### 2\. 工号生成规则：

假设字母部分长度为 `Y`，那么字母部分可以生成的不同组合数为  2 6 Y 26^Y
26Y（因为每个位置可以是26个字母中的一个）。这代表着，当字母长度固定为 `Y` 时，数字部分的长度 `Z` 决定了能够生成的工号总数。

#### 3\. 数字部分的长度计算：

对于给定的字母部分长度 `Y`，总共有  2 6 Y 26^Y 26Y 种不同的字母组合。每种字母组合对应一段数字部分。如果我们要生成 `X`
个不同的工号，那么数字部分的长度 `Z` 需要满足以下条件：

1 0 Z × 2 6 Y ≥ X 10^Z \times 26^Y \geq X 10Z×26Y≥X

因此，数字部分的最小长度 `Z` 可以通过计算以下公式得到：

Z = ⌈ log ⁡ 10 ( X 2 6 Y ) ⌉ Z = \lceil \log_{10}(\frac{X}{26^Y}) \rceil
Z=⌈log10​(26YX​)⌉

其中， ⌈ ⋅ ⌉ \lceil \cdot \rceil ⌈⋅⌉ 表示向上取整的操作，保证数字部分长度足够大以生成 `X` 个不同的工号。

### 输入和输出

#### 输入：

  * `X`: 需要生成的工号数量
  * `Y`: 工号中字母部分的长度

#### 输出：

  * `Z`: 工号中数字部分的最短长度

### 示例解释

  * **示例1** :

    * 输入 `260 1`：字母部分长度为1，即 `26^1 = 26` 种组合方式。为了生成260个工号，需要数字部分长度为1，因为 `10^1 = 10`，结合 `26 \times 10 = 260`，正好可以生成260个工号。
    * 输出：1
  * **示例2** :

    * 输入 `26 1`：字母部分长度为1，即 `26^1 = 26` 种组合方式。只需生成26个工号，数字部分长度为1已经足够。
    * 输出：1
  * **示例3** :

    * 输入 `2600 1`：字母部分长度为1，即 `26^1 = 26` 种组合方式。为了生成2600个工号，需要数字部分长度为2，因为 `10^2 = 100`，结合 `26 \times 100 = 2600`，可以生成2600个工号。
    * 输出：2

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            long num_people = scanner.nextLong();
            long len_letter = scanner.nextLong();
            long min_len_num = Math.max(1L, (long) Math.ceil(Math.log10(num_people / Math.pow(26, len_letter))));
            System.out.println(min_len_num);
            scanner.close();
        }
    }
    
    

## Python

    
    
    import math
    
    num_people, len_letter = map(int, input().split())
    min_len_num = max(1, math.ceil(math.log10(num_people / pow(26, len_letter))))
    print(min_len_num)
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const [num_people, len_letter] = input.split(' ').map(Number);
      const min_len_num = Math.max(1, Math.ceil(Math.log10(num_people / Math.pow(26, len_letter))));
      console.log(min_len_num);
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <cmath>
    using namespace std;
    
    int main() {
        long long num_people, len_letter;
        cin >> num_people >> len_letter;
        long long min_len_num = max(1LL, (long long) ceil(log10(num_people / pow(26, len_letter))));
        cout << min_len_num << endl;
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <math.h>
    
    int main() {
        long long num_people, len_letter;
        
        scanf("%lld %lld", &num_people, &len_letter);
        
        long long min_len_num = (long long) fmax(1.0, ceil(log10(num_people / pow(26, len_letter))));
        
        printf("%lld\n", min_len_num);
        
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

