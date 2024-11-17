## 题目描述： 全量和已占用字符集 、字符串统计（分值100）

给定两个字符集合，一个是全量字符集，一个是已占用字符集，已占用字符集中的字符不能再使用。  
要求输出剩余可用字符集。

## 输入描述

  1. 输入一个字符串 一定包含@，@前为全量字符集 @后的为已占用字符集
  2. 已占用字符集中的字符一定是全量字符集中的字符
  3. 字符集中的字符跟字符之间使用英文逗号隔开
  4. 每个字符都表示为字符+数字的形式用英文冒号分隔，比如a:1标识一个a字符
  5. 字符只考虑英文字母，区分大小写
  6. 数字只考虑正整型 不超过100
  7. 如果一个字符都没被占用 @标识仍存在，例如 a:3,b:5,c:2@

## 输出描述

  * 输出可用字符集
  * 不同的输出字符集之间用回车换行
  * 注意 输出的字符顺序要跟输入的一致，如下面用例不能输出b:3,a:2,c:2
  * 如果某个字符已全部占用 则不需要再输出

## 用例

输入

    
    
    a:3,b:5,c:2@a:1,b:2
    

输出

    
    
    a:2,b:3,c:2
    

说明

> 全量字符集为三个a，5个b，2个c  
>  已占用字符集为1个a，2个b  
>  由于已占用字符不能再使用  
>  因此剩余可用字符为2个a，3个b，2个c  
>  因此输出a:2,b:3,c:2

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    #include <sstream>
    
    int main() {
        std::string input;
        std::getline(std::cin, input);
    
        // 将输入字符串按照@符号分割为全量字符集和已占用字符集
        std::string fullCharacterSet = input.substr(0, input.find("@"));
        std::string occupiedCharacterSet = input.substr(input.find("@") + 1);
    
        // 创建字符列表，用于存储全量字符集中的字符及其对应的数量
        std::vector<std::pair<std::string, int>> characterList;
    
        // 将全量字符集按照逗号分割为单个字符
        std::stringstream fullCharacterSetStream(fullCharacterSet);
        std::string character;
        while (std::getline(fullCharacterSetStream, character, ',')) {
            // 将字符按照冒号分割为字符和数量
            std::string characterSplit = character.substr(0, character.find(":"));
            int count = std::stoi(character.substr(character.find(":") + 1));
            characterList.push_back(std::make_pair(characterSplit, count)); // 将字符和数量添加到字符列表中
        }
    
        // 如果已占用字符集为空，则输出全量字符集
        if (occupiedCharacterSet.empty()) {
            std::cout << fullCharacterSet << "@" << std::endl;
            return 0;
        }
    
        // 创建已占用字符集的哈希表，用于存储已占用字符及其对应的数量
        std::unordered_map<std::string, int> occupiedCharacters;
    
        // 将已占用字符集按照逗号分割为单个字符
        std::stringstream occupiedCharacterSetStream(occupiedCharacterSet);
        while (std::getline(occupiedCharacterSetStream, character, ',')) {
            // 将字符按照冒号分割为字符和数量
            std::string characterSplit = character.substr(0, character.find(":"));
            int count = std::stoi(character.substr(character.find(":") + 1));
            occupiedCharacters[characterSplit] = count; // 将字符和数量添加到已占用字符集的哈希表中
        }
    
        // 遍历字符列表中的每个字符
        for (int i = 0; i < characterList.size(); i++) {
            std::string character = characterList[i].first;
            int count = characterList[i].second;
            // 如果已占用字符集中包含当前字符
            if (occupiedCharacters.count(character) > 0) {
                count -= occupiedCharacters[character]; // 计算剩余可用数量
                if (count > 0) {
                    characterList[i].second = count; // 更新字符列表中的数量为剩余可用数量
                } else {
                    characterList.erase(characterList.begin() + i); // 如果剩余可用数量为0，则移除当前字符
                    i--; // 由于移除了一个字符，需要将索引减1
                }
            }
        }
    
        // 构建输出字符串
        std::stringstream result;
        for (const auto& character : characterList) {
            result << character.first << ":" << character.second << ","; // 将每个字符及其数量添加到输出字符串中
        }
        std::string output = result.str();
        output = output.substr(0, output.length() - 1); // 删除最后一个逗号
        std::cout << output << std::endl; // 输出结果
    
        return 0;
    }
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      // 将输入字符串按照@符号分割为全量字符集和已占用字符集
      const splitInput = input.split("@");
      const fullCharacterSet = splitInput[0]; // 全量字符集
      const occupiedCharacterSet = splitInput[1]; // 已占用字符集
    
      // 创建字符列表，用于存储全量字符集中的字符及其对应的数量
      const characterList = [];
    
      // 将全量字符集按照逗号分割为单个字符
      const fullCharacterSetSplit = fullCharacterSet.split(",");
    
      // 遍历全量字符集的每个字符
      for (const character of fullCharacterSetSplit) {
        // 将字符按照冒号分割为字符和数量
        const characterSplit = character.split(":");
        characterList.push(characterSplit); // 将字符和数量添加到字符列表中
      }
    
      // 如果已占用字符集为空，则输出全量字符集
      if (occupiedCharacterSet === "") {
        console.log(fullCharacterSet + "@");
        process.exit(0);
      }
    
      // 创建已占用字符集的哈希表，用于存储已占用字符及其对应的数量
      const occupiedCharacters = {};
    
      // 将已占用字符集按照逗号分割为单个字符
      const occupiedCharacterSetSplit = occupiedCharacterSet.split(",");
    
      // 遍历已占用字符集的每个字符
      for (const character of occupiedCharacterSetSplit) {
        // 将字符按照冒号分割为字符和数量
        const characterSplit = character.split(":");
        occupiedCharacters[characterSplit[0]] = parseInt(characterSplit[1]); // 将字符和数量添加到已占用字符集的哈希表中
      }
    
      // 遍历字符列表中的每个字符
      for (let i = 0; i < characterList.length; i++) {
        const character = characterList[i];
        // 如果已占用字符集中包含当前字符
        if (character[0] in occupiedCharacters) {
          const count = parseInt(character[1]) - occupiedCharacters[character[0]]; // 计算剩余可用数量
          if (count > 0) {
            character[1] = count.toString(); // 更新字符列表中的数量为剩余可用数量
          } else {
            characterList.splice(i, 1); // 如果剩余可用数量为0，则移除当前字符
            i--; // 由于移除了一个字符，需要将索引减1
          }
        }
      }
    
      // 构建输出字符串
      let result = "";
      for (const character of characterList) {
        result += character[0] + ":" + character[1] + ","; // 将每个字符及其数量添加到输出字符串中
      }
      result = result.slice(0, -1); // 删除最后一个逗号
      console.log(result); // 输出结果
    
      rl.close();
    });
    

