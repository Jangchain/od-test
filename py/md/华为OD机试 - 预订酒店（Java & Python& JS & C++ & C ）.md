## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

放暑假了，小明决定到某旅游景点游玩，他在网上搜索到了各种价位的酒店（长度为n的数组A），他的心理价位是x元，请帮他筛选出k个最接近x元的酒店（n>=k>0）,并**由低到高**
打印酒店的价格。

## 输入描述

第一行：n, k, x  
第二行：A[0] A[1] A[2]…A[n-1]

## 输出描述

从低到高打印筛选出的酒店价格

## 示例1

输入

    
    
    10 5 6
    1 2 3 4 5 6 7 8 9 10
    

输出

    
    
    4 5 6 7 8
    

说明

> ## 示例2

输入

    
    
    10 4 6
    10 9 8 7 6 5 4 3 2 1
    

输出

    
    
    4 5 6 7
    

说明

## 示例3

输入

    
    
    6 3 1000
    30 30 200 500 70 300
    

输出

    
    
    200 300 500
    

说明

> ## 解题思路

##### 输入解释

  * 第一行包含三个整数 `n`、`k` 和 `x`： 
    * `n`：酒店价格数组的长度，即有 `n` 个酒店。
    * `k`：需要选择的最接近心理价位 `x` 的酒店数量。
    * `x`：用户的心理价位。
  * 第二行是酒店价格数组 `A`，其中 `A[0]` 到 `A[n-1]` 代表不同酒店的价格。

  4. 

##### 示例说明

  * **示例 1**  
输入：

    
        10 5 6
    1 2 3 4 5 6 7 8 9 10
    

解释：

    * 用户心理价位是 `6`。
    * 每个价格与 `6` 的差距分别是：`5`，`4`，`3`，`2`，`1`，`0`，`1`，`2`，`3`，`4`。
    * 按差距排序后，最接近的 5 个价格为：`4`，`5`，`6`，`7`，`8`。
    * 最终输出为：`4 5 6 7 8`。
  * **示例 2**  
输入：

    
        10 4 6
    10 9 8 7 6 5 4 3 2 1
    

解释：

    * 用户心理价位是 `6`。
    * 每个价格与 `6` 的差距分别是：`4`，`3`，`2`，`1`，`0`，`1`，`2`，`3`，`4`，`5`。
    * 按差距排序后，最接近的 4 个价格为：`4`，`5`，`6`，`7`。
    * 最终输出为：`4 5 6 7`。
  * **示例 3**  
输入：

    
        6 3 1000
    30 30 200 500 70 300
    

解释：

    * 用户心理价位是 `1000`。
    * 每个价格与 `1000` 的差距分别是：`970`，`970`，`800`，`500`，`930`，`700`。
    * 按差距排序后，最接近的 3 个价格为：`200`，`300`，`500`。
    * 最终输出为：`200 300 500`。

#### 解题思路

  1. 优先选择价格最接近心理价位的酒店，若两家酒店和心理价位差价相同，则选择价格较低的酒店。(比如100元和300元距离心理价位200元同样接近，此时选择100元)
  2. 酒店价格可能相同重复

## Java

    
    
    import java.util.Scanner;
    import java.util.Arrays;
    import java.util.Comparator;
    import java.util.List;
    import java.util.ArrayList;
    import java.util.stream.Collectors;
    
    class Main {
        
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 输入酒店数量、需要选择的酒店数量、心理价位
            int n = scanner.nextInt(); // 酒店的数量
            int k = scanner.nextInt(); // 需要选择的最接近心理价位的酒店数量
            int x = scanner.nextInt(); // 心理价位
            
            // 输入酒店价格并存入数组
            int[] A = new int[n]; // 酒店价格数组
            for (int i = 0; i < n; i++) {
                A[i] = scanner.nextInt(); // 读取每一个酒店价格
            }
            
            // 将酒店价格数组从小到大排序
            Arrays.sort(A);
     
            // 创建一个二维数组，存储每个酒店价格以及它与心理价位的差距
            int[][] priceDiff = new int[n][2]; // 二维数组，第一列是酒店价格，第二列是与心理价位的差值
            for (int i = 0; i < n; i++) {
                int price = A[i]; // 获取当前酒店的价格
                priceDiff[i][0] = price; // 存储酒店价格
                priceDiff[i][1] = Math.abs(price - x); // 计算并存储酒店价格与心理价位的绝对差值
            }
     
            // 使用 Java 流进行排序，根据差值从小到大排序
            List<int[]> sortedPrices = Arrays.stream(priceDiff)
                .sorted(Comparator.comparingInt(h -> h[1])) // 按与心理价位的差值进行排序
                .collect(Collectors.toList()); // 将排序结果转化为 List
     
            // 创建一个列表，存储前 k 个最接近心理价位的酒店价格
            List<Integer> selectedPrices = new ArrayList<>();
            for (int i = 0; i < k; i++) {
                selectedPrices.add(sortedPrices.get(i)[0]); // 选取排序后的前 k 个酒店价格
            }
     
            // 将挑选出的酒店价格从小到大排序
            selectedPrices.sort(Integer::compareTo); // 按照酒店价格从小到大排序
     
            // 按顺序打印 k 个酒店价格，并用空格分隔
            for (int i = 0; i < selectedPrices.size(); i++) {
                System.out.print(selectedPrices.get(i)); // 打印酒店价格
                if (i != selectedPrices.size() - 1) { // 如果不是最后一个元素，则打印空格
                    System.out.print(" ");
                }
            }
        }
    }
    

