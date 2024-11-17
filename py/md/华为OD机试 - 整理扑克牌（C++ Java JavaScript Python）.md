## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

给定一组数字，表示扑克牌的牌面数字，忽略扑克牌的花色，请按如下规则对这一组扑克牌进行整理：

**步骤1.** 对扑克牌进行分组，形成组合牌，规则如下：

  * 当牌面数字相同张数大于等于4时，组合牌为“炸弹”；
  * 3张相同牌面数字 + 2张相同牌面数字，且3张牌与2张牌不相同时，组合牌为“葫芦”；
  * 3张相同牌面数字，组合牌为“三张”；
  * 2张相同牌面数字，组合牌为“对子”；
  * 剩余没有相同的牌，则为“单张”；

**步骤2.** 对上述组合牌进行由大到小排列，规则如下：

  * 不同类型组合牌之间由大到小排列规则：“炸弹” > “葫芦” > “三张” > “对子” > “单张”；
  * 相同类型组合牌之间，除“葫芦”外，按组合牌全部牌面数字加总由大到小排列；
  * “葫芦”则先按3张相同牌面数字加总由大到小排列，3张相同牌面数字加总相同时，再按另外2张牌面数字加总由大到小排列；
  * 由于“葫芦”>“三张”，因此如果能形成更大的组合牌，也可以将“三张”拆分为2张和1张，其中的2张可以和其它“三张”重新组合成“葫芦”，剩下的1张为“单张”

**步骤3.** 当存在多个可能组合方案时，按如下规则排序取最大的一个组合方案：

  * 依次对组合方案中的组合牌进行大小比较，规则同上；
  * 当组合方案A中的第n个组合牌大于组合方案B中的第n个组合牌时，组合方案A大于组合方案B；

#### 输入描述

第一行为空格分隔的N个正整数，每个整数取值范围[1,13]，N的取值范围[1,1000]

#### 输出描述

经重新排列后的扑克牌数字列表，每个数字以空格分隔

#### 用例

输入| 1 3 3 3 2 1 5  
---|---  
输出| 3 3 3 1 1 5 2  
说明| 无  
输入| 4 4 2 1 2 1 3 3 3 4  
---|---  
输出| 4 4 4 3 3 2 2 1 1 3  
说明| 无  
  
#### 题目解析

我的解题思路如下：

首先，将给定牌中，炸弹，三张，对子，单子先统计出来，即先不处理葫芦。

统计逻辑很简单，就是看某个牌面的数量：

  * >=4，那么该牌面可以组成炸弹
  * ===3，那么该牌面可以组成三张
  * ===2，那么该牌面可以组成对子
  * ===1，那么该牌面可以组成单张

葫芦的话比较特殊：3张+ 2张，例如用例2 输出结果不是4 4 4 3 3 3。因为4 4 4 3 3是一个葫芦 ，更大。

