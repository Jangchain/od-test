## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有一个简易内存池，内存按照大小粒度分类，每个粒度有若干个可用内存资源，用户会进行一系列内存申请，需要按需分配内存池中的资源返回申请结果成功失败列表。

分配规则如下：

  * 分配的内存要大于等于内存的申请量，存在满足需求的内存就必须分配，优先分配粒度小的，但内存不能拆分使用；
  * 需要按申请顺序分配，先申请的先分配，有可用内存分配则申请结果为true；
  * 没有可用则返回false。

注意：不考虑内存释放

## 输入描述

输入为两行字符串

第一行为内存池资源列表，包含内存粒度数据信息，粒度数据间用逗号分割

  * 一个粒度信息内用冒号分割，冒号前为内存粒度大小，冒号后为数量
  * 资源列表不大于1024
  * 每个粒度的数量不大于4096

第二行为申请列表，申请的内存大小间用逗号分割

  * 申请列表不大于100000

如:  
64:2,128:1,32:4,1:128  
50,36,64,128,127

## 输出描述

输出为内存池分配结果

如true,true,true,false,false

## 示例1

输入

    
    
    64:2,128:1,32:4,1:128
    50,36,64,128,127
    

输出

    
    
    true,true,true,false,false
    

说明

> 内存池资源包含：64K共2个、128K共1个、32K共4个、1K共128个的内存资源；  
>  针对50,36,64,128,127的内存申请序列，分配的内存依次是：64,64,128,NULL,NULL,  
>  第三次申请内存时已经将128分配出去，因此输出结果是：  
>  true,true,true,false,false

## 解题思路

### 规则总结：

  * 按需分配内存，不能拆分。
  * 优先分配最小的满足条件的内存块。
  * 内存池中的资源一旦分配出去，就无法再次使用。
  * 若没有可用内存块满足需求，返回 `false`。

* * *

### 示例解释：

**输入：**

    
    
    64:2,128:1,32:4,1:128
    50,36,64,128,127
    

**输出：**

    
    
    true,true,true,false,false
    

##### 解释过程：

  1. **内存池初始化** ：

     * 内存池资源为： 
       * 64K 的内存块有 2 个。
       * 128K 的内存块有 1 个。
       * 32K 的内存块有 4 个。
       * 1K 的内存块有 128 个。
  2. **申请 50K 内存** ：

     * 50K 需要一个大于等于 50K 的内存块。
     * 从内存池中寻找，最小满足要求的内存块是 64K，因此分配一个 64K 的内存块，成功，返回 `true`。
     * 剩余内存池：64:1, 128:1, 32:4, 1:128。
  3. **申请 36K 内存** ：

     * 36K 需要一个大于等于 36K 的内存块。
     * 最小满足要求的内存块是 64K，因此分配一个 64K 的内存块，成功，返回 `true`。
     * 剩余内存池：64:0, 128:1, 32:4, 1:128。
  4. **申请 64K 内存** ：

     * 64K 需要一个大于等于 64K 的内存块。
     * 内存池中没有剩余的 64K 内存块，唯一满足条件的内存块是 128K，因此分配一个 128K 的内存块，成功，返回 `true`。
     * 剩余内存池：64:0, 128:0, 32:4, 1:128。
  5. **申请 128K 内存** ：

     * 128K 需要一个大于等于 128K 的内存块。
     * 但是内存池中已经没有 128K 或更大的内存块了，分配失败，返回 `false`。
  6. **申请 127K 内存** ：

     * 127K 需要一个大于等于 127K 的内存块。
     * 同样，内存池中没有 128K 或更大的内存块，分配失败，返回 `false`。

