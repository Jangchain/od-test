## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

去除文本多余空格，但不去除配对单引号之间的多余空格。给出关键词的起始和结束下标，去除多余空格后刷新关键词的起始和结束下标。

条件约束：  
1，不考虑关键词起始和结束位置为空格的场景；  
2，单词的的开始和结束下标保证涵盖一个完整的单词，即一个坐标对开始和结束下标之间不会有多余的空格；  
3，如果有单引号，则用例保证单引号成对出现；  
4，关键词可能会重复；  
5，文本字符长度length取值范围：[0, 100000];

#### 输入描述

输入为两行字符串：

第一行：待去除多余空格的文本，用例保证如果有单引号，则单引号成对出现，且单引号可能有多对。

第二行：关键词的开始和结束坐标，关键词间以逗号区分，关键词内的开始和结束位置以单空格区分。

#### 输出描述

输出为两行字符串：

第一行：去除多余空格后的文本  
第二行：去除多余空格后的关键词的坐标开始和结束位置，为数组方式输出。

#### 用例

输入| Life is painting a picture, not doing 'a sum'.  
8 15,20 26,43 45  
---|---  
输出| Life is painting a picture, not doing 'a sum'.  
[8, 15][19, 25][42, 44]  
说明| a和picture中间多余的空格进行删除  
输入| Life is painting a picture, not doin 'a sum'.  
8 15,19 25,42 44  
---|---  
输出| Life is painting a picture, not doing 'a sum'.  
[8, 15][19, 25][42, 44]  
说明| a和sum之间有多余的空格，但是因为有成对单引号，不去除多余空格  
  
#### 题目解析

#### C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <string>
    #include <algorithm>
    
    int main() {
        std::string inputText;
        std::getline(std::cin, inputText);
    
        std::string keywordPositions;
        std::getline(std::cin, keywordPositions);
    
        std::istringstream positionStream(keywordPositions);
        std::vector<std::pair<int, int>> keywordRanges;
        std::string positionSplit;
        while (std::getline(positionStream, positionSplit, ',')) {
            int start, end;
            std::istringstream indexStream(positionSplit);
            indexStream >> start >> end;
            keywordRanges.push_back({start, end});
        }
    
        std::string processedText;
        bool insideQuotes = false;
        std::vector<int> removedSpaces;
    
        for (size_t i = 0; i < inputText.size(); i++) {
            char c = inputText[i];
            if (c == '\'') {
                insideQuotes = !insideQuotes;
            }
            if (!insideQuotes && c == ' ' && i > 0 && inputText[i - 1] == ' ') {
                removedSpaces.push_back(i);
                continue;
            }
            processedText.push_back(c);
        }
    
        std::cout << processedText << std::endl;
    
        for (const auto& range : keywordRanges) {
            int left = range.first - std::count_if(removedSpaces.begin(), removedSpaces.end(), [&](int x) { return x < range.first; });
            int right = range.second - std::count_if(removedSpaces.begin(), removedSpaces.end(), [&](int x) { return x < range.second; });
            std::cout << "[" << left << ", " << right << "]";
        }
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    const inputLines = [];
    rl.on('line', (line) => {
        inputLines.push(line);
        if (inputLines.length === 2) {
            main(inputLines);
            rl.close();
        }
    });
    
    function main(input) {
        const inputText = input[0];
        const keywordPositions = input[1];
    
        const positionSplits = keywordPositions.split(',');
        const keywordRanges = positionSplits.map((split) => {
            const indexes = split.split(' ');
            return [parseInt(indexes[0]), parseInt(indexes[1])];
        });
    
        let processedText = '';
        let insideQuotes = false;
        const removedSpaces = [];
    
        for (let i = 0; i < inputText.length; i++) {
            const c = inputText[i];
            if (c === "'") {
                insideQuotes = !insideQuotes;
            }
            if (!insideQuotes && c === ' ' && i > 0 && inputText[i - 1] === ' ') {
                removedSpaces.push(i);
                continue;
            }
            processedText += c;
        }
    
        console.log(processedText);
        let ans = ''
        for (const range of keywordRanges) {
            const left = range[0] - removedSpaces.filter((x) => x < range[0]).length;
            const right = range[1] - removedSpaces.filter((x) => x < range[1]).length;
            ans = ans + (`[${left}, ${right}]`);
        }
        console.log(ans);
    
    }
    
    

#### Java

    
    
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            try (Scanner scanner = new Scanner(System.in)) {
                // 读取输入文本和关键词坐标
                String inputText = scanner.nextLine();
                String keywordPositions = scanner.nextLine();
    
                // 解析关键词坐标
                String[] positionSplits = keywordPositions.split(",");
                int[][] keywordRanges = new int[positionSplits.length][2];
                for (int i = 0; i < positionSplits.length; i++) {
                    String[] indexes = positionSplits[i].split(" ");
                    keywordRanges[i][0] = Integer.parseInt(indexes[0]);
                    keywordRanges[i][1] = Integer.parseInt(indexes[1]);
                }
    
                // 去除多余空格
                StringBuilder processedText = new StringBuilder();
                char[] chars = inputText.toCharArray();
                boolean insideQuotes = false;
                ArrayList<Integer> removedSpaces = new ArrayList<>();
    
                for (int i = 0; i < chars.length; i++) {
                    char c = chars[i];
                    if (c == '\'') {
                        insideQuotes = !insideQuotes;
                    }
                    if (!insideQuotes && c == ' ' && i > 0 && chars[i - 1] == ' ') {
                        removedSpaces.add(i);
                        continue;
                    }
                    processedText.append(c);
                }
    
                // 输出处理后的文本
                System.out.println(processedText);
    
                // 输出更新后的关键词坐标
                for (int[] range : keywordRanges) {
                    int left = (int) (range[0] - removedSpaces.stream().filter(x -> x < range[0]).count());
                    int right = (int) (range[1] - removedSpaces.stream().filter(x -> x < range[1]).count());
                    System.out.print(Arrays.toString(new int[]{left, right}));
                }
            }
        }
    }
    
    

#### Python

    
    
    def main():
        input_text = input()  # 读取输入文本
        keyword_positions = input()  # 读取关键词坐标
    
        # 解析关键词坐标
        position_splits = keyword_positions.split(",")
        keyword_ranges = [[int(index) for index in pos.split()] for pos in position_splits]
    
        # 去除多余空格
        processed_text = []
        inside_quotes = False
        removed_spaces = []
    
        for i, c in enumerate(input_text):
            if c == "'":
                inside_quotes = not inside_quotes
            if not inside_quotes and c == ' ' and i > 0 and input_text[i - 1] == ' ':
                removed_spaces.append(i)
                continue
            processed_text.append(c)
    
        processed_text = ''.join(processed_text)
    
        # 输出处理后的文本
        print(processed_text)
    
        # 输出更新后的关键词坐标
        for range_ in keyword_ranges:
            left = range_[0] - sum(1 for x in removed_spaces if x < range_[0])
            right = range_[1] - sum(1 for x in removed_spaces if x < range_[1])
            print(f"[{left}, {right}]", end='')
    
    
    if __name__ == "__main__":
        main()
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

