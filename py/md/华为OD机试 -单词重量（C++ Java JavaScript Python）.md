## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

每个句子由多个单词组成，句子中的每个单词的长度都可能不一样，我们假设每个单词的长度Ni为该单词的重量，你需要做的就是给出整个句子的平均重量V。

#### 输入描述

无

#### 输出描述

无

#### 用例

输入| Who Love Solo  
---|---  
输出| 3.67  
说明| 无  
  
#### JavaScript

    
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 读取输入的句子
    readline.on('line', (sentence) => {
      // 将句子拆分为单词数组
      const words = sentence.split(' ');
    
      // 计算单词总长度
      const totalLength = words.reduce((sum, word) => sum + word.length, 0);
    
      // 计算平均单词长度
      const averageLength = totalLength / words.length;
    
      // 输出平均单词长度，保留两位小数
      console.log(averageLength.toFixed(2));
    
      readline.close();
    });
    
    

#### C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <iomanip>
    #include <iterator>
    
    int main() {
        // 读取输入的句子
        std::string sentence;
        std::getline(std::cin, sentence);
    
        // 将句子拆分为单词向量
        std::istringstream iss(sentence);
        std::vector<std::string> words{std::istream_iterator<std::string>{iss},
                                        std::istream_iterator<std::string>{}};
    
        // 计算单词总长度
        int totalLength = 0;
        for (const auto &word : words) {
            totalLength += word.length();
        }
    
        // 计算平均单词长度
        double averageLength = static_cast<double>(totalLength) / words.size();
    
        // 输出平均单词长度，保留两位小数
        std::cout << std::fixed << std::setprecision(2) << averageLength << std::endl;
    
        return 0;
    }
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象以读取输入
            Scanner sc = new Scanner(System.in);
    
            // 读取输入的句子
            String sentence = sc.nextLine();
    
            // 将句子拆分为单词数组
            String[] words = sentence.split(" ");
    
            // 计算单词总长度
            int totalLength = 0;
            for (String word : words) {
                totalLength += word.length();
            }
    
            // 计算平均单词长度
            double averageLength = (double) totalLength / words.length;
    
            // 输出平均单词长度，保留两位小数
            System.out.printf("%.2f%n", averageLength);
        }
    }
    
    

#### Python

    
    
    def main():
        # 读取输入的句子
        sentence = input()
    
        # 将句子拆分为单词列表
        words = sentence.split()
    
        # 计算单词总长度
        total_length = sum(len(word) for word in words)
    
        # 计算平均单词长度
        average_length = total_length / len(words)
    
        # 输出平均单词长度，保留两位小数
        print(f"{average_length:.2f}")
    
    
    if __name__ == '__main__':
        main()
    
    

#### 完整用例

##### 用例1

    
    
    Hello World
    

##### 用例2

    
    
    AI is amazing
    

##### 用例3

    
    
    This is a test
    

##### 用例4

    
    
    I love programming
    

##### 用例5

    
    
    Java Python JavaScript
    

##### 用例6

    
    
    Quick brown fox
    

##### 用例7

    
    
    Lorem ipsum dolor
    

##### 用例8

    
    
    The quick brown fox jumps over the lazy dog
    

##### 用例9

    
    
    One Two Three
    

##### 用例10

    
    
    a an the
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

