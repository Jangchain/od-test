#### 题目描述

模拟商场优惠打折，有三种[优惠券](https://so.csdn.net/so/search?q=%E4%BC%98%E6%83%A0%E5%88%B8&spm=1001.2101.3001.7020)可以用，满减券、打折券和无门槛券。

满减券：满100减10，满200减20，满300减30，满400减40，以此类推不限制使用；

打折券：固定折扣92折，且打折之后[向下取整](https://so.csdn.net/so/search?q=%E5%90%91%E4%B8%8B%E5%8F%96%E6%95%B4&spm=1001.2101.3001.7020)，每次购物只能用1次；

无门槛券：一张券减5元，没有使用限制。

每个人结账使用优惠券时有以下限制：

每人每次只能用两种优惠券，并且同一种优惠券必须一次用完，不能跟别的穿插使用（比如用一张满减，再用一张打折，再用一张满减，这种顺序不行）。

求不同使用顺序下每个人用完券之后得到的最低价格和对应使用优惠券的总数；如果两种顺序得到的价格一样低，就取使用优惠券数量较少的那个。

#### 输入描述

第一行三个数字m,n,k，分别表示每个人可以使用的满减券、打折券和无门槛券的数量;

第二行一个数字x, 表示有几个人购物;

后面x行数字，依次表示是这几个人打折之前的商品总价。

#### 输出描述

输出每个人使用券之后的最低价格和对应使用优惠券的数量

#### 用例

输入| 3 2 5  
3  
100  
200  
400  
---|---  
输出| 65 6  
135 8  
275 8  
说明| 输入：第一行三个数字m,n,k，分别表示每个人可以使用的满减券、打折券和无门槛券的数量。输出：第一个人使用 1
张满减券和5张无门槛券价格最低。（100-10=90, 90-5*5=65）第二个人使用 3
张满减券和5张无门槛券价格最低。（200-20-10-10=160, 160 – 5*5 = 135）第二个人使用 3
张满减券和5张无门槛券价格最低。（400-40-30-30=300, 300 – 5*5=275）  
  
#### 题目解析

本题的解题思路如下，首先实现满减，打折，无门槛的逻辑：

  * 满减逻辑，只要总价price大于等于100，且还有满减券，则不停price -= Math.floor(price / 100) * 10; 直到总价price小于100，或者满减券用完。
  * 打折逻辑，按照题目意思，打折券只能使用一次，因此无论打折券有多少张，都只能使用一次，因此只要打折券数量大于等于1，那么price = Math.floor(price * 0.92);
  * 无门槛逻辑，只要总价price大于0，且还有无门槛券，则不停price -= 5; 直到price小于等于0，或者无门槛券用完。

接下来就是求上面三种逻辑的任选2个的排列：

假设满减是M，打折是N，无门槛是K，则有排列如下：

  * MN、NM
  * MK、KM
  * NK、KN

注意，券的使用对顺序敏感。

因此，求出以上排列后，对每个人的总价使用六种方式减价，只保留减价最多，用券最少的那个。

优化思路：

对于无门槛券的使用，无门槛券总是在最后使用才会最优。

对于满减来说，无门槛肯定是最后使用最优惠，

对于92折来说，

  * 先用无门槛后打折(x-5y)*0.92 = x*0.92 - 5*0.92*y
  * 先打折后用无门槛 x*0.92 - 5y

对比可以看出，先92折，再无门槛最优惠，因此确实可以直接排除KM和KN的情况，即先无门槛的情况。

#### 代码思路

这是一道模拟题，主要思路是对每个购物者依次计算不同优惠券使用顺序下的最低价格和对应使用优惠券的总数。具体实现如下：

  1. 首先读入每个人可以使用的满减券、打折券和无门槛券的数量，以及有几个人购物和每个人的商品总价。

  2. 对每个人的商品总价，分别计算满减券和打折券、满减券和无门槛券、打折券和满减券、打折券和无门槛券四种优惠券使用顺序下的最低价格和对应使用优惠券的总数。

  3. 将四种优惠券使用顺序下的最低价格和对应使用优惠券的总数存储到一个 List 中，并按照价格和使用优惠券数量排序。

  4. 输出最低价格和对应使用优惠券的总数。

  5. 重复以上步骤，直到处理完所有购物者的商品总价。

注意，满减券和打折券、满减券和无门槛券、打折券和满减券、打折券和无门槛券四种优惠券使用顺序下的使用顺序必须一次用完，不能跟别的穿插使用。因此，在计算满减券和打折券、满减券和无门槛券、打折券和满减券、打折券和无门槛券四种优惠券使用顺序下的最低价格和对应使用优惠券的总数时，需要分别计算每种优惠券使用后的商品总价，并在计算下一种优惠券使用时使用这个商品总价。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    vector<int> prices; // 保存每个人的商品总价
    
    // 满减券
    pair<int, int> fullSubtraction(int price, int m) {
        while (price >= 100 && m > 0) {
            price -= (price / 100) * 10;
            m--;
        }
        return make_pair(price, m);
    }
    
    // 打折券
    pair<int, int> discount(int price, int n) {
        if (n >= 1) {
            price = price * 0.92;
            n--;
        }
        return make_pair(price, n);
    }
    
    // 无门槛券
    pair<int, int> thresholdFree(int price, int k) {
        while (price > 0 && k > 0) {
            price -= 5;
            price = max(price, 0);
            k--;
        }
        return make_pair(price, k);
    }
    
    int main() {
        int m, n, k;
        cin >> m >> n >> k; // 输入每个人可以使用的优惠券数量
    
        int x;
        cin >> x; // 输入购物人数
    
        for (int i = 0; i < x; i++) {
            int price;
            cin >> price; // 输入每个人的商品总价
            prices.push_back(price);
        }
    
        for (int price : prices) { // 遍历每个人的商品总价
            vector<pair<int, int>> ans; // 保存每种优惠券的使用情况
    
            // 情况1：先使用满减券再使用打折券
            pair<int, int> resM = fullSubtraction(price, m);
            pair<int, int> resMN_N = discount(resM.first, n);
            ans.push_back(make_pair(resMN_N.first, m + n - (resM.second + resMN_N.second)));
    
            // 情况2：先使用满减券再使用无门槛券
            pair<int, int> resMK_K = thresholdFree(resM.first, k);
            ans.push_back(make_pair(resMK_K.first, m + k - (resM.second + resMK_K.second)));
    
            // 情况3：先使用打折券再使用满减券
            pair<int, int> resN = discount(price, n);
            pair<int, int> resNM_M = fullSubtraction(resN.first, m);
            ans.push_back(make_pair(resNM_M.first, n + m - (resN.second + resNM_M.second)));
    
            // 情况4：先使用打折券再使用无门槛券
            pair<int, int> resNK_K = thresholdFree(resN.first, k);
            ans.push_back(make_pair(resNK_K.first, n + k - (resN.second + resNK_K.second)));
    
            sort(ans.begin(), ans.end(), [](pair<int, int> a, pair<int, int> b) {
                if (a.first != b.first) { // 如果价格不同，按价格升序排序
                    return a.first < b.first;
                } else { // 如果价格相同，按使用优惠券数量升序排序
                    return a.second < b.second;
                }
            });
    
            cout << ans[0].first << " " << ans[0].second << endl; // 输出最低价格和对应使用优惠券的数量
        }
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let m, n, k;
    let x;
    let prices = [];
    
    // 读取输入
    rl.on('line', (input) => {
      if (!m) { // 读取m, n, k
        [m, n, k] = input.split(' ').map(Number);
      } else if (!x) { // 读取x
        x = Number(input);
      } else { // 读取x个数字表示这几个人打折之前的商品总价
        prices.push(Number(input));
        if (prices.length === x) { // 所有人的商品总价都读取完毕
          for (let price of prices) {
            let ans = [];
    
            // 满减券
            let resM = fullSubtraction(price, m); // 计算满减券优惠后的价格和使用的满减券数量
            let resMN_N = discount(resM[0], n); // 在满减券优惠后的价格基础上使用打折券，计算优惠后的价格和使用的优惠券数量
            ans.push([resMN_N[0], m + n - (resM[1] + resMN_N[1])]); // 将优惠后的价格和使用的优惠券数量加入答案数组
            let resMK_K = thresholdFree(resM[0], k); // 在满减券优惠后的价格基础上使用无门槛券，计算优惠后的价格和使用的优惠券数量
            ans.push([resMK_K[0], m + k - (resM[1] + resMK_K[1])]); // 将优惠后的价格和使用的优惠券数量加入答案数组
    
            // 打折券
            let resN = discount(price, n); // 计算打折券优惠后的价格和使用的打折券数量
            let resNM_M = fullSubtraction(resN[0], m); // 在打折券优惠后的价格基础上使用满减券，计算优惠后的价格和使用的优惠券数量
            ans.push([resNM_M[0], n + m - (resN[1] + resNM_M[1])]); // 将优惠后的价格和使用的优惠券数量加入答案数组
            let resNK_K = thresholdFree(resN[0], k); // 在打折券优惠后的价格基础上使用无门槛券，计算优惠后的价格和使用的优惠券数量
            ans.push([resNK_K[0], n + k - (resN[1] + resNK_K[1])]); // 将优惠后的价格和使用的优惠券数量加入答案数组
    
            // 按照优惠后的价格从小到大排序，如果价格相同则按照使用的优惠券数量从小到大排序
            ans.sort((a, b) => {
              if (a[0] !== b[0]) {
                return a[0] - b[0];
              } else {
                return a[1] - b[1];
              }
            });
    
            console.log(ans[0].join(' ')); // 输出最低价格和对应使用优惠券的总数
          }
    
          rl.close(); // 关闭输入流
        }
      }
    });
    
    // 满减券
    function fullSubtraction(price, m) {
      while (price >= 100 && m > 0) { // 如果还有满减券可用且商品总价达到满减条件
        price -= Math.floor(price / 100) * 10; // 减去满减金额
        m -= 1; // 使用一张满减券
      }
    
      return [price, m]; // 返回优惠后的价格和使用的满减券数量
    }
    
    // 打折券
    function discount(price, n) {
      if (n >= 1) { // 如果还有打折券可用
        price = Math.floor(price * 0.92); // 打折
        n -= 1; // 使用一张打折券
      }
      return [price, n]; // 返回优惠后的价格和使用的打折券数量
    }
    
    // 无门槛券
    function thresholdFree(price, k) {
      while (price > 0 && k > 0) { // 如果还有无门槛券可用且优惠后的价格大于0
        price -= 5; // 减去无门槛券的优惠金额
        price = Math.max(price, 0); // 无门槛券过多会导致优惠后总价小于0，此时我们应该避免
        k -= 1; // 使用一张无门槛券
      }
      return [price, k]; // 返回优惠后的价格和使用的无门槛券数量
    }
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner input = new Scanner(System.in);
            // 输入每个人可以使用的满减券、打折券和无门槛券的数量
            int m = input.nextInt();
            int n = input.nextInt();
            int k = input.nextInt();
            // 输入有几个人购物
            int x = input.nextInt();
            // 用 List 存储每个人的商品总价
            List<Integer> prices = new ArrayList<>();
            for (int i = 0; i < x; i++) {
                prices.add(input.nextInt());
            }
            for (int price : prices) {
                // 用 List 存储每个人的不同使用顺序下的优惠券使用情况
                List<int[]> ans = new ArrayList<>();
                // 满减券和打折券的使用顺序
                int[] resM = fullSubtraction(price, m);
                int[] resMN_N = discount(resM[0], n);
                ans.add(new int[]{resMN_N[0], m + n - (resM[1] + resMN_N[1])});
                // 满减券和无门槛券的使用顺序
                int[] resMK_K = thresholdFree(resM[0], k);
                ans.add(new int[]{resMK_K[0], m + k - (resM[1] + resMK_K[1])});
                // 打折券和满减券的使用顺序
                int[] resN = discount(price, n);
                int[] resNM_M = fullSubtraction(resN[0], m);
                ans.add(new int[]{resNM_M[0], n + m - (resN[1] + resNM_M[1])});
                // 打折券和无门槛券的使用顺序
                int[] resNK_K = thresholdFree(resN[0], k);
                ans.add(new int[]{resNK_K[0], n + k - (resN[1] + resNK_K[1])});
                // 按照价格和使用优惠券数量排序
                Collections.sort(ans, new Comparator<int[]>() {
                    @Override
                    public int compare(int[] o1, int[] o2) {
                        if (o1[0] != o2[0]) {
                            return o1[0] - o2[0];
                        } else {
                            return o1[1] - o2[1];
                        }
                    }
                });
                // 输出最低价格和对应使用优惠券的总数
                System.out.println(ans.get(0)[0] + " " + ans.get(0)[1]);
            }
        }
    
        // 满减券的使用情况
        public static int[] fullSubtraction(int price, int m) {
            while (price >= 100 && m > 0) {
                price -= (int) (price / 100) * 10;
                m -= 1;
            }
            return new int[]{price, m};
        }
    
        // 打折券的使用情况
        public static int[] discount(int price, int n) {
            if (n >= 1) {
                price = (int) (price * 0.92);
                n -= 1;
            }
            return new int[]{price, n};
        }
    
        // 无门槛券的使用情况
        public static int[] thresholdFree(int price, int k) {
            while (price > 0 && k > 0) {
                price -= 5;
                price = Math.max(price, 0);
                k -= 1;
            }
            return new int[]{price, k};
        }
    }
    

#### Python

    
    
    prices = []  # 保存每个人的商品总价
    
    # 满减券
    def fullSubtraction(price, m):
        while price >= 100 and m > 0:
            price -= (price // 100) * 10
            m -= 1
        return (price, m)
    
    # 打折券
    def discount(price, n):
        if n >= 1:
            price = int(price * 0.92)
            n -= 1
        return (price, n)
    
    # 无门槛券
    def thresholdFree(price, k):
        while price > 0 and k > 0:
            price -= 5
            price = max(price, 0)
            k -= 1
        return (price, k)
    
    m, n, k = map(int, input().split())  # 输入每个人可以使用的优惠券数量
    
    x = int(input())  # 输入购物人数
    
    for i in range(x):
        price = int(input())  # 输入每个人的商品总价
        prices.append(price)
    
    for price in prices:  # 遍历每个人的商品总价
        ans = []  # 保存每种优惠券的使用情况
    
        # 情况1：先使用满减券再使用打折券
        resM = fullSubtraction(price, m)
        resMN_N = discount(resM[0], n)
        ans.append((resMN_N[0], m + n - (resM[1] + resMN_N[1])))
    
        # 情况2：先使用满减券再使用无门槛券
        resMK_K = thresholdFree(resM[0], k)
        ans.append((resMK_K[0], m + k - (resM[1] + resMK_K[1])))
    
        # 情况3：先使用打折券再使用满减券
        resN = discount(price, n)
        resNM_M = fullSubtraction(resN[0], m)
        ans.append((resNM_M[0], n + m - (resN[1] + resNM_M[1])))
    
        # 情况4：先使用打折券再使用无门槛券
        resNK_K = thresholdFree(resN[0], k)
        ans.append((resNK_K[0], n + k - (resN[1] + resNK_K[1])))
    
        ans.sort(key=lambda x: (x[0], x[1]))  # 按价格升序排序，如果价格相同，按使用优惠券数量升序排序
    
        print(ans[0][0], ans[0][1])  # 输出最低价格和对应使用优惠券的数量
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * 代码思路
      * C++
      * JavaScript
      * Java
      * Python

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/e9413fcd109f2f3d7297192eab0c0b2a.gif)