## Java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    import java.util.HashMap;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 读取输入字符串
            String input = scanner.nextLine();
            
            // 将输入字符串按照@符号分割为全量字符集和已占用字符集
            String[] splitInput = input.split("@");
            String fullCharacterSet = splitInput[0]; // 全量字符集
            String occupiedCharacterSet = splitInput[1]; // 已占用字符集
            
            // 创建字符列表，用于存储全量字符集中的字符及其对应的数量
            ArrayList<String[]> characterList = new ArrayList<>();
            
            // 将全量字符集按照逗号分割为单个字符
            String[] fullCharacterSetSplit = fullCharacterSet.split(",");
            
            // 遍历全量字符集的每个字符
            for (String character : fullCharacterSetSplit) {
                // 将字符按照冒号分割为字符和数量
                String[] characterSplit = character.split(":");
                characterList.add(characterSplit); // 将字符和数量添加到字符列表中
            }
            
            // 如果已占用字符集为空，则输出全量字符集
            if (occupiedCharacterSet.isEmpty()) {
                System.out.println(fullCharacterSet + "@");
                System.exit(0);
            }
            
            // 创建已占用字符集的哈希表，用于存储已占用字符及其对应的数量
            HashMap<String, Integer> occupiedCharacters = new HashMap<>();
            
            // 将已占用字符集按照逗号分割为单个字符
            String[] occupiedCharacterSetSplit = occupiedCharacterSet.split(",");
            
            // 遍历已占用字符集的每个字符
            for (String character : occupiedCharacterSetSplit) {
                // 将字符按照冒号分割为字符和数量
                String[] characterSplit = character.split(":");
                occupiedCharacters.put(characterSplit[0], Integer.parseInt(characterSplit[1])); // 将字符和数量添加到已占用字符集的哈希表中
            }
            
            // 遍历字符列表中的每个字符
            for (int i = 0; i < characterList.size(); i++) {
                String[] character = characterList.get(i);
                // 如果已占用字符集中包含当前字符
                if (occupiedCharacters.containsKey(character[0])) {
                    int count = Integer.parseInt(character[1]) - occupiedCharacters.get(character[0]); // 计算剩余可用数量
                    if (count > 0) {
                        character[1] = Integer.toString(count); // 更新字符列表中的数量为剩余可用数量
                    } else {
                        characterList.remove(i); // 如果剩余可用数量为0，则移除当前字符
                        i--; // 由于移除了一个字符，需要将索引减1
                    }
                }
            }
            
            // 构建输出字符串
            StringBuilder result = new StringBuilder();
            for (String[] character : characterList) {
                result.append(character[0]).append(":").append(character[1]).append(","); // 将每个字符及其数量添加到输出字符串中
            }
            result.deleteCharAt(result.length() - 1); // 删除最后一个逗号
            System.out.println(result.toString()); // 输出结果
        }
    }
    

