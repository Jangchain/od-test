#### 题目描述

某网上商场举办优惠活动，发布了满减、打折、无门槛3种[优惠券](https://so.csdn.net/so/search?q=%E4%BC%98%E6%83%A0%E5%88%B8&spm=1001.2101.3001.7020)，分别为：

  * 每满100元优惠10元，无使用数限制，如100199元可以使用1张减10元，200299可使用2张减20元，以此类推；
  * 92折券，1次限使用1张，如100元，则优惠后为92元；
  * 无门槛5元优惠券，无使用数限制，直接减5元。

优惠券使用限制

  * 每次最多使用2种优惠券，2种优惠可以叠加（优惠叠加时以优惠后的价格计算），以购物200元为例，可以先用92折券优惠到184元，再用1张满减券优惠10元，最终价格是174元，也可以用满减券2张优惠20元为180元，再使用92折券优惠到165（165.6向下取整），不同使用顺序的优惠价格不同，以最优惠价格为准。在一次购物种，同一类型优惠券使用多张时必须一次性使用，不能分多次拆开使用（不允许先使用1张满减券，再用打折券，再使用一张满减券）。

问题

  * 请设计实现一种解决方法，帮助购物者以最少的优惠券获得最优的优惠价格。优惠后价格越低越好，同等优惠价格，使用的优惠券越少越好，可以允许某次购物不使用优惠券。

约定

  * 优惠活动每人只能参加一次，每个人的优惠券种类和数量是一样的。

#### 输入描述

  * 第一行：每个人拥有的优惠券数量（数量取值范围为[0,10]），按满减、打折、无门槛的顺序输入
  * 第二行：表示购物的人数n（1 ≤ n ≤ 10000）
  * 最后n行：每一行表示某个人优惠前的购物总价格（价格取值范围(0, 1000] ，都为整数）。
  * 约定：输入都是符合题目设定的要求的。

#### 输出描述

  * 每行输出每个人每次购物优惠后的最低价格以及使用的优惠券总数量
  * 每行的输出顺序和输入的顺序保持一致

#### 备注

  1. 优惠券数量都为整数，取值范围为[0, 10]
  2. 购物人数为整数，取值范围为[1, 10000]
  3. 优惠券的购物总价为整数，取值范围为 (0, 1000]
  4. 优惠后价格如果是小数，则向下取整，输出都为整数。

#### 用例

输入| 3 2 5  
3  
100  
200  
400  
---|---  
输出| 65 6  
155 7  
338 4  
说明| 输入：

  * 第一行：3种优惠券数量分别为：满减券3张，打折券2张，无门槛5张
  * 第二行：总共3个人购物
  * 第三行：第一个人购物优惠前价格为100元
  * 第四行：第二个人购物优惠前价格为200元
  * 第五行：第三个人购物优惠前价格为400元

输入3个人，输出3行结果，同输入的顺序，对应每个人的优惠结果，如下：

  * 第一行输出：先使用1张满减券优惠到90元，再使用5张无门槛券优惠到25元，最终价格是65元，总共使用6张优惠券。
  * 第二行输出：先使用2张满减券优惠到180元，再使用5张无门槛券优惠到25元，最终价格是155元，总共使用7张优惠券。
  * 第三行输出：先使用1张92折券优惠到368元，再使用3张满减券优惠到30元，最终价格是338元，总共使用4张优惠券。

  
  
#### 题目解析

有道差不多的题目

[【华为OD机试 2023】 网上商城优惠活动（C++ Java Javascript Python）_算法大师的博客-
CSDN博客](https://blog.csdn.net/banxia_frontend/article/details/129287361)

**主要分四种情况：**

  * **先满减，再打折**

  * **先打折，再满减**

  * **先满减，再无门槛**

  * **先打折，再无门槛**

**注：因为无门槛是直接减，所以不能在满减和打折前面。**

**还需考虑到优惠券是0的情况，因为满减和无门槛都是与张数有关，**

**所有我们只考虑了有无打折券的情况。**

#### C++

    
    
    #include <iostream>
    #include <algorithm>
    #include <vector>
    #include <sstream>
    
    using namespace std;
    
    //先满减后打折的计算方式
    vector<int> getModeA(int price, int m, int n) {
        int count = 0;
        count += min(m, price / 100);
        price -= count * 10;
        price *= 0.92;
        count += 1;
        return vector<int>{price, count};
    }
    
    //先打折后满减的计算方式
    vector<int> getModeB(int price, int m, int n) {
        int count = 0;
        price *= 0.92;
        count += 1;
        count += min(m, price / 100);
        price -= (count-1) * 10;
        return vector<int>{price, count};
    }
    
    //先满减后无门槛的计算方式
    vector<int> getModeC(int price, int m, int k) {
        int count = 0;
        count += min(m, price / 100);
        price -= count * 10;
        for (int i=0; i<k; i++) {
            price -= 5;
            count += 1;
            if (price < 0) {
                break;
            }
        }
        return vector<int>{price, count};
    }
    
    //先打折后无门槛的计算方式
    vector<int> getModeD(int price, int n, int k) {
        int count = 0;
        price *= 0.92;
        count += 1;
        for (int i=0; i<k; i++) {
            price -= 5;
            count += 1;
            if (price < 0) {
                break;
            }
        }
        return vector<int>{price, count};
    }
    
    int main() {
        string line;
        getline(cin, line);
    
        //获取输入参数
        stringstream ss(line);
        int m, n, k;
        ss >> m >> n >> k;
    
        getline(cin, line);
        int x = stoi(line);
    
        while (getline(cin, line)) {
            int price = stoi(line);
    
            vector<vector<int>> result(4, vector<int>(2, 0));
    
            //分别调用4种计算方式，得到方案及其需要的优惠券数量
            result[0] = getModeA(price, m, n);
            result[1] = getModeB(price, m, n);
            result[2] = getModeC(price, m, k);
            result[3] = getModeD(price, n, k);
    
            //按照价格降序排序，如果价格相同，则按照优惠券数量降序排序
            sort(result.begin(), result.end(), [](const vector<int>& a, const vector<int>& b) {
                if (a[0] != b[0]) {
                    return a[0] < b[0];
                } else {
                    return a[1] < b[1];
                }
            });
    
            //输出最佳方案所需的优惠券数量
            cout << result[0][0] << " " << result[0][1] << endl;
        }
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const inputLines = [];
    let m, n, k, x;
    
    rl.on("line", (line) => {
      inputLines.push(line);
    
      if (inputLines.length === 1) {
        [m, n, k] = inputLines[0].split(" ").map(Number);
      }
    
      if (inputLines.length === 2) {
        x = parseInt(inputLines[1]);
      }
    
      if (x && inputLines.length === x + 2) {
        inputLines.shift();
        inputLines.shift();
    
        const prices = inputLines.map(Number);
    
        getResult(prices, m, n, k);
    
        inputLines.length = 0;
      }
    });
    
    /**
     * @param {*} prices 几个人打折之前的商品总价
     * @param {*} m 满减券数量
     * @param {*} n 打折券数量
     * @param {*} k 无门槛券数量
     */
    function getResult(prices, m, n, k) {
      for (let price of prices) {
        const ans = [];
    
        const [resMPrice, resMCount] = M(price, m); // 先满减
        const [resMNPrice, resMNCount] = N(resMPrice, n); // 满减后打折
        ans.push([resMNPrice, m + n - (resMCount + resMNCount)]); // resMNPrice是 “满减后打折” 的剩余总价， m + n - resMCount - resMNCount 是 该种用券方式的: 总券数 m+n， 剩余券数 resMCount + resMNCount, 因此使用掉的券数： m+n - (resMCount + resMNCount)
    
        const [resMKPrice, resMKCount] = K(resMPrice, k); // 满减后无门槛
        ans.push([resMKPrice, m + k - (resMCount + resMKCount)]);
    
        const [resNPrice, resNCount] = N(price, n); // 先打折
        const [resNMPrice, resNMCount] = M(resNPrice, m); // 打折后满减
        ans.push([resNMPrice, n + m - (resNCount + resNMCount)]);
    
        const [resNKPrice, resNKCount] = K(resNPrice, k); // 打折后无门槛
        ans.push([resNKPrice, n + k - (resNCount + resNKCount)]);
    
        ans.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])); // 对ans进行排序，排序规则是：优先按剩余总价升序，如果剩余总价相同，则再按“使用掉的券数量”升序
    
        console.log(ans[0].join(" "));
      }
    }
    
    /**
     * @param {*} price 总价
     * @param {*} m 满减券数量
     * @returns 总价满减后结果，对应数组含义是 [用券后剩余总价， 剩余满减券数量]
     */
    function M(price, m) {
      const maxCount = price / 100; // 满100最多用1张满减券，满200最多用2张满减券....，price总价最多使用price/100张券
      const count = Math.min(m, maxCount); // 实际可使用的满减券数量
    
      price -= count * 10;
      m -= count;
    
      return [price, m];
    }
    
    /**
     * @param {*} price 总价
     * @param {*} n 打折券数量
     * @returns 总价打折后结果，对应数组含义是 [用券后剩余总价， 剩余打折券数量]
     */
    function N(price, n) {
      if (n >= 1) {
        price = Math.floor(price * 0.92);
      }
      return [price, n - 1];
    }
    
    /**
     * @param {*} price 总价
     * @param {*} k 无门槛券数量
     * @returns 无门槛券用后结果，对应数组含义是 [用券后剩余总价， 剩余无门槛券数量]
     */
    function K(price, k) {
      while (price > 0 && k > 0) {
        price -= 5;
        price = Math.max(price, 0); // 无门槛券过多会导致优惠后总价小于0，此时我们应该避免
        k--;
      }
      return [price, k];
    }
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.Arrays;
    import java.util.List;
    import java.util.stream.Collectors;
    
    public class CouponCalculation {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); 
    
        //获取输入参数
        List<Integer> params = Arrays.stream(scanner.nextLine().split(" "))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
        int m = params.get(0);
        int n = params.get(1);
        int k = params.get(2);
    
        int x = Integer.parseInt(scanner.nextLine());
    
        while (scanner.hasNext()) {          
            int price = Integer.parseInt(scanner.nextLine());
    
            int[][] result = new int[4][2];
    
            //分别调用4种计算方式，得到方案及其需要的优惠券数量
            result[0] = getModeA(price, m, n);
            result[1] = getModeB(price, m, n);
            result[2] = getModeC(price, m, k);
            result[3] = getModeD(price, n, k);
    
            //按照价格降序排序，如果价格相同，则按照优惠券数量降序排序
            Arrays.sort(result, (int[] a, int[] b) -> {
                if (a[0] != b[0]) {
                    return a[0] - b[0];
                } else {
                    return a[1] - b[1];
                }
            });
    
            //输出最佳方案所需的优惠券数量
            System.out.print(result[0][0]);
            System.out.print(" ");
            System.out.println(result[0][1]);
        }
    
        scanner.close();
    }
    
    /**
     * 先满减后打折的计算方式
     */
    public static int[] getModeA(int price, int m, int n) {
        int count = 0;
        count += Math.min(m, price / 100);
        price -= count * 10;
        price *= 0.92;
        count += 1;
        return new int[]{price, count};
    }
    
    /**
     * 先打折后满减的计算方式
     */
    public static int[] getModeB(int price, int m, int n) {
        int count = 0;
        price *= 0.92;
        count += 1;
        count += Math.min(m, price / 100);
        price -= (count-1) * 10;
        return new int[]{price, count};
    }
    
    /**
     * 先满减后无门槛的计算方式
     */
    public static int[] getModeC(int price, int m, int k) {
        int count = 0;
        count += Math.min(m, price / 100);
        price -= count * 10;
        for (int i=0; i<k; i++) {
            price -= 5;
            count += 1;
            if (price < 0) {
                break;
            }
        }
        return new int[]{price, count};
    }
    
    /**
     * 先打折后无门槛的计算方式
     */
    public static int[] getModeD(int price, int n, int k) {
        int count = 0;
        price *= 0.92;
        count += 1;
        for (int i=0; i<k; i++) {
            price -= 5;
            count += 1;
            if (price < 0) {
                break;
            }
        }
        return new int[]{price, count};
    }
    }
    

