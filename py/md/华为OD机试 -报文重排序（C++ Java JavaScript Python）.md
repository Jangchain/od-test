### 题目描述：报文重排序

对报文进行重传和重排序是常用的可靠性机制，重传缓冲区内有一定数量的子报文，每个子报文在原始报文中的顺序已知，现在需要恢复出原始报文。。

### 输入描述：

输入第一行为N，表示子报文的个数，0 < N <= 1000。

输入第二行为N个子报文，以空格分开，子报文格式为字符串报文内容+后缀顺序索引，字符串报文内容由[a-z,A-Z]组成，后缀为整形值，表示顺序。顺序值唯一，不重复。

### 输出描述：

输出恢复出的原始报文。按照每个子报文的顺序的升序排序恢复出原始报文，顺序后缀需要从恢复出的报文中删除掉

### 用例1

#### 输入：

    
    
    4
    rolling3 stone4 like1 a2
    

#### 输出：

    
    
    like a rolling stone
    

#### 说明：

> 4个子报文的内容分别为 ‘rolling’, ‘stone’, ‘like’,
> ‘a’，顺序值分别为3，4，1，2，按照顺序值升序并删除掉顺序后缀，得到恢复的原始报文：like a rolling stone

### 用例2

#### 输入：

    
    
    8
    gifts6 and7  Exchanging1 all2 precious5 things8 kinds3 of4
    
    //  注：这里需要注意:and7与Exchanging1有两个空格
    

#### 输出：

    
    
    Exchanging all kinds of precious gifts and things
    

### 解题思路：

  1. 首先读入输入的子报文个数N和N个子报文内容。
  2. 创建一个 map，用于存储子报文的顺序索引和报文内容。
  3. 遍历输入的子报文内容，对每个子报文进行处理：  
a. 找到报文内容和顺序索引的分界点，即数字开始的下标。  
b. 将报文内容和顺序索引分别存入letterMap中。

  4. 创建一个空字符串res，用于存储恢复出的原始报文。
  5. 遍历顺序索引从1到N，将对应的报文内容从map中取出并添加到res中。
  6. 输出res，即恢复出的原始报文。

### C++

    
    
    #include <iostream>
    #include <string>
    #include <map>
    
    using namespace std;
    
    int main() {
        string line;
    
          getline(cin, line);
       int N = stoi(line);
       string input;
       getline(cin, input);
       string delimiter = " ";
       size_t pos = 0;
       string token;
       map<int, string> letterMap;
       while ((pos = input.find(delimiter)) != string::npos) {
           token = input.substr(0, pos);
           int index = 0;
           for (int i = 0; i < token.length(); i++) {
               if (isdigit(token[i])) {
                   index = i;
                   break;
               }
           }
           string letter = token.substr(0, index);
           int num = stoi(token.substr(index));
           letterMap[num] = letter;
           input.erase(0, pos + delimiter.length());
       }
       letterMap[stoi(input.substr(1))] = input.substr(0, 1);
    
       string res = "";
       for (int i = 1; i <= N; i++) {
           res += letterMap[i] + " ";
       }
       cout << res.substr(0, res.length() - 1) << endl;
    
       return 0;
    }
    
    

### java

    
    
    import java.util.*;
    
    public class Main{
     
        public static void main(String[] args) {
     
            Scanner sc = new Scanner(System.in);
     
            int N = sc.nextInt();
            sc.nextLine();
            String[] strings = sc.nextLine().split(" ");
     
            Map<Integer, String> letterMap = new HashMap<>();
            for(int i=0; i<strings.length; i++){
                String str = strings[i];
                //防止空格
                if(str.equals("")){
                    continue;
                }
                //数字开始的下标
                int index = 0;
                for(int j=0; j<str.length(); j++){
                    if(Character.isDigit(str.charAt(j))){
                        index = j;
                        break;
                    }
                }
                //字母部分
                String letter = str.substring(0, index);
                //顺序部分
                int num = Integer.parseInt(str.substring(index));
                letterMap.put(num, letter);
            }
     
            String res = "";
            for(int i=1; i<=N; i++){
                res += letterMap.get(i) + " ";
            }
     
            System.out.println(res.substring(0, res.length() - 1));
        }
     
    }
    
    

### python

    
    
    N = int(input().strip())
    strings = input().strip().split()
    
    letterMap = {}
    for i in range(len(strings)):
        str = strings[i]
        if str == "":
            continue
        index = 0
        for j in range(len(str)):
            if str[j].isdigit():
                index = j
                break
        letter = str[:index]
        num = int(str[index:])
        letterMap[num] = letter
    
    res = ""
    for i in range(1, N+1):
        res += letterMap[i] + " "
    
    print(res[:-1])
    

### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const N = parseInt(input);
      rl.on('line', (input) => {
        const strings = input.split(" ");
        const letterMap = new Map();
        for(let i=0; i<strings.length; i++){
          const str = strings[i];
          if(str === ""){
            continue;
          }
          let index = 0;
          for(let j=0; j<str.length; j++){
            if(!isNaN(parseInt(str.charAt(j)))){
              index = j;
              break;
            }
          }
          const letter = str.substring(0, index);
          const num = parseInt(str.substring(index));
          letterMap.set(num, letter);
        }
        let res = "";
        for(let i=1; i<=N; i++){
          res += letterMap.get(i) + " ";
        }
        console.log(res.substring(0, res.length - 1));
      });
    });
    
    

> #### 文章目录
>
>   *     * 题目描述：报文重排序
>     * 输入描述：
>     * 输出描述：
>     * 用例1
>     *       * 输入：
>       * 输出：
>       * 说明：
>     * 用例2
>     *       * 输入：
>       * 输出：
>     * 解题思路：
>     * C++
>     * java
>     * python
>     * javaScript
>     *       * 完整用例
>       *         * 1
>         * 2
>         * 3
>         * 4
>         * 5
>         * 6
>         * 7
>         * 8
>         * 9
>         * 10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 1

    
    
    4
    nrolling3 stone4 like1 a2
    

##### 2

    
    
    5
    a2 b1 c5 d3 e4
    

##### 3

    
    
    8
    gifts6 and7  Exchanging1 all2 precious5 things8 kinds3 of4
    

##### 4

    
    
    2
    hello2 world1
    

##### 5

    
    
    6
    dog4 cat1 fish2 bird3 cow6 horse5
    

##### 6

    
    
    8
    gifts6 and7 Exchanging1 all2 precious5 things8 kinds3 of4
    

##### 7

    
    
    10
    a1 b2 c3 d4 e5 f6 g7 h8 i9 j10
    

##### 8

    
    
    7
    a1 b2 c3 d4 e5 f6 g7
    

##### 9

    
    
    6
    a1 b2 c3 d4 e5 f6
    

##### 10

    
    
    3
    a3 b2 c1
    