#### C++

    
    
    #include <iostream>
    #include <algorithm>
    #include <vector>
    #include <unordered_map>
    using namespace std;
    
    // 定义函数，用于输出最终结果
    string getResult(vector<int>& arr) {
    
    }
    
    int main() {
        string str;
        getline(cin, str);
    
        // 将输入字符串转换为数组
        vector<int> arr;
        string num;
        for (char c : str) {
            if (c == ' ') {
                arr.push_back(stoi(num));
                num = "";
            } else {
                num += c;
            }
        }
        arr.push_back(stoi(num));
    
        // 统计数组中每个数字出现的次数
        unordered_map<int, int> card;
        for (int num : arr) {
            if (card.count(num)) {
                int val = card[num];
                card[num] = ++val;
            } else {
                card[num] = 1;
            }
        }
    
        // 定义存储不同组合的容器
        unordered_map<string, vector<vector<int>>> combine;
        combine["4"] = vector<vector<int>>();
        combine["3+2"] = vector<vector<int>>();
        combine["3"] = vector<vector<int>>();
        combine["2"] = vector<vector<int>>();
        combine["1"] = vector<vector<int>>();
    
        // 将数字按照出现次数分组
        for (auto iter = card.begin(); iter != card.end(); iter++) {
            int num = iter->first;
            int count = iter->second;
            switch (count) {
                case 3:
                    combine["3"].push_back({num});
                    break;
                case 2:
                    combine["2"].push_back({num});
                    break;
                case 1:
                    combine["1"].push_back({num});
                    break;
                default:
                    combine["4"].push_back({num, count});
            }
        }
    
        // 对四张相同的牌进行排序
        sort(combine["4"].begin(), combine["4"].end(), [](vector<int>& a, vector<int>& b) {
            return a[1] != b[1] ? b[1] < a[1] : b[0] < a[0];
        });
    
        // 对三张相同的牌进行排序
        sort(combine["3"].begin(), combine["3"].end(), [](vector<int>& a, vector<int>& b) {
            return b[0] < a[0];
        });
    
        // 对两张相同的牌进行排序
        sort(combine["2"].begin(), combine["2"].end(), [](vector<int>& a, vector<int>& b) {
            return b[0] < a[0];
        });
    
        // 尝试组合出葫芦
        while (combine["3"].size() > 0) {
            // 如果没有两张相同的牌或者只剩下一组三张相同的牌，则无法组成葫芦，退出循环
            if (combine["2"].size() == 0 && combine["3"].size() == 1) break;
    
            // 取出一组三张相同的牌
            int san_top = combine["3"][0][0];
            combine["3"].erase(combine["3"].begin());
    
            // 如果还有另一组三张相同的牌，则与之组合成三带二
            int tmp;
            if (combine["2"].size() == 0 || (combine["3"].size() > 0 && combine["3"][0][0] > combine["2"][0][0])) {
                tmp = combine["3"][0][0];
                combine["3"].erase(combine["3"].begin());
                combine["1"].push_back({tmp});
            } else {
                tmp = combine["2"][0][0];
                combine["2"].erase(combine["2"].begin());
            }
            combine["3+2"].push_back({san_top, tmp}); 
        }
    
        // 对单张牌进行排序
        sort(combine["1"].begin(), combine["1"].end(), [](vector<int>& a, vector<int>& b) {
            return b[0] < a[0];
        });
    
        // 将不同的组合按照顺序组合成最终的牌型
        vector<int> ans;
        for (vector<int>& vals : combine["4"]) {
            int score = vals[0];
            int count = vals[1];
            for (int i = 0; i < count; i++) {
                ans.push_back(score);
            }
        }
        for (vector<int>& vals : combine["3+2"]) {
            int san = vals[0];
            int er = vals[1];
            for (int i = 0; i < 3; i++) ans.push_back(san);
            for (int i = 0; i < 2; i++) ans.push_back(er);
        }
        for (vector<int>& vals : combine["3"]) {
            for (int i = 0; i < 3; i++) ans.push_back(vals[0]);
        }
        for (vector<int>& vals : combine["2"]) {
            for (int i = 0; i < 2; i++) ans.push_back(vals[0]);
        }
        for (vector<int>& vals : combine["1"]) {
            ans.push_back(vals[0]);
        }
    
        // 将最终结果转换为字符串输出
        string res;
        for (int i = 0; i < ans.size(); i++) {
            res += to_string(ans[i]);
            if (i != ans.size() - 1) res += " ";
        }
        cout << res << endl;
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 定义函数，用于输出最终结果
    function getResult(arr) {
    
    }
    
    rl.on('line', function (str) {
      // 将输入字符串转换为数组
      let arr = [];
      let num = '';
      for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
          arr.push(parseInt(num));
          num = '';
        } else {
          num += str[i];
        }
      }
      arr.push(parseInt(num));
    
      // 统计数组中每个数字出现的次数
      let card = new Map();
      for (let num of arr) {
        if (card.has(num)) {
          let val = card.get(num);
          card.set(num, val + 1);
        } else {
          card.set(num, 1);
        }
      }
    
      // 定义存储不同组合的容器
      let combine = new Map();
      combine.set('4', []);
      combine.set('3+2', []);
      combine.set('3', []);
      combine.set('2', []);
      combine.set('1', []);
    
      // 将数字按照出现次数分组
      for (let [num, count] of card) {
        switch (count) {
          case 3:
            combine.get('3').push([num]);
            break;
          case 2:
            combine.get('2').push([num]);
            break;
          case 1:
            combine.get('1').push([num]);
            break;
          default:
            combine.get('4').push([num, count]);
        }
      }
    
      // 对四张相同的牌进行排序
      combine.get('4').sort((a, b) => {
        return a[1] !== b[1] ? b[1] - a[1] : b[0] - a[0];
      });
    
      // 对三张相同的牌进行排序
      combine.get('3').sort((a, b) => {
        return b[0] - a[0];
      });
    
      // 对两张相同的牌进行排序
      combine.get('2').sort((a, b) => {
        return b[0] - a[0];
      });
    
      // 尝试组合出葫芦
      while (combine.get('3').length > 0) {
        // 如果没有两张相同的牌或者只剩下一组三张相同的牌，则无法组成葫芦，退出循环
        if (combine.get('2').length === 0 && combine.get('3').length === 1) break;
    
        // 取出一组三张相同的牌
        let san_top = combine.get('3')[0][0];
        combine.get('3').shift();
    
        // 如果还有另一组三张相同的牌，则与之组合成三带二
        let tmp;
        if (combine.get('2').length === 0 || (combine.get('3').length > 0 && combine.get('3')[0][0] > combine.get('2')[0][0])) {
          tmp = combine.get('3')[0][0];
          combine.get('3').shift();
          combine.get('1').push([tmp]);
        } else {
          tmp = combine.get('2')[0][0];
          combine.get('2').shift();
        }
        combine.get('3+2').push([san_top, tmp]);
      }
    
      // 对单张牌进行排序
      combine.get('1').sort((a, b) => {
        return b[0] - a[0];
      });
    
      // 将不同的组合按照顺序组合成最终的牌型
      let ans = [];
      for (let vals of combine.get('4')) {
        let score = vals[0];
        let count = vals[1];
        for (let i = 0; i < count; i++) {
          ans.push(score);
        }
      }
      for (let vals of combine.get('3+2')) {
        let san = vals[0];
        let er = vals[1];
        for (let i = 0; i < 3; i++) ans.push(san);
        for (let i = 0; i < 2; i++) ans.push(er);
      }
      for (let vals of combine.get('3')) {
        for (let i = 0; i < 3; i++) ans.push(vals[0]);
      }
      for (let vals of combine.get('2')) {
        for (let i = 0; i < 2; i++) ans.push(vals[0]);
      }
      for (let vals of combine.get('1')) {
        ans.push(vals[0]);
      }
    
      // 将最终结果转换为字符串输出
      let res = '';
      for (let i = 0; i < ans.length; i++) {
        res += ans[i].toString();
        if (i !== ans.length - 1) res += ' ';
      }
      console.log(res);
    });
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        // 定义函数，用于输出最终结果
        public static String getResult(List<Integer> arr) {
            // 统计数组中每个数字出现的次数
            Map<Integer, Integer> card = new HashMap<>();
            for (int num : arr) {
                if (card.containsKey(num)) {
                    int val = card.get(num);
                    card.put(num, val + 1);
                } else {
                    card.put(num, 1);
                }
            }
    
            // 定义存储不同组合的容器
            Map<String, List<List<Integer>>> combine = new HashMap<>();
            combine.put("4", new ArrayList<>());
            combine.put("3+2", new ArrayList<>());
            combine.put("3", new ArrayList<>());
            combine.put("2", new ArrayList<>());
            combine.put("1", new ArrayList<>());
    
            // 将数字按照出现次数分组
            for (Map.Entry<Integer, Integer> entry : card.entrySet()) {
                int num = entry.getKey();
                int count = entry.getValue();
                switch (count) {
                    case 3:
                        combine.get("3").add(Arrays.asList(num));
                        break;
                    case 2:
                        combine.get("2").add(Arrays.asList(num));
                        break;
                    case 1:
                        combine.get("1").add(Arrays.asList(num));
                        break;
                    default:
                        combine.get("4").add(Arrays.asList(num, count));
                }
            }
    
            // 对四张相同的牌进行排序
            Collections.sort(combine.get("4"), new Comparator<List<Integer>>() {
                @Override
                public int compare(List<Integer> a, List<Integer> b) {
                    return a.get(1) != b.get(1) ? b.get(1) - a.get(1) : b.get(0) - a.get(0);
                }
            });
    
            // 对三张相同的牌进行排序
            Collections.sort(combine.get("3"), new Comparator<List<Integer>>() {
                @Override
                public int compare(List<Integer> a, List<Integer> b) {
                    return b.get(0) - a.get(0);
                }
            });
    
            // 对两张相同的牌进行排序
            Collections.sort(combine.get("2"), new Comparator<List<Integer>>() {
                @Override
                public int compare(List<Integer> a, List<Integer> b) {
                    return b.get(0) - a.get(0);
                }
            });
    
            // 尝试组合出葫芦
            while (combine.get("3").size() > 0) {
                // 如果没有两张相同的牌或者只剩下一组三张相同的牌，则无法组成葫芦，退出循环
                if (combine.get("2").size() == 0 && combine.get("3").size() == 1) break;
    
                // 取出一组三张相同的牌
                int san_top = combine.get("3").get(0).get(0);
                combine.get("3").remove(0);
    
                // 如果还有另一组三张相同的牌，则与之组合成三带二
                int tmp;
                if (combine.get("2").size() == 0 || (combine.get("3").size() > 0 && combine.get("3").get(0).get(0) > combine.get("2").get(0).get(0))) {
                    tmp = combine.get("3").get(0).get(0);
                    combine.get("3").remove(0);
                    combine.get("1").add(Arrays.asList(tmp));
                } else {
                    tmp = combine.get("2").get(0).get(0);
                    combine.get("2").remove(0);
                }
                combine.get("3+2").add(Arrays.asList(san_top, tmp));
            }
    
            // 对单张牌进行排序
            Collections.sort(combine.get("1"), new Comparator<List<Integer>>() {
                @Override
                public int compare(List<Integer> a, List<Integer> b) {
                    return b.get(0) - a.get(0);
                }
            });
    
            // 将不同的组合按照顺序组合成最终的牌型
            List<Integer> ans = new ArrayList<>();
            for (List<Integer> vals : combine.get("4")) {
                int score = vals.get(0);
                int count = vals.get(1);
                for (int i = 0; i < count; i++) {
                    ans.add(score);
                }
            }
            for (List<Integer> vals : combine.get("3+2")) {
                int san = vals.get(0);
                int er = vals.get(1);
                for (int i = 0; i < 3; i++) ans.add(san);
                for (int i = 0; i < 2; i++) ans.add(er);
            }
            for (List<Integer> vals : combine.get("3")) {
                for (int i = 0; i < 3; i++) ans.add(vals.get(0));
            }
            for (List<Integer> vals : combine.get("2")) {
                for (int i = 0; i < 2; i++) ans.add(vals.get(0));
            }
            for (List<Integer> vals : combine.get("1")) {
                ans.add(vals.get(0));
            }
    
            // 将最终结果转换为字符串输出
            StringBuilder res = new StringBuilder();
            for (int i = 0; i < ans.size(); i++) {
                res.append(ans.get(i));
                if (i != ans.size() - 1) res.append(" ");
            }
            return res.toString();
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String str = sc.nextLine();
    
            // 将输入字符串转换为数组
            List<Integer> arr = new ArrayList<>();
            StringBuilder num = new StringBuilder();
            for (char c : str.toCharArray()) {
                if (c == ' ') {
                    arr.add(Integer.parseInt(num.toString()));
                    num = new StringBuilder();
                } else {
                    num.append(c);
                }
            }
            arr.add(Integer.parseInt(num.toString()));
    
            String res = getResult(arr);
            System.out.println(res);
        }
    }
    