## Python

    
    
    import sys
    
    # 读取输入字符串
    input = sys.stdin.readline().strip()
    
    # 将输入字符串按照@符号分割为全量字符集和已占用字符集
    splitInput = input.split("@")
    fullCharacterSet = splitInput[0] # 全量字符集
    occupiedCharacterSet = splitInput[1] # 已占用字符集
    
    # 创建字符列表，用于存储全量字符集中的字符及其对应的数量
    characterList = []
    
    # 将全量字符集按照逗号分割为单个字符
    fullCharacterSetSplit = fullCharacterSet.split(",")
    
    # 遍历全量字符集的每个字符
    for character in fullCharacterSetSplit:
        # 将字符按照冒号分割为字符和数量
        characterSplit = character.split(":")
        characterList.append(characterSplit) # 将字符和数量添加到字符列表中
    
    # 如果已占用字符集为空，则输出全量字符集
    if occupiedCharacterSet == "":
        print(fullCharacterSet + "@")
        sys.exit(0)
    
    # 创建已占用字符集的哈希表，用于存储已占用字符及其对应的数量
    occupiedCharacters = {}
    
    # 将已占用字符集按照逗号分割为单个字符
    occupiedCharacterSetSplit = occupiedCharacterSet.split(",")
    
    # 遍历已占用字符集的每个字符
    for character in occupiedCharacterSetSplit:
        # 将字符按照冒号分割为字符和数量
        characterSplit = character.split(":")
        occupiedCharacters[characterSplit[0]] = int(characterSplit[1]) # 将字符和数量添加到已占用字符集的哈希表中
    
    # 遍历字符列表中的每个字符
    i = 0
    while i < len(characterList):
        character = characterList[i]
        # 如果已占用字符集中包含当前字符
        if character[0] in occupiedCharacters:
            count = int(character[1]) - occupiedCharacters[character[0]] # 计算剩余可用数量
            if count > 0:
                character[1] = str(count) # 更新字符列表中的数量为剩余可用数量
            else:
                characterList.pop(i) # 如果剩余可用数量为0，则移除当前字符
                i -= 1 # 由于移除了一个字符，需要将索引减1
        i += 1
    
    # 构建输出字符串
    result = ""
    for character in characterList:
        result += character[0] + ":" + character[1] + "," # 将每个字符及其数量添加到输出字符串中
    result = result[:-1] # 删除最后一个逗号
    print(result) # 输出结果
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #define maxsize 1000   
    
    // 定义字符和数量的结构体
    typedef struct {
        char ch[26];  // 存储字符
        int count;    // 存储该字符的数量
    } CharStr;
    
    int main() {
        char input[maxsize];  // 用于存储输入的字符串
        fgets(input, maxsize, stdin);  // 从标准输入读取一行
    
        // 分割全量字符集和已占用字符集
        char* fullSet = strtok(input, "@");  // 分割出全量字符集
        char* occSet = strtok(NULL, "\n");   // 分割出已占用字符集
    
        // 定义两个字符数组，分别存储全量和已占用字符集的信息
        CharStr fullList[maxsize];  // 存储全量字符集
        int fullcnt = 0;  // 全量字符集中的元素计数
        CharStr occList[maxsize];  // 存储已占用字符集
        int occcnt = 0;  // 已占用字符集中的元素计数
    
        // 解析全量字符集字符串
        char* token = strtok(fullSet, ",");
        while (token != NULL) {
            sscanf(token, "%[^:]:%d", fullList[fullcnt].ch, &fullList[fullcnt].count);  // 解析字符和数量
            fullcnt++;
            token = strtok(NULL, ",");
        }
    
        // 解析已占用字符集字符串
        if (occSet != NULL) {
            token = strtok(occSet, ",");
            while (token != NULL) {
                sscanf(token, "%[^:]:%d", occList[occcnt].ch, &occList[occcnt].count);  // 解析字符和数量
                occcnt++;
                token = strtok(NULL, ",");
            }
        }
    
        // 计算剩余字符集
        for (int i = 0; i < fullcnt; i++) {
            for (int j = 0; j < occcnt; j++) {
                if (strcmp(fullList[i].ch, occList[j].ch) == 0) {  // 比较字符是否相同
                    fullList[i].count -= occList[j].count;  // 减去已占用的数量
                    break;
                }
            }
        }
    
        // 构建并输出最终的可用字符集
        char temp[100];  // 临时存储每个字符及其剩余数量
        char ans[100] = {0};  // 存储最终结果的字符串
        for (int i = 0; i < fullcnt; i++) {
            if (fullList[i].count > 0) {
                sprintf(temp, "%s:%d,", fullList[i].ch, fullList[i].count);  // 格式化字符串
                strcat(ans, temp);  // 连接到结果字符串
            }
        }
        int len = strlen(ans);
        if (len > 0) ans[len-1] = '\0';  // 去除最后一个逗号
        printf("%s", ans);  // 输出结果
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    a:3,b:5,c:2@a:1,b:2
    

### 用例2

    
    
    a:1,b:2,c:3@a:1,b:2,c:3
    

### 用例3

    
    
    x:10,y:20,z:30@x:5,y:10,z:15
    

### 用例4

    
    
    m:7,n:8,o:9@m:2,n:4,o:6
    

### 用例5

    
    
    x:1,y:2,z:3@x:1,y:1,z:3
    

### 用例6

    
    
    a:10,b:20,c:30@a:1,b:2,c:3
    

### 用例7

    
    
    a:3,b:5,c:2@a:1,b:2
    

### 用例8

    
    
    a:3,b:5,c:2@a:0,b:0,c:0
    

### 用例9

    
    
    l:1,t:3,u:5,v:7@l:1,t:2,u:3,v:4
    

### 用例10

    
    
    d:5,e:5,f:5@d:2,e:3,f:4
    

#### 文章目录

  * 题目描述： 全量和已占用字符集 、字符串统计（分值100）
  * 输入描述
  * 输出描述
  * 用例
  * C++
  * JavaScript
  * Java
  * Python
  * C语言
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/3cb8e2318f9657470932620a3ea3e1e8.png)

