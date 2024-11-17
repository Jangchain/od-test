#### 题目描述

某购物城有m个商铺，现决定举办一场活动选出人气最高店铺。

活动共有n位市民参与，每位市民只能投一票，但1号店铺如果给该市民发放 q 元的购物补贴，该市民会改为投1号店铺。

请计算1号店铺需要最少发放多少元购物补贴才能成为人气最高店铺（即获得的票数要大于其他店铺），如果1号店铺本身就是票数最高店铺，返回0。

#### 输入描述

第一行为小写逗号分割的两个整数n，m，其中：

  * 第一个整数n表示参与的市民总数
  * 第二个整数m代表店铺总数
  * 1 ≤ n,m ≤ 3000

第2到n+1行，每行为小写逗号分割的两个整数p，q，表示市民的意向投票情况，其中每行的：

  * 第一个整数p表示该市民意向投票给p号店铺
  * 第二个整数q表示其改投1号店铺所需给予的q元购物补贴
  * 1 ≤ p ≤ m
  * 1 ≤ g ≤ 10^9

不考虑输入的格式问题

#### 输出描述

1号店铺需要最少发放购物补贴金额

#### 用例1

输入

    
    
    5,5
    2,10
    3,20
    4,30
    5,40
    5,90
    

输出

    
    
    50
    

> 说明  
>  有5个人参与，共5个店铺。  
>  如果选择发放 10元+20元+30元=60元 的补贴来抢2,3.4号店铺的票，总共发放了60元补贴（5号店铺有2票，1号店铺要3票才能胜出）
>
> 如果选择发放 10元+40元=50元 的补贴来抢2,5号店铺的票，总共发放了50元补贴（抢了5号店铺的票后，现在1号店铺只要2票就能胜出）
>
> 所以最少发放50元补贴

#### 用例2

输入

    
    
    5,5
    2,10
    3,20
    4,30
    5,80
    5,90
    

输出

    
    
    60
    

> 说明  
>  有5个人参与，共5个店铺。
>
> 如果选择发放 10元+20元+30元=60元 的补贴来抢2,3,4号店铺的票，总共发放了60元补贴(5号店铺有2票，1号店铺要3票才能胜出)
>
> 如果选择发放 10元+80元=90元 的补贴来抢2,5号店铺的票，总共发放了90元补贴(抢了5号店铺的票后，现在1号店铺只要2票就能胜出)
>
> 所以最少发放60元补贴

#### 题目解析

