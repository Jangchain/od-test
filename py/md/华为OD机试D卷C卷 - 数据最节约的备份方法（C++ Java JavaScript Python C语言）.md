## 题目描述：数据最节约的备份方法

有若干个文件，使用刻录光盘的方式进行备份，假设每张光盘的容量是500MB，求使用光盘最少的文件分布方式

所有文件的大小都是整数的MB，且不超过500MB；文件不能分割、分卷打包

## 输入描述：

一组文件大小的数据

## 输出描述：

使用光盘的数量

不用考虑输入数据不合法的情况；假设最多100个输入文件。

## 用例1

输入：

    
    
    100,500,300,200,400
    

输出：

    
    
    3
    

说明：

(100,400),(200,300),(500) 3张光盘即可。  
输入和输出内容都不含空格。

## 用例2

输入：

    
    
    1,100,200,300
    

输出：

    
    
    2
    

## 解题思路

  * `minDisks`：至少需要1个磁盘。
  * `maxDisks`：最多需要的磁盘数，等于文件的总数。

  4. **二分查找** ：使用二分查找算法找到最少需要的磁盘数量。在`minDisks`和`maxDisks`定义的范围内，不断尝试不同的磁盘数量（`mid`），使用`canFilesBeDistributed`方法检查这个数量的磁盘是否足以存储所有文件。

  5. **递归分配** ：`canFilesBeDistributed`方法通过递归检查给定数量的磁盘是否能够分配所有文件。对于每个文件，方法尝试将其放入每个磁盘，如果当前磁盘容量允许，就将文件"放入"磁盘（即增加磁盘上的已用容量），然后递归地尝试放入下一个文件。如果无法找到合适的分配方式，会进行回溯（减少磁盘上的已用容量），尝试其他分配方案。

  6. **回溯与剪枝** ：在尝试分配文件到磁盘时，如果一个磁盘在加入当前文件后容量达到或超过500，或者磁盘是空的，则不再尝试将当前文件放入其他磁盘。这一步骤是优化的关键，可以减少不必要的计算。

## python

    
    
    
    def can_files_be_distributed(disks, file_sizes, index):
        if index == len(file_sizes):
            return True  # 所有文件已成功分配
        for i in range(len(disks)):
            if disks[i] + file_sizes[index] <= 500:  # 尝试放入文件
                disks[i] += file_sizes[index]
                if can_files_be_distributed(disks, file_sizes, index + 1):
                    return True
                disks[i] -= file_sizes[index]  # 回溯
            if disks[i] == 0 or disks[i] + file_sizes[index] == 500:
                break  # 优化：避免不必要的尝试
        return False  # 无法分配当前文件
    
     
    file_sizes = list(map(int, input().split(',')))
    file_sizes.sort(reverse=True)  # 降序排序文件大小
    min_disks = 1
    max_disks = len(file_sizes)
    optimal_disk_count = max_disks
    
    while min_disks <= max_disks:
        mid = (min_disks + max_disks) // 2
        if can_files_be_distributed([0] * mid, file_sizes, 0):
            optimal_disk_count = mid
            max_disks = mid - 1
        else:
            min_disks = mid + 1
    
    print(optimal_disk_count)
    
     
    
    

