#### 题目描述

给一个字符串，表示用’,’分开的人名。

然后给定一个字符串，进行快速人名查找，符合要求的输出。

快速人名查找要求︰人名的每个单词的连续前几位能组成给定字符串，一定要用到每个单词。

#### 输入描述

第一行是人名，用’,’分开的人名  
第二行是
[查找字符串](https://so.csdn.net/so/search?q=%E6%9F%A5%E6%89%BE%E5%AD%97%E7%AC%A6%E4%B8%B2&spm=1001.2101.3001.7020)

#### 输出描述

输出满足要求的人名

#### 用例1

输入

    
    
    zhang san,zhang san san
    zs
    

输出

    
    
    zhang san
    

#### 用例2

输入

    
    
    zhang san san,zhang an sa,zhang hang,zhang seng,zhang sen a
    zhas
    

输出

    
    
    zhang an sa,zhang seng
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    bool dfs(vector<string>& person, int pi, string exp, int ej) {
        if (pi == person.size() || ej == exp.length()) {
            return (pi == person.size() && ej == exp.length());
        }
        string name = person[pi];
        if (name[0] != exp[ej]) {
            return false;
        }
        int cnt = 1;
        while (cnt < name.length() && ej + cnt < exp.length() && name[cnt] == exp[ej + cnt]) {
            if (dfs(person, pi + 1, exp, ej + cnt + 1)) {
                return true;
            }
            cnt++;
        }
        return dfs(person, pi + 1, exp, ej + 1);
    }
    
    int main() {
        vector<string> names;
        string input;
        getline(cin, input);
        string name;
        for (int i = 0; i < input.size(); i++) {
            if (input[i] == ',') {
                names.push_back(name);
                name = "";
            } else {
                name += input[i];
            }
        }
        names.push_back(name);
        string exp;
        cin >> exp;
        string ans = "";
        for (string name : names) {
            vector<string> person;
            string word;
            for (int i = 0; i < name.length(); i++) {
                if (name[i] == ' ') {
                    person.push_back(word);
                    word = "";
                } else {
                    word += name[i];
                }
            }
            person.push_back(word);
            if (dfs(person, 0, exp, 0)) {
                ans = ans.empty() ? name : ans + "," + name;
            }
        }
        cout << ans << endl;
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require("readline");
    // 创建readline接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // 定义一个空数组，用于存储输入的数据
    const input = [];
    // 监听控制台的输入
    rl.on("line", (line) => {
      // 将每一行的数据存入数组
      input.push(line);
      // 当输入的数据达到2行时，开始处理数据
      if (input.length === 2) {
        const names = input[0].split(","); // 将人名以逗号分隔并存储在数组中
        const abbr = input[1]; // 存储查找字符串
          const result = []; // 存储符合要求的人名
      for (let name of names) { // 遍历人名数组
        const parts = name.split(" "); // 将人名以空格分隔并存储在数组中
        if (parts.length > abbr.length) continue; // 如果人名的单词数大于查找字符串的长度，则跳过当前人名
        const res = dfs(parts, 0, abbr, 0); // 调用dfs函数查找是否符合要求
        if (res) { // 如果符合要求，则将该人名存储到结果数组中
          result.push(name);
        }
      }
        console.log(result.join(",")); // 输出满足要求的人名
        // 处理完数据后，清空input数组
        input.length = 0;
      }
    });
    
    
    // 定义dfs函数，用于深度优先搜索查找符合要求的人名
    function dfs(parts, index, abbr, start) {
      if (start >= abbr.length) return index >= parts.length; // 如果查找字符串已经被匹配完，则判断人名的单词数是否被匹配完
      for (let i = index; i < parts.length; i++) { // 遍历人名的单词数组
        const part = parts[i]; // 取出当前单词
        for (let j = 0; j < part.length; j++) { // 遍历单词的每一个字符
          if (start < abbr.length && part[j] == abbr[start]) { // 如果当前字符与查找字符串的当前字符相等，则继续匹配下一个字符
            const res = dfs(parts, i + 1, abbr, ++start); // 递归调用dfs函数，继续匹配下一个单词
            if (res) return true; // 如果匹配成功，则返回true
          } else {
            return false; // 如果匹配失败，则返回false
          }
        }
      }
      return false; // 如果所有单词都被匹配完，但是查找字符串还没有被匹配完，则返回false
    }
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
    
    
        // 一定要用到每个单词
        // 前i个字符去匹配exp的前j个字符
        public static boolean dfs(List<String> person, int pi, String exp, int ej) {
            // 有任意一方已经使用完了
            if (pi == person.size() || ej == exp.length()) {
                return (pi == person.size() && ej == exp.length()); // 只有两方同时使用完了，才是ok的
            }
    
            // 开始匹配，对于当前person[pi]
            // 其首字母一定要匹配，否则这个字符就不能用
            // 对于当前person[i]，它可以取用person[0...]去匹配exp[ej]
            String name = person.get(pi);
    
            // 首字母不匹配，直接退出
            if (name.charAt(0) != exp.charAt(ej)) {
                return false;
            }
    
            // name和exp开始匹配
            // name消耗多个exp
            int cnt = 1;
            while (cnt < name.length() && ej + cnt < exp.length() && name.charAt(cnt) == exp.charAt(ej + cnt)) {
                if (dfs(person, pi + 1, exp, ej + cnt + 1)) {
                    return true;
                }
                cnt++;
            }
    
            // 首字母匹配，那么直接进行下一个匹配
            return dfs(person, pi + 1, exp, ej + 1);
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            List<String> names = Arrays.asList(scanner.nextLine().split(","));
            String exp = scanner.next();
            String ans = "";
            for (String name : names) {
                List<String> person = Arrays.asList(name.split(" "));
                if (dfs(person, 0, exp, 0)) {
                    ans = ans.isEmpty() ? name : ans + "," + name;
                }
            }
            System.out.println(ans);
        }
    }
    

#### Python

    
    
    from typing import List
    
    def dfs(person: List[str], pi: int, exp: str, ej: int) -> bool:
        if pi == len(person) or ej == len(exp):
            return pi == len(person) and ej == len(exp)
        
        name = person[pi]
        
        if name[0] != exp[ej]:
            return False
        
        cnt = 1
        while cnt < len(name) and ej + cnt < len(exp) and name[cnt] == exp[ej + cnt]:
            if dfs(person, pi + 1, exp, ej + cnt + 1):
                return True
            cnt += 1
        
        return dfs(person, pi + 1, exp, ej + 1)
    
    
    names = input().split(',')
    exp = input()
    ans = ""
    for name in names:
        person = name.split(' ')
        if dfs(person, 0, exp, 0):
            ans = name if ans == "" else ans + "," + name
    print(ans)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例1
      * 用例2
      * C++
      * JavaScript
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

#### 完整用例

##### 用例1

    
    
    zhang san,zhang san san
    zs
    

##### 用例2

    
    
    zhang san san,zhang an sa,zhang hang,zhang seng,zhang sen a
    zhas
    

##### 用例3

    
    
    zhang san,zhao si,li wu
    zhangsan
    

##### 用例4

    
    
    li si,wang wu,zhao liu
    ww
    

##### 用例5

    
    
    zhang san san,zhang an sa,zhang hang,zhang seng,zhang sen a
    zhas
    

##### 用例6

    
    
    liu qi,liu liu qi,liu qi qi,liu qi qi qi
    lqq
    

##### 用例7

    
    
    wang wu,wang wang wu,wang wu wu,wang wu wu wu
    www
    

##### 用例8

    
    
    chen shi,chen chen shi,chen shi shi,chen shi shi shi
    css
    

##### 用例9

    
    
    wang wu,wang wang wu,wang wu wu,wang wu wu wu,wang wu wu wu wu
    wwww
    

##### 用例10

    
    
    chen shi,chen chen shi,chen shi shi,chen shi shi shi,chen shi shi shi shi
    cssss
    