上面的 Java 代码和转换后的 Node.js
代码是为了解决一个问题：给定一组市民对商店的投票信息，计算使得1号商店成为票数最高商店所需的最小补贴金额。下面是详细的解题思路和解题方法：

  1. **输入处理** ：首先，我们需要处理输入。 我们需要读取两个整数 n 和 m，分别表示参与的市民总数和店铺总数。接下来，我们需要读取 n 行输入，每行包含两个整数，分别表示市民投票的店铺 ID 和改投 1 号店铺所需的补贴金额。

  2. **初始化数据结构** ：我们需要初始化两个数据结构来存储投票信息。一个是 `voters` 列表，用于存储市民投票信息；另一个是 `shopVotes` 映射，用于存储每个商店的票数。我们还需要初始化一个变量 `minSubsidy`，用于存储最小补贴金额，初始值为 `Integer.MAX_VALUE`（Java）或 `Number.MAX_VALUE`（Node.js）。

  3. **读取投票信息** ：遍历输入的每一行，将市民投票信息添加到 `voters` 列表中，并更新 `shopVotes` 映射中的票数。注意，如果市民已经投票给 1 号店铺，我们不需要将其添加到 `voters` 列表中，因为我们不需要为这些市民发放补贴。

  4. **计算最小补贴金额** ：我们使用递归函数 `calculateSubsidy` 来计算最小补贴金额。这个函数有四个参数：`voters` 列表、当前处理的市民索引 `index`、当前已发放的补贴金额 `currentSubsidy` 和 `shopVotes` 映射。我们使用回溯法来尝试所有可能的补贴发放方案，并在每个方案中检查 1 号店铺是否成为票数最高的店铺。如果是，则更新 `minSubsidy` 变量。

  5. **递归函数的实现** ：在 `calculateSubsidy` 函数中，我们首先检查边界条件：如果所有市民都已处理（即 `index === voters.length`），则检查 1 号店铺是否是票数最高的店铺，如果是且当前补贴金额小于 `minSubsidy`，则更新 `minSubsidy`。接下来，我们处理当前市民的投票信息。我们尝试两种方案：不发放补贴和发放补贴。在不发放补贴的方案中，我们直接递归处理下一个市民；在发放补贴的方案中，我们更新 `shopVotes` 映射中的票数，递归处理下一个市民，然后回溯恢复 `shopVotes` 映射中的票数。

  6. **判断 1 号店铺是否是票数最高的店铺** ：我们使用一个辅助函数 `isTop1` 来判断 1 号店铺是否是票数最高的店铺。这个函数遍历 `shopVotes` 映射，找到除 1 号店铺外的最高票数，然后比较 1 号店铺的票数是否大于这个最高票数。

  7. **输出结果** ：最后，我们输出计算得到的最小补贴金额 `minSubsidy`。

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let minSubsidy = Number.MAX_VALUE; // 最小补贴金额
    
    // 读取输入
    const input = [];
    rl.on('line', (line) => {
      input.push(line.trim());
      if (input.length === parseInt(input[0].split(',')[0]) + 1) {
        rl.close();
      }
    });
    
    rl.on('close', () => {
      const [n, m] = input[0].split(',').map(Number); // 参与的市民总数和店铺总数
      const voters = []; // 市民投票信息列表
      const shopVotes = new Map(); // 商店票数映射
      shopVotes.set(1, 0); // 初始化1号店铺票数为0
    
      // 读取市民投票信息
      for (let i = 1; i < input.length; i++) {
        const [shopId, subsidy] = input[i].split(',').map(Number);
        if (shopId !== 1) {
          voters.push([shopId, subsidy]);
        }
        shopVotes.set(shopId, (shopVotes.get(shopId) || 0) + 1);
      }
    
      // 计算最小补贴金额
      calculateSubsidy(voters, 0, 0, shopVotes);
      console.log(minSubsidy);
    });
    
    // 计算最小补贴金额的递归函数
    function calculateSubsidy(voters, index, currentSubsidy, shopVotes) {
      if (index === voters.length) { // 边界条件：所有市民都已处理
        if (isTop1(shopVotes) && minSubsidy > currentSubsidy) {
          minSubsidy = currentSubsidy;
        }
        return;
      }
    
      const [shopId, subsidy] = voters[index]; // 当前处理的市民
    
      // 尝试不发放补贴
      calculateSubsidy(voters, index + 1, currentSubsidy, shopVotes);
    
      // 发放补贴
      shopVotes.set(shopId, shopVotes.get(shopId) - 1); // 原店铺票数减1
      shopVotes.set(1, shopVotes.get(1) + 1); // 1号店铺票数加1
      calculateSubsidy(voters, index + 1, currentSubsidy + subsidy, shopVotes);
    
      // 回溯
      shopVotes.set(shopId, shopVotes.get(shopId) + 1); // 原店铺票数加1
      shopVotes.set(1, shopVotes.get(1) - 1); // 1号店铺票数减1
    }
    
    // 判断1号店铺是否是票数最高的店铺
    function isTop1(shopVotes) {
      let maxVotes = 0;
      for (const [shopId, votes] of shopVotes.entries()) {
        if (shopId !== 1 && votes >= maxVotes) {
          maxVotes = votes;
        }
      }
      return shopVotes.get(1) > maxVotes;
    }
    
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    #include <sstream>
    #include <limits>
    #include <algorithm>
    
    using namespace std;
    
    int minSubsidy = numeric_limits<int>::max(); // 最小补贴金额
    
    // 判断1号店铺是否是票数最高的店铺
    bool isTop1(const unordered_map<int, int>& shopVotes) {
        int maxVotes = 0;
        for (const auto& entry : shopVotes) {
            if (entry.first != 1 && entry.second >= maxVotes) {
                maxVotes = entry.second;
            }
        }
        return shopVotes.at(1) > maxVotes;
    }
    
    // 计算最小补贴金额的递归函数
    void calculateSubsidy(const vector<vector<int>>& voters, int index, int currentSubsidy, unordered_map<int, int> shopVotes) {
        if (index == voters.size()) { // 边界条件：所有市民都已处理
            if (isTop1(shopVotes) && minSubsidy > currentSubsidy) {
                minSubsidy = currentSubsidy;
            }
            return;
        }
    
        const vector<int>& currentVoter = voters[index]; // 当前处理的市民
        int shopId = currentVoter[0]; // 市民投票的店铺ID
        int subsidy = currentVoter[1]; // 改投1号店铺所需补贴
    
        // 尝试不发放补贴
        calculateSubsidy(voters, index + 1, currentSubsidy, shopVotes);
    
        // 发放补贴
        shopVotes[shopId]--; // 原店铺票数减1
        shopVotes[1]++; // 1号店铺票数加1
        calculateSubsidy(voters, index + 1, currentSubsidy + subsidy, shopVotes);
    
        // 回溯
        shopVotes[shopId]++; // 原店铺票数加1
        shopVotes[1]--; // 1号店铺票数减1
    }
    
    int main() {
        // 输入
        string line;
        getline(cin, line);
        stringstream ss(line);
        int n, m;
        char delimiter;
        ss >> n >> delimiter >> m; // 参与的市民总数和店铺总数
    
        // 初始化商店和投票人
        vector<vector<int>> voters; // 市民投票信息列表
        unordered_map<int, int> shopVotes; // 商店票数映射
        shopVotes[1] = 0; // 初始化1号店铺票数为0
    
        // 读取市民投票信息
        for (int i = 0; i < n; i++) {
            getline(cin, line);
            stringstream ss(line);
            int shopId, subsidy;
            ss >> shopId >> delimiter >> subsidy;
            if (shopId != 1) {
                voters.push_back({shopId, subsidy});
            }
            shopVotes[shopId] = shopVotes[shopId] + 1;
        }
    
        // 计算最小补贴金额
        calculateSubsidy(voters, 0, 0, shopVotes);
        cout << minSubsidy << endl;
    
        return 0;
    }
    
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.*;
    import java.util.HashMap;
    
    public class Main {
        public static int minSubsidy = Integer.MAX_VALUE; // 最小补贴金额
    
        public static void main(String[] args) {
            // 输入
            Scanner in = new Scanner(System.in);
            int[] params = Arrays.stream(in.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
            int n = params[0]; // 参与的市民总数
            int m = params[1]; // 店铺总数
    
            // 初始化商店和投票人
            List<int[]> voters = new ArrayList<>(); // 市民投票信息列表
            Map<Integer, Integer> shopVotes = new HashMap<>(); // 商店票数映射
            shopVotes.put(1, 0); // 初始化1号店铺票数为0
    
            // 读取市民投票信息
            for (int i = 0; i < n; i++) {
                int[] nums = Arrays.stream(in.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
                if (nums[0] != 1) {
                    voters.add(new int[]{nums[0], nums[1]});
                }
                shopVotes.put(nums[0], shopVotes.getOrDefault(nums[0], 0) + 1);
            }
    
            // 计算最小补贴金额
            calculateSubsidy(voters, 0, 0, shopVotes);
            System.out.println(minSubsidy);
        }
    
        // 计算最小补贴金额的递归函数
        public static void calculateSubsidy(List<int[]> voters, int index, int currentSubsidy, Map<Integer, Integer> shopVotes) {
            if (index == voters.size()) { // 边界条件：所有市民都已处理
                if (isTop1(shopVotes) && minSubsidy > currentSubsidy) {
                    minSubsidy = currentSubsidy;
                }
                return;
            }
    
            int[] currentVoter = voters.get(index); // 当前处理的市民
            int shopId = currentVoter[0]; // 市民投票的店铺ID
            int subsidy = currentVoter[1]; // 改投1号店铺所需补贴
    
            // 尝试不发放补贴
            calculateSubsidy(voters, index + 1, currentSubsidy, shopVotes);
    
            // 发放补贴
            shopVotes.put(shopId, shopVotes.get(shopId) - 1); // 原店铺票数减1
            shopVotes.put(1, shopVotes.get(1) + 1); // 1号店铺票数加1
            calculateSubsidy(voters, index + 1, currentSubsidy + subsidy, shopVotes);
    
            // 回溯
            shopVotes.put(shopId, shopVotes.get(shopId) + 1); // 原店铺票数加1
            shopVotes.put(1, shopVotes.get(1) - 1); // 1号店铺票数减1
        }
    
        // 判断1号店铺是否是票数最高的店铺
        public static boolean isTop1(Map<Integer, Integer> shopVotes) {
            int maxVotes = 0;
            for (Map.Entry<Integer, Integer> entry : shopVotes.entrySet()) {
                if (entry.getKey() != 1 && entry.getValue() >= maxVotes) {
                    maxVotes = entry.getValue();
                }
            }
            return shopVotes.get(1) > maxVotes;
        }
    }
    
    

#### Python

    
    
    from collections import defaultdict
    import sys
    
    # 最小补贴金额
    min_subsidy = sys.maxsize
    
    # 判断1号店铺是否是票数最高的店铺
    def is_top1(shop_votes):
        max_votes = 0
        for key, value in shop_votes.items():
            if key != 1 and value >= max_votes:
                max_votes = value
        return shop_votes[1] > max_votes
    
    # 计算最小补贴金额的递归函数
    def calculate_subsidy(voters, index, current_subsidy, shop_votes):
        global min_subsidy
        if index == len(voters):  # 边界条件：所有市民都已处理
            if is_top1(shop_votes) and min_subsidy > current_subsidy:
                min_subsidy = current_subsidy
            return
    
        current_voter = voters[index]  # 当前处理的市民
        shop_id = current_voter[0]  # 市民投票的店铺ID
        subsidy = current_voter[1]  # 改投1号店铺所需补贴
    
        # 尝试不发放补贴
        calculate_subsidy(voters, index + 1, current_subsidy, shop_votes)
    
        # 发放补贴
        shop_votes[shop_id] -= 1  # 原店铺票数减1
        shop_votes[1] += 1  # 1号店铺票数加1
        calculate_subsidy(voters, index + 1, current_subsidy + subsidy, shop_votes)
    
        # 回溯
        shop_votes[shop_id] += 1  # 原店铺票数加1
        shop_votes[1] -= 1  # 1号店铺票数减1
    
    # 主函数
    def main():
        global min_subsidy
        # 输入
        params = list(map(int, input().split(',')))
        n = params[0]  # 参与的市民总数
        m = params[1]  # 店铺总数
    
        # 初始化商店和投票人
        voters = []  # 市民投票信息列表
        shop_votes = defaultdict(int)  # 商店票数映射
        shop_votes[1] = 0  # 初始化1号店铺票数为0
    
        # 读取市民投票信息
        for _ in range(n):
            nums = list(map(int, input().split(',')))
            if nums[0] != 1:
                voters.append([nums[0], nums[1]])
            shop_votes[nums[0]] += 1
    
        # 计算最小补贴金额
        calculate_subsidy(voters, 0, 0, shop_votes)
        print(min_subsidy)
    
    if __name__ == "__main__":
        main()
    
    

#### 完整用例

##### 用例1

    
    
    3,3
    2,10
    3,20
    3,30
    

##### 用例2

    
    
    4,4
    1,0
    2,10
    3,20
    4,30
    

##### 用例3

    
    
    5,3
    1,0
    2,10
    2,20
    3,30
    3,40
    

##### 用例4

    
    
    6,4
    1,10
    2,10
    2,20
    3,30
    3,40
    4,50
    

##### 用例5

    
    
    5,5
    2,10
    3,20
    4,30
    5,40
    5,90
    

##### 用例6

    
    
    5,5
    2,10
    3,20
    4,30
    5,80
    5,90
    

##### 用例7

    
    
    6,6
    2,5
    3,10
    4,15
    5,20
    6,25
    6,30
    

##### 用例8

    
    
    4,3
    2,15
    3,10
    3,15
    4,15
    

##### 用例9

    
    
    5,4
    2,10
    3,20
    4,30
    4,40
    4,50
    

##### 用例10

    
    
    7,6
    1,1
    2,5
    3,10
    4,15
    5,20
    6,25
    6,30
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例1
      * 用例2
      * 题目解析
      * JavaScript
      * C++
      * Java
      * Python
      * 完整用例
      *         * 用例1
        * 用例2
        * 用例3
        * 用例4
        * 用例5
        * 用例6
        * 用例7
        * 用例8
        * 用例9
        * 用例10

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