## javascript

    
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 询问输入并处理
    readline.on('line', (input) => {
      const fileSizes = input.split(',').map(Number).sort((a, b) => b - a); // 将输入分割为文件大小数组并降序排序
      let minDisks = 1; // 至少需要一个磁盘
      let maxDisks = fileSizes.length; // 最多需要的磁盘数等于文件数量
      let optimalDiskCount = maxDisks; // 初始化最优磁盘数量
    
      // 使用二分查找寻找最少需要的磁盘数量
      while (minDisks <= maxDisks) {
        const mid = Math.floor((minDisks + maxDisks) / 2);
        if (canFilesBeDistributed(new Array(mid).fill(0), fileSizes, 0)) {
          optimalDiskCount = mid;
          maxDisks = mid - 1;
        } else {
          minDisks = mid + 1;
        }
      }
    
      console.log(optimalDiskCount);
      readline.close();
    });
    
    function canFilesBeDistributed(disks, fileSizes, index) {
      if (index === fileSizes.length) {
        return true; // 所有文件已成功分配
      }
      const fileSize = fileSizes[index];
      for (let i = 0; i < disks.length; i++) {
        if (disks[i] + fileSize <= 500) { // 尝试放入文件
          disks[i] += fileSize;
          if (canFilesBeDistributed(disks, fileSizes, index + 1)) {
            return true;
          }
          disks[i] -= fileSize; // 回溯
        }
        if (disks[i] === 0 || disks[i] + fileSize === 500) {
          break; // 优化：避免不必要的尝试
        }
      }
      return false; // 无法分配当前文件
    }
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <sstream>
    
    using namespace std;
    // 检查给定数量的磁盘是否足以分配所有文件
    bool canFilesBeDistributed(vector<int>& disks, const vector<int>& fileSizes, int currentIndex) {
       if (currentIndex == fileSizes.size()) {
           return true; // 所有文件都已尝试分配
       }
       int currentFileSize = fileSizes[currentIndex];
       for (int i = 0; i < disks.size(); i++) {
           if (disks[i] + currentFileSize <= 500) {
               disks[i] += currentFileSize; // 尝试放入当前文件
               if (canFilesBeDistributed(disks, fileSizes, currentIndex + 1)) {
                   return true;
               }
               disks[i] -= currentFileSize; // 回溯：移除当前文件，尝试其他分配方案
           }
           if (disks[i] == 0 || disks[i] + currentFileSize == 500) {
               break; // 如果磁盘是空的，或者加入当前文件后刚好满，就没有必要尝试其它磁盘了
           }
       }
       return false; // 当前文件无法分配到任何磁盘
    }
    
    int main() {
       string input;
       getline(cin, input);
       istringstream iss(input);
       vector<int> fileSizes;
       string fileSize;
       
       // 读取输入并将其转换为整数数组
       while (getline(iss, fileSize, ',')) {
           fileSizes.push_back(stoi(fileSize));
       }
       
       // 降序排序文件大小，以便优先分配大文件
       sort(fileSizes.begin(), fileSizes.end(), greater<int>());
       
       int minDisks = 1; // 至少需要1个磁盘
       int maxDisks = fileSizes.size(); // 最多的磁盘数等于文件数量
       int optimalDiskCount = maxDisks; // 初始化最优磁盘数量为最大可能值
       
       // 使用二分查找找到最少需要的磁盘数量
       while (minDisks <= maxDisks) {
           int mid = (minDisks + maxDisks) / 2;
           vector<int> disks(mid, 0); // 创建mid个磁盘，初始容量为0
           // 检查当前磁盘数量是否能满足存储所有文件
           if (canFilesBeDistributed(disks, fileSizes, 0)) {
               optimalDiskCount = mid; // 更新最优磁盘数量
               maxDisks = mid - 1;
           } else {
               minDisks = mid + 1;
           }
       }
       cout << optimalDiskCount << endl;
       return 0;
    }
    
    
    