#### Python

    
    
    m_quantity, n_quantity, k_quantity = map(int, input().split())
    
    x = int(input())
    
    prices = []
    for i in range(x):
        prices.append(int(input()))
    
    
    def full_subtraction(price, m):
        """
        满减规则
        :param price: 总价
        :param m: 满减券数量
        :return: 总价满减后结果，对应数组含义是 (用券后剩余总价， 剩余满减券数量)
        """
        max_count = int(price / 100)  # 满100最多用1张满减券，满200最多用2张满减券....，price总价最多使用price/100张券
        count = min(m, max_count)  # 实际可使用的满减券数量
    
        price -= count * 10
        m -= count
    
        return price, m
    
    
    def discount(price, n):
        """
        打折规则
        :param price: 总价
        :param n: 打折券数量
        :return: 总价打折后结果，对应数组含义是 (用券后剩余总价， 剩余打折券数量)
        """
        if n >= 1:
            price = int(price * 0.92)
        return price, n - 1
    
    
    def threshold_free(price, k):
        """
        无门槛你规则
        :param price: 总价
        :param k: 无门槛券数量
        :return: 门槛券用后结果，对应数组含义是 (用券后剩余总价， 剩余无门槛券数量)
        """
        while price > 0 and k > 0:
            price -= 5
            price = max(price, 0)  # 无门槛券过多会导致优惠后总价小于0，此时我们应该避免
            k -= 1
        return price, k
    
    
    for price in prices:
        ans = []
    
        res_m = full_subtraction(price, m_quantity)  # 先满减
    
        res_mn_n = discount(res_m[0], n_quantity)  # 满减后打折
        ans.append((res_mn_n[0], m_quantity + n_quantity - (res_m[1] + res_mn_n[1])))  # m + n 是满减后打折方式的总券数量， res_m[1] + res_mn_n[1] 是满减券剩余数+打折券剩余数
    
        res_mk_k = threshold_free(res_m[0], k_quantity)  # 满减后无门槛
        ans.append((res_mk_k[0], m_quantity + k_quantity - (res_m[1] + res_mk_k[1])))
    
        res_n = discount(price, n_quantity)  # 先打折
    
        res_nm_m = full_subtraction(res_n[0], m_quantity)  # 打折后满减
        ans.append((res_nm_m[0], n_quantity + m_quantity - (res_n[1] + res_nm_m[1])))
    
        res_nk_k = threshold_free(res_n[0], k_quantity)  # 打折后无门槛
        ans.append((res_nk_k[0], n_quantity + k_quantity - (res_n[1] + res_nk_k[1])))
    
        ans.sort(key=lambda x: (x[0], x[1]))
    
        print(" ".join(map(str, ans[0])))
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