最终，输出为 `true,true,true,false,false`。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 处理输入
            Scanner scanner = new Scanner(System.in); // 创建一个Scanner对象，用于读取控制台的输入
            String memoryInfo = scanner.next(); // 读取内存池资源列表
            String applyList = scanner.next(); // 读取申请列表
    
            // 内存信息
            List<Integer> memoryList = new ArrayList<>(); // 创建一个ArrayList对象，用于存储内存池中可用的内存大小
            List<String> memoryInfoList = new ArrayList<>(Arrays.asList(memoryInfo.split(","))); // 将内存池资源列表按逗号分隔，转换为ArrayList对象
            for (String info : memoryInfoList) { // 遍历内存池资源列表
                int colonIndex = info.indexOf(":"); // 找到冒号的位置
                int size = Integer.parseInt(info.substring(0, colonIndex)); // 截取内存大小
                int count = Integer.parseInt(info.substring(colonIndex + 1)); // 截取内存块数量
                for (int i = 0; i < count; i++) { // 将内存块数量的内存大小添加到内存列表中
                    memoryList.add(size);
                }
            }
    
            // 申请信息
            List<Integer> applyMemoryList = new ArrayList<>(); // 创建一个ArrayList对象，用于存储申请的内存大小
            List<String> applyListList = new ArrayList<>(Arrays.asList(applyList.split(","))); // 将申请列表按逗号分隔，转换为ArrayList对象
            for (String apply : applyListList) { // 遍历申请列表
                applyMemoryList.add(Integer.parseInt(apply)); // 将申请的内存大小添加到申请内存列表中
            }
    
            // 分配内存
            List<Boolean> resultList = new ArrayList<>(); // 创建一个ArrayList对象，用于存储每个申请是否成功
            for (int applyMemory : applyMemoryList) { // 遍历申请内存列表
                boolean flag = false; // 定义一个标志位，用于标记是否成功分配内存
                for (int i = 0; i < memoryList.size(); i++) { // 遍历内存列表
                    if (memoryList.get(i) >= applyMemory) { // 如果当前内存块的大小大于等于申请的内存大小
                        flag = true; // 标记成功分配内存
                        memoryList.remove(i); // 将当前内存块从内存列表中移除
                        break; // 跳出循环
                    }
                }
                resultList.add(flag); // 将是否成功分配内存的结果添加到结果列表中
            }
    
            // 输出结果
            for (int i = 0; i < resultList.size(); i++) { // 遍历结果列表
                System.out.print(resultList.get(i)); // 输出当前申请是否成功分配内存
                if (i != resultList.size() - 1) { // 如果不是最后一个结果
                    System.out.print(","); // 输出逗号分隔符
                }
            }
        }
    }
    
    