## java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建扫描器读取输入
            Scanner scanner = new Scanner(System.in);
            // 读取一行输入，并将其分割为文件大小数组
            Integer[] fileSizes = Arrays.stream(scanner.nextLine().split(","))
                                        .map(Integer::parseInt)
                                        .toArray(Integer[]::new);
            // 将文件大小降序排序，以便优先分配大文件
            Arrays.sort(fileSizes, (a, b) -> b - a);
    
            int minDisks = 1; // 至少需要1个磁盘
            int maxDisks = fileSizes.length; // 最多的磁盘数等于文件数量
            int optimalDiskCount = maxDisks; // 初始化最优磁盘数量为最大可能值
    
            // 使用二分查找找到最少需要的磁盘数量
            while (minDisks <= maxDisks) {
                int mid = (minDisks + maxDisks) / 2;
                // 检查当前磁盘数量是否能满足存储所有文件
                if (canFilesBeDistributed(new int[mid], fileSizes, 0)) {
                    optimalDiskCount = mid; // 更新最优磁盘数量
                    maxDisks = mid - 1; // 在较小的范围内继续查找
                } else {
                    minDisks = mid + 1; // 需要更多的磁盘
                }
            }
            // 输出最少需要的磁盘数量
            System.out.println(optimalDiskCount);
        }
    
        // 方法：检查给定数量的磁盘是否足以分配所有文件
        public static boolean canFilesBeDistributed(int[] disks, Integer[] fileSizes, int currentIndex) {
            // 所有文件都已尝试分配
            if (currentIndex == fileSizes.length) {
                return true;
            }
            int currentFileSize = fileSizes[currentIndex];
            // 遍历每个磁盘尝试放入当前文件
            for (int i = 0; i < disks.length; i++) {
                // 检查当前磁盘是否有足够空间放入文件
                if (disks[i] + currentFileSize <= 500) {
                    disks[i] += currentFileSize;
                    // 递归尝试放入下一个文件
                    if (canFilesBeDistributed(disks, fileSizes, currentIndex + 1)) {
                        return true;
                    }
                    // 回溯：移除当前文件，尝试其他分配方案
                    disks[i] -= currentFileSize;
                }
                // 如果磁盘是空的，或者加入当前文件后刚好满，就没有必要尝试其它磁盘了
                if (disks[i] == 0 || disks[i] + currentFileSize == 500) {
                    break;
                }
            }
            // 当前文件无法分配到任何磁盘
            return false;
        }
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    int canFilesBeDistributed(int *disks, int diskCount, const int *fileSizes, int fileSizeCount, int currentIndex) {
        if (currentIndex == fileSizeCount) {
            return 1; // 所有文件都已尝试分配
        }
    
        int currentFileSize = fileSizes[currentIndex];
        for (int i = 0; i < diskCount; i++) {
            if (disks[i] + currentFileSize <= 500) {
                disks[i] += currentFileSize; // 尝试放入当前文件
                if (canFilesBeDistributed(disks, diskCount, fileSizes, fileSizeCount, currentIndex + 1)) {
                    return 1;
                }
                disks[i] -= currentFileSize; // 回溯：移除当前文件，尝试其他分配方案
            }
            if (disks[i] == 0 || disks[i] + currentFileSize == 500) {
                break; // 如果磁盘是空的，或者加入当前文件后刚好满，就没有必要尝试其它磁盘了
            }
        }
        return 0; // 当前文件无法分配到任何磁盘
    }
    int main() {
        char input[1024];
        int fileSizes[100], fileSizeCount = 0;
       
        fgets(input, sizeof(input), stdin);
    
        // 解析输入字符串，将文件大小存储在数组中
        char *token = strtok(input, ",");
        while (token != NULL && fileSizeCount < 100) {
            fileSizes[fileSizeCount++] = atoi(token);
            token = strtok(NULL, ",");
        }
    
        // 降序排序文件大小
        for (int i = 0; i < fileSizeCount - 1; i++) {
            for (int j = i + 1; j < fileSizeCount; j++) {
                if (fileSizes[i] < fileSizes[j]) {
                    int temp = fileSizes[i];
                    fileSizes[i] = fileSizes[j];
                    fileSizes[j] = temp;
                }
            }
        }
    
        int minDisks = 1, maxDisks = fileSizeCount, optimalDiskCount = maxDisks;
        while (minDisks <= maxDisks) {
            int mid = (minDisks + maxDisks) / 2;
            int *disks = calloc(mid, sizeof(int));
            if (canFilesBeDistributed(disks, mid, fileSizes, fileSizeCount, 0)) {
                optimalDiskCount = mid;
                maxDisks = mid - 1;
            } else {
                minDisks = mid + 1;
            }
            free(disks);
        }
    
        printf("%d\n", optimalDiskCount);
        return 0;
    }
    
    
    

## 完整用例

### 用例1

100,500,300,200,400

### 用例2

500,500,500,500

### 用例3

100,100,100,100,100,100

### 用例4

300,200,100

### 用例5

400,400,400,400,400

### 用例6

100,200,300,400,500,100,200,300,400,500

### 用例7

400,400,400,400,400,400,400,400,400,400

### 用例8

500,500,500,500,500,500,500,500,500,500

### 用例9

200,200,200,200,200,200,200,200,200,200

### 用例10

300,200,100,300,200,100,300,200,100  

#### 文章目录

  * 题目描述：数据最节约的备份方法
  * 输入描述：
  * 输出描述：
  * 用例1
  * 用例2
  * 解题思路
  * python
  * javascript
  * C++
  * java
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/56016a627b67ccf6f75aad3d5d469d83.png)