## Python

    
    
    n, k, x = map(int, input().split())
    prices = list(map(int, input().split()))
    
    sorted_prices = sorted(prices)
    price_rating = sorted([(price, abs(price - x)) for price in sorted_prices], key=lambda item: item[1])
    picked_price = sorted(item[0] for item in price_rating[:k])
    
    print(' '.join(map(str, picked_price)))
    
     
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const [n, k, x] = input.split(' ').map(Number);
      let prices = [];
      rl.on('line', (input) => {
        prices = input.split(' ').map(Number);
        const sortedPrices = prices.sort((a, b) => a - b);
        const priceRating = sortedPrices.map(price => [price, Math.abs(price - x)]).sort((a, b) => a[1] - b[1]);
        const pickedPrice = priceRating.slice(0, k).map(item => item[0]).sort((a, b) => a - b);
        console.log(pickedPrice.join(' '));
      });
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    /* 自定义排序函数，按照酒店价格与目标价位的差值从小到大排序 */
    bool cmp(pair<int, int> x, pair<int, int> y)
    {
        return x.second < y.second;
    }
    
    int main()
    {
        int n, k, x;
        cin >> n >> k >> x; // 输入酒店数量n、需要选择的酒店数量k和目标价位x
        vector<int> prices(n);
        for (int i = 0; i < n; i++)
        {
            cin >> prices[i]; // 输入每个酒店的价格
        }
        sort(prices.begin(), prices.end()); // 将酒店价格从小到大排序
        vector<pair<int, int>> price_rating;
        for (int i = 0; i < prices.size(); i++)
        {
            price_rating.push_back(make_pair(prices[i], abs(prices[i] - x))); // 计算每个酒店价格与目标价位的差值，并存入pair中
        }
        sort(price_rating.begin(), price_rating.end(), cmp); // 按照差值从小到大排序
    
        vector<int> picked_price;
        for (int i = 0; i < k; i++)
        {
            picked_price.push_back(price_rating[i].first); // 取出差值最小的k个酒店的价格
        }
        sort(picked_price.begin(), picked_price.end()); // 将选出的酒店价格从小到大排序
    
        for (int i = 0; i < picked_price.size(); i++)
        {
            cout << picked_price[i]; // 输出选出的酒店价格
            if (i != picked_price.size() - 1)
            {
                cout << " "; // 输出空格，除了最后一个酒店价格
            }
        }
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX_N 1000 // 假设酒店数量的最大值为1000
    
    // 定义结构体来存储酒店价格与目标价位差值
    typedef struct {
        int price;   // 酒店价格
        int diff;    // 酒店价格与目标价位的差值
    } Hotel;
    
    // 自定义排序函数，按照酒店价格与目标价位的差值从小到大排序
    int cmp(const void* a, const void* b) {
        Hotel* hotelA = (Hotel*)a;
        Hotel* hotelB = (Hotel*)b;
        return hotelA->diff - hotelB->diff;
    }
    
    // 比较函数，用于排序酒店价格从小到大
    int cmp_price(const void* a, const void* b) {
        return (*(int*)a) - (*(int*)b);
    }
    
    int main() {
        int n, k, x;
        scanf("%d %d %d", &n, &k, &x); // 输入酒店数量n、需要选择的酒店数量k和目标价位x
    
        int prices[MAX_N]; // 酒店价格数组
        for (int i = 0; i < n; i++) {
            scanf("%d", &prices[i]); // 输入每个酒店的价格
        }
    
        // 对酒店价格从小到大排序
        qsort(prices, n, sizeof(int), cmp_price);
    
        Hotel price_rating[MAX_N]; // 存储酒店价格和与目标价位的差值的数组
        for (int i = 0; i < n; i++) {
            price_rating[i].price = prices[i]; // 存储酒店价格
            price_rating[i].diff = abs(prices[i] - x); // 计算酒店价格与目标价位的差值
        }
    
        // 根据差值对酒店价格进行排序
        qsort(price_rating, n, sizeof(Hotel), cmp);
    
        int picked_price[MAX_N]; // 选出的k个酒店价格
        for (int i = 0; i < k; i++) {
            picked_price[i] = price_rating[i].price; // 取出差值最小的k个酒店的价格
        }
    
        // 将选出的k个酒店价格从小到大排序
        qsort(picked_price, k, sizeof(int), cmp_price);
    
        // 输出选出的酒店价格
        for (int i = 0; i < k; i++) {
            printf("%d", picked_price[i]);
            if (i != k - 1) {
                printf(" "); // 输出空格，除了最后一个酒店价格
            }
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

## 完整用例

### 用例1

    
    
    10 5 6
    1 2 3 4 5 6 7 8 9 10
    

### 用例2

    
    
    10 4 6
    10 9 8 7 6 5 4 3 2 1
    

### 用例3

    
    
    6 3 1000
    30 30 200 500 70 300
    

### 用例4

    
    
    5 3 50
    30 40 50 60 70
    

### 用例5

    
    
    6 4 25
    10 20 30 40 50 60
    

### 用例6

    
    
    7 2 100
    90 80 70 60 50 40 30
    

### 用例7

    
    
    8 3 15
    10 20 30 40 50 60 70 80
    

### 用例8

    
    
    5 5 45
    10 20 30 40 50
    

### 用例9

    
    
    4 2 75
    60 70 80 90
    

### 用例10

    
    
    8 5 55
    10 20 30 40 50 60 70 80
    