#### Python

    
    
    
    if __name__ == '__main__':
        s = input()
    
        # 将输入字符串转换为数组
        arr = []
        num = ""
        for c in s:
            if c == ' ':
                arr.append(int(num))
                num = ""
            else:
                num += c
        arr.append(int(num))
    
        # 统计数组中每个数字出现的次数
        card = {}
        for num in arr:
            if num in card:
                card[num] += 1
            else:
                card[num] = 1
    
        # 定义存储不同组合的容器
        combine = {
            "4": [],
            "3+2": [],
            "3": [],
            "2": [],
            "1": []
        }
    
        # 将数字按照出现次数分组
        for num, count in card.items():
            if count == 3:
                combine["3"].append([num])
            elif count == 2:
                combine["2"].append([num])
            elif count == 1:
                combine["1"].append([num])
            else:
                combine["4"].append([num, count])
    
        # 对四张相同的牌进行排序
        combine["4"].sort(key=lambda x: (-x[1], -x[0]))
    
        # 对三张相同的牌进行排序
        combine["3"].sort(key=lambda x: -x[0])
    
        # 对两张相同的牌进行排序
        combine["2"].sort(key=lambda x: -x[0])
    
        # 尝试组合出葫芦
        while len(combine["3"]) > 0:
            # 如果没有两张相同的牌或者只剩下一组三张相同的牌，则无法组成葫芦，退出循环
            if len(combine["2"]) == 0 and len(combine["3"]) == 1:
                break
    
            # 取出一组三张相同的牌
            san_top = combine["3"][0][0]
            combine["3"].pop(0)
    
            # 如果还有另一组三张相同的牌，则与之组合成三带二
            if len(combine["2"]) == 0 or (len(combine["3"]) > 0 and combine["3"][0][0] > combine["2"][0][0]):
                tmp = combine["3"][0][0]
                combine["3"].pop(0)
                combine["1"].append([tmp])
            else:
                tmp = combine["2"][0][0]
                combine["2"].pop(0)
            combine["3+2"].append([san_top, tmp])
    
        # 对单张牌进行排序
        combine["1"].sort(key=lambda x: -x[0])
    
        # 将不同的组合按照顺序组合成最终的牌型
        ans = []
        for vals in combine["4"]:
            score, count = vals[0], vals[1]
            for i in range(count):
                ans.append(score)
        for vals in combine["3+2"]:
            san, er = vals[0], vals[1]
            for i in range(3):
                ans.append(san)
            for i in range(2):
                ans.append(er)
        for vals in combine["3"]:
            for i in range(3):
                ans.append(vals[0])
        for vals in combine["2"]:
            for i in range(2):
                ans.append(vals[0])
        for vals in combine["1"]:
            ans.append(vals[0])
        res = ' '.join([str(x) for x in ans])
    
        print(res)
      
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