## Python

    
    
    memoryInfo = input() # 读取内存池资源列表
    applyList = input() # 读取申请列表
    
    # 内存信息
    memoryList = [] # 创建一个列表，用于存储内存池中可用的内存大小
    memoryInfoList = memoryInfo.split(",") # 将内存池资源列表按逗号分隔，转换为列表
    for info in memoryInfoList: # 遍历内存池资源列表
        colonIndex = info.index(":") # 找到冒号的位置
        size = int(info[:colonIndex]) # 截取内存大小
        count = int(info[colonIndex + 1:]) # 截取内存块数量
        for i in range(count): # 将内存块数量的内存大小添加到内存列表中
            memoryList.append(size)
    
    # 申请信息
    applyMemoryList = [] # 创建一个列表，用于存储申请的内存大小
    applyListList = applyList.split(",") # 将申请列表按逗号分隔，转换为列表
    for apply in applyListList: # 遍历申请列表
        applyMemoryList.append(int(apply)) # 将申请的内存大小添加到申请内存列表中
    
    # 分配内存
    resultList = [] # 创建一个列表，用于存储每个申请是否成功
    for applyMemory in applyMemoryList: # 遍历申请内存列表
        flag = False # 定义一个标志位，用于标记是否成功分配内存
        for i in range(len(memoryList)): # 遍历内存列表
            if memoryList[i] >= applyMemory: # 如果当前内存块的大小大于等于申请的内存大小
                flag = True # 标记成功分配内存
                memoryList.pop(i) # 将当前内存块从内存列表中移除
                break # 跳出循环
        resultList.append(flag) # 将是否成功分配内存的结果添加到结果列表中
    
    # 输出结果
    for i in range(len(resultList)): # 遍历结果列表
        print(resultList[i], end='') # 输出当前申请是否成功分配内存
        if i != len(resultList) - 1: # 如果不是最后一个结果
            print(',', end='') # 输出逗号分隔符
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let memoryInfo, applyList;
    
    rl.on('line', (input) => {
      if (!memoryInfo) {
        memoryInfo = input;
      } else if (!applyList) {
        applyList = input;
        rl.close();
      }
    });
    
    rl.on('close', () => {
      // 处理输入
      const memoryList = [];
      const memoryInfoArr = memoryInfo.split(',');
      for (let i = 0; i < memoryInfoArr.length; i++) {
        const [sizeStr, countStr] = memoryInfoArr[i].split(':');
        const size = parseInt(sizeStr);
        const count = parseInt(countStr);
        for (let j = 0; j < count; j++) {
          memoryList.push(size);
        }
      }
    
      // 申请信息
      const applyMemoryList = applyList.split(',').map(Number);
    
      // 分配内存
      const resultList = [];
      for (let i = 0; i < applyMemoryList.length; i++) {
        let flag = false;
        for (let j = 0; j < memoryList.length; j++) {
          if (memoryList[j] >= applyMemoryList[i]) {
            flag = true;
            memoryList.splice(j, 1);
            break;
          }
        }
        resultList.push(flag);
      }
    
      // 输出结果
      console.log(resultList.map((res) => res ? 'true' : 'false').join(','));
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    
    using namespace std;
    
    int main() {
        // 处理输入
        string memoryInfo, applyList;
        cin >> memoryInfo >> applyList;
    
        // 内存信息
        vector<int> memoryList;
        stringstream ss(memoryInfo);
        string info;
        while (getline(ss, info, ',')) {
            int colonIndex = info.find(":");
            int size = stoi(info.substr(0, colonIndex));
            int count = stoi(info.substr(colonIndex + 1));
            for (int i = 0; i < count; i++) {
                memoryList.push_back(size);
            }
        }
    
        // 申请信息
        vector<int> applyMemoryList;
        stringstream ss2(applyList);
        string apply;
        while (getline(ss2, apply, ',')) {
            applyMemoryList.push_back(stoi(apply));
        }
    
        // 分配内存
        vector<bool> resultList;
        for (int applyMemory : applyMemoryList) {
            bool flag = false;
            for (int i = 0; i < memoryList.size(); i++) {
                if (memoryList[i] >= applyMemory) {
                    flag = true;
                    memoryList.erase(memoryList.begin() + i);
                    break;
                }
            }
            resultList.push_back(flag);
        }
    
        // 输出结果
        for (int i = 0; i < resultList.size(); i++) {
            cout << (resultList[i] ? "true" : "false");
            if (i != resultList.size() - 1) {
                cout << ",";
            }
        }
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    #define MAX_MEMORY_BLOCKS 1000  // 最大内存块数量
    #define MAX_APPLY_REQUESTS 1000 // 最大申请请求数量
    #define MAX_INPUT_LENGTH 1024   // 最大输入字符串长度
    
    int main() {
        char memoryInfo[MAX_INPUT_LENGTH], applyList[MAX_INPUT_LENGTH];
        int memoryList[MAX_MEMORY_BLOCKS];   // 用于存储内存块大小的数组
        int memoryCount = 0;                 // 内存块总数
        int applyMemoryList[MAX_APPLY_REQUESTS]; // 用于存储内存申请大小的数组
        int applyCount = 0;                  // 申请总数
        int resultList[MAX_APPLY_REQUESTS];  // 用于存储每次申请结果的数组
    
        // 输入内存池信息和申请列表
        scanf("%s", memoryInfo);
        scanf("%s", applyList);
    
        // 处理内存池信息
        char *token = strtok(memoryInfo, ",");  // 使用strtok按逗号分割字符串
        while (token != NULL) {
            char *colon = strchr(token, ':');   // 找到冒号位置
            int size = atoi(token);             // 内存块大小
            int count = atoi(colon + 1);        // 内存块数量
    
            // 将每个内存块大小添加到内存列表中
            for (int i = 0; i < count; i++) {
                if (memoryCount < MAX_MEMORY_BLOCKS) {
                    memoryList[memoryCount++] = size;
                }
            }
    
            token = strtok(NULL, ",");  // 获取下一个逗号分割的部分
        }
    
        // 处理申请列表
        token = strtok(applyList, ",");  // 使用strtok按逗号分割字符串
        while (token != NULL) {
            if (applyCount < MAX_APPLY_REQUESTS) {
                applyMemoryList[applyCount++] = atoi(token);  // 将申请大小存入数组
            }
            token = strtok(NULL, ",");  // 获取下一个逗号分割的部分
        }
    
        // 处理每次申请
        for (int i = 0; i < applyCount; i++) {
            int applyMemory = applyMemoryList[i];
            int success = 0;  // 标记是否成功分配内存
    
            // 遍历内存池，找到第一个大于等于申请大小的内存块
            for (int j = 0; j < memoryCount; j++) {
                if (memoryList[j] >= applyMemory) {
                    success = 1;  // 找到合适的内存块
                    // 将该内存块从数组中移除，通过覆盖方式
                    for (int k = j; k < memoryCount - 1; k++) {
                        memoryList[k] = memoryList[k + 1];
                    }
                    memoryCount--;  // 更新内存块数量
                    break;
                }
            }
    
            resultList[i] = success;  // 记录申请结果
        }
    
        // 输出分配结果
        for (int i = 0; i < applyCount; i++) {
            if (resultList[i]) {
                printf("true");
            } else {
                printf("false");
            }
            if (i != applyCount - 1) {
                printf(",");
            }
        }
        printf("\n");
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

