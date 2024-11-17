#### 题目描述

在一个博客网站上，每篇博客都有评论。

每一条评论都是一个非空英文字母字符串。

评论具有树状结构，除了根评论外，每个评论都有一个父评论。

当评论保存时，使用以下格式：

  * 首先是评论的内容；
  * 然后是回复当前评论的数量。
  * 最后是当前评论的所有了评论。(子评论使用相同的格式嵌套存储)

所有元素之间都用单个逗号分隔。

例如，如果评论如下：

![image-20230830223149785](https://i-blog.csdnimg.cn/blog_migrate/2c2dc1cb2830494240a210a164c24594.png)

第一条评论是"helo,2,ok,0,bye,0"，第二条评论是"test,0"，第三条评论是"one,1,two,1,a,0"。

所有评论被保存成"hello,2,ok,0.bye,0,test,0,one,1,two,1,a,0"。

对于上述格式的评论，请以另外一种格式打印：

  * 首先打印评论嵌套的最大深度。
  * 然后是打印n行，第 i (1 ≤ i ≤ n) 行对应于嵌套级别为 i 的评论 (根评论的嵌套级别为1)。
  * 对于第 i 行，嵌套级别为的评论按照它们出现的顺序打印，用空格分隔开。

#### 输入描述

一行评论。由英文字母、数字和英文逗号组成。

保证每个评论都是由英文字符组成的非空字符串。

每个评论的数量都是整数 (至少由一个数字组成)。

整个字符串的长度不超过10^6。

给定的评论结构保证是合法的。

#### 输出描述

按照给定的格式打印评论。对于每一级嵌套，评论应该按照输入中的顺序打印。

#### 用例1

输入

    
    
    hello,2,ok,0,bye,0,test,0,one,1,two,1,a,0
    

输出

    
    
    3
    hello test one
    ok bye two
    a
    

说明

> 如题目描述中图所示，最大嵌套级别为3，嵌套级别为1的评论是"hello test one"，嵌套级别为2的评论是"ok bye
> two"，嵌套级别为3的评论为”a"”。

#### 用例2

输入

    
    
    A,5,A,0,a,0,A,0,a,0,A,0
    

输出

    
    
    2
    A
    A a A a A
    

说明

> 如下图所示，最大嵌套级别为2，嵌套级别为1的评论是"A”，嵌套级别为2的评论是"A a A a A"

![image-20230830223521862](https://i-blog.csdnimg.cn/blog_migrate/b5ddd995f58b9d411e20b405a1320963.png)

#### 用例3

输入

    
    
    A,3,B,2,C,0,D,1,E,0,F,1,G,0,H,1,I,1,J,0,K,1,L,0,M,2,N,0,O,1,P,0
    

输出

    
    
    4
    A K M
    B F H L N O
    C D G I P
    E J
    

说明

![image-20230830223549306](https://i-blog.csdnimg.cn/blog_migrate/995d8897317522f041ed58d960d46218.png)

#### 题目解析

这个问题的目标是处理一系列评论和子评论，并计算评论的最大深度以及输出每一层的评论内容。输入数据是一行字符串，其中包含评论和子评论的数量信息。我们需要将这些信息转换为一个结构化的评论列表。

  1. 首先，我们需要从标准输入读取一行输入数据。 然后，我们使用逗号分隔符将输入数据分割成一个字符串数组。这个数组包含了评论和子评论的数量信息。

  2. 接下来，我们需要初始化一些变量。我们将评论的最大深度初始化为 0，并创建一个空的评论列表，用于存储每一层的评论内容。

  3. 为了处理输入数据中的所有评论，我们使用一个循环。在循环中，我们首先读取根评论内容并将其添加到第一层评论列表中。然后，我们读取子评论的数量。

  4. 对于每个子评论，我们调用一个名为 `read` 的递归函数来处理。这个函数接受四个参数：输入数据列表、评论列表、当前深度和当前处理的输入索引。函数的主要任务是将评论内容添加到对应深度的评论列表中，并更新评论的最大深度。

  5. 在 `read` 函数中，我们首先检查当前深度是否大于等于评论列表的大小。如果是，我们需要在评论列表中添加一个新的空字符串。然后，我们读取评论内容并将其添加到对应深度的评论列表中。接下来，我们读取子评论的数量，并使用一个循环递归地处理每个子评论。在循环中，我们更新评论的最大深度和当前处理的输入索引。

  6. 当所有评论都处理完毕后，我们输出评论的最大深度加 1（因为深度是从 0 开始计算的），以及每一层的评论内容。

这个解题思路的核心是使用递归函数 `read`
来处理评论和子评论。通过递归地调用这个函数，我们可以方便地处理任意层次的评论结构。这种方法对于初学者来说可能有些复杂，但通过仔细阅读代码和理解递归的概念，您将能够更好地理解这个解题方法。

#### C++

    
    
    #include <iostream> // 导入输入输出流库
    #include <vector> // 导入向量库，用于存储评论列表
    #include <string> // 导入字符串库
    #include <sstream> // 导入字符串流库，用于分割字符串
    
    using namespace std;
    
    // 递归读取评论，参数：input为输入列表，comments为评论列表，curDepth为当前深度，index为当前处理的输入索引
    pair<int, int> read(vector<string> &input, vector<string> &comments, int curDepth, int index) {
        // 如果当前深度大于等于评论列表的大小，则添加一个新的空字符串
        if (curDepth >= comments.size()) {
            comments.push_back("");
        }
    
        // 读取评论内容并添加到对应深度的评论列表中
        comments[curDepth] += " " + input[index++];
    
        // 读取子评论数量
        int childNum = stoi(input[index++]);
        int depth = curDepth;
    
        // 递归读取子评论
        while (childNum > 0) {
            childNum--;
            pair<int, int> result = read(input, comments, curDepth + 1, index);
            depth = max(result.first, depth);
            index = result.second;
        }
    
        return make_pair(depth, index);
    }
    
    int main() {
        string inputLine;
        getline(cin, inputLine); // 读取输入行
    
        // 使用istringstream分割输入行
        istringstream iss(inputLine);
        vector<string> input;
        string token;
        while (getline(iss, token, ',')) {
            input.push_back(token);
        }
    
        int depth = 0; // 初始化评论的最大深度为0
        vector<string> comments; // 创建评论列表
        comments.push_back(""); // 添加第一层评论的空字符串
    
        // 读取评论并处理
        int index = 0;
        while (index < input.size()) {
            comments[0] += " " + input[index++]; // 读取根评论内容并添加到第一层评论列表中
            int childNum = stoi(input[index++]); // 读取子评论数量
    
            // 递归读取子评论
            while (childNum > 0) {
                childNum--;
                pair<int, int> result = read(input, comments, 1, index);
                depth = max(result.first, depth); // 更新评论的最大深度
                index = result.second;
            }
        }
    
        // 输出评论的最大深度和每一层的评论内容
        cout << depth + 1 << endl;
        for (const string &com : comments) {
            cout << com.substr(1) << endl;
        }
    
        return 0;
    }
    
    

#### Java

    
    
    import java.util.Scanner;  
    import java.util.ArrayList; 
    import java.lang.StringBuilder;
    import java.lang.Math;
    
    public class Main {
        // 递归读取评论，参数：input为输入列表，comments为评论列表，curDepth为当前深度，index为当前处理的输入索引
        public static int[] read(String[] input, ArrayList<StringBuilder> comments, int curDepth, int index) {
            // 如果当前深度大于等于评论列表的大小，则添加一个新的StringBuilder
            if (curDepth >= comments.size()) {
                comments.add(new StringBuilder());
            }
    
            // 读取评论内容并添加到对应深度的评论列表中
            StringBuilder rootCom = comments.get(curDepth);
            rootCom.append(' ' + input[index++]);
    
            // 读取子评论数量
            int childNum = Integer.parseInt(input[index++]);
            int depth = curDepth;
    
            // 递归读取子评论
            while (childNum > 0) {
                childNum--;
                int[] result = read(input, comments, curDepth + 1, index);
                depth = Math.max(result[0], depth);
                index = result[1];
            }
    
            return new int[]{depth, index};
        }
    
        public static void main(String[] args) {
            // 使用逗号和空格作为分隔符创建Scanner对象
            Scanner sc = new Scanner(System.in).useDelimiter(",|\\s");
            String inputLine = sc.nextLine(); // 读取输入行
            String[] input = inputLine.split(",|\\s"); // 将输入行按逗号和空格分割成字符串数组
            int depth = 0; // 初始化评论的最大深度为0
            ArrayList<StringBuilder> comments = new ArrayList<StringBuilder>(); // 创建评论列表
            comments.add(new StringBuilder()); // 添加第一层评论的StringBuilder
    
            // 读取评论并处理
            int index = 0;
            while (index < input.length) {
                StringBuilder rootCom = comments.get(0);
                rootCom.append(' ' + input[index++]); // 读取根评论内容并添加到第一层评论列表中
                int childNum = Integer.parseInt(input[index++]); // 读取子评论数量
    
                // 递归读取子评论
                while (childNum > 0) {
                    childNum--;
                    int[] result = read(input, comments, 1, index);
                    depth = Math.max(result[0], depth); // 更新评论的最大深度
                    index = result[1];
                }
            }
    
            // 输出评论的最大深度和每一层的评论内容
            System.out.println(depth + 1);
            for (StringBuilder com : comments) {
                System.out.println(com.substring(1));
            }
        }
    }
    
    

#### Python

    
    
    import sys
    
    # 递归读取评论，参数：input_data为输入列表，comments为评论列表，cur_depth为当前深度，index为当前处理的输入索引
    def read(input_data, comments, cur_depth, index):
        # 如果当前深度大于等于评论列表的大小，则添加一个新的空字符串
        if cur_depth >= len(comments):
            comments.append('')
    
        # 读取评论内容并添加到对应深度的评论列表中
        comments[cur_depth] += ' ' + input_data[index]
        index += 1
    
        # 读取子评论数量
        child_num = int(input_data[index])
        index += 1
        depth = cur_depth
    
        # 递归读取子评论
        while child_num > 0:
            child_num -= 1
            result = read(input_data, comments, cur_depth + 1, index)
            depth = max(result['depth'], depth)
            index = result['index']
    
        return {'depth': depth, 'index': index}
    
    # 读取输入行
    input_line = sys.stdin.readline().strip()
    
    # 将输入行按逗号和空格分割成字符串数组
    input_data = input_line.split(',')
    
    # 初始化评论的最大深度为0
    depth = 0
    
    # 创建评论列表
    comments = ['']
    
    # 读取评论并处理
    index = 0
    while index < len(input_data):
        # 读取根评论内容并添加到第一层评论列表中
        comments[0] += ' ' + input_data[index]
        index += 1
    
        # 读取子评论数量
        child_num = int(input_data[index])
        index += 1
    
        # 递归读取子评论
        while child_num > 0:
            child_num -= 1
            result = read(input_data, comments, 1, index)
            depth = max(result['depth'], depth)  # 更新评论的最大深度
            index = result['index']
    
    # 输出评论的最大深度和每一层的评论内容
    print(depth + 1)
    for com in comments:
        print(com[1:])
    
    

#### javascript

    
    
    let readline = require('readline'); // 导入readline库，用于读取输入
    
    // 递归读取评论，参数：input为输入列表，comments为评论列表，curDepth为当前深度，index为当前处理的输入索引
    function read(input, comments, curDepth, index) {
        // 如果当前深度大于等于评论列表的大小，则添加一个新的空字符串
        if (curDepth >= comments.length) {
            comments.push('');
        }
    
        // 读取评论内容并添加到对应深度的评论列表中
        comments[curDepth] += ' ' + input[index++];
    
        // 读取子评论数量
        let childNum = parseInt(input[index++]);
        let depth = curDepth;
    
        // 递归读取子评论
        while (childNum > 0) {
            childNum--;
            let result = read(input, comments, curDepth + 1, index);
            depth = Math.max(result.depth, depth);
            index = result.index;
        }
    
        return { depth, index };
    }
    
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (inputLine) => {
        let input = inputLine.split(/,|\s/); // 将输入行按逗号和空格分割成字符串数组
        let depth = 0; // 初始化评论的最大深度为0
        let comments = ['']; // 创建评论列表
    
        // 读取评论并处理
        let index = 0;
        while (index < input.length) {
            comments[0] += ' ' + input[index++]; // 读取根评论内容并添加到第一层评论列表中
            let childNum = parseInt(input[index++]); // 读取子评论数量
    
            // 递归读取子评论
            while (childNum > 0) {
                childNum--;
                let result = read(input, comments, 1, index);
                depth = Math.max(result.depth, depth); // 更新评论的最大深度
                index = result.index;
            }
        }
    
        // 输出评论的最大深度和每一层的评论内容
        console.log(depth + 1);
        for (let com of comments) {
            console.log(com.substring(1));
        }
    
        rl.close();
    });
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例1
      * 用例2
      * 用例3
      * 题目解析
      * C++
      * Java
      * Python
      * javascript

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

