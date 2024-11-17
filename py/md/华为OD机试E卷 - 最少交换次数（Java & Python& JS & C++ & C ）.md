## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给出数字K,请输出所有结果小于K的整数组合到一起的最少交换次数。  
组合一起是指满足条件的数字相邻，不要求相邻后在数组中的位置。

数据范围：

  * 100 <= K <= 100

  * 100 <= 数组中数值 <= 100

## 输入描述

第一行输入数组：1 3 1 4 0

第二行输入K数值：2

## 输出描述

第一行输出最少交换次数：1

## 示例1

输入

    
    
    1 3 1 4 0
    2
    

输出

    
    
    1
    

说明

> 小于2的表达式是1 1 0, 共三种可能将所有符合要求数字组合一起，最少交换1次。

## 解题思路

### 例子

    
    
    1 3 1 4 0
    2
    

  1. **找到小于 2 的元素** ：在给定数组 `[1, 3, 1, 4, 0]` 中，小于 2 的元素是 `1`, `1`, 和 `0`。所以我们需要将这三个元素组合在一起。
  2. **组合方式** ：要将这三个元素组合在一起，可以有多种方式。由于题目没有要求元素必须按照原来的顺序排列，所以我们只关心这些元素最终相邻排列的情况。
  3. **最少交换次数** ： 
     * 原数组是 `[1, 3, 1, 4, 0]`。
     * 将 `1, 1, 0` 组合在一起，最少的交换次数为 1： 
       * 例如，可以通过一次交换操作，将位置 4 的 `0` 与位置 2 的 `3` 交换，得到数组 `[1, 0, 1, 4, 3]`，使得 `1, 1, 0` 相邻。

所以，这句话的重点在于，通过最少的交换次数，将三个小于 2 的元素组合在一起（相邻），而这个最少次数在这个例子中是 1。

### **思路** ：

  1. **标记小于 ( K ) 的元素** ：首先遍历数组，找出所有小于 ( K ) 的元素，标记它们的位置。

  2. **计算最少交换次数** ：

     * 想象一个窗口，这个窗口长度等于标记元素的数量，窗口可以在数组中滑动。
     * 对于窗口中每个可能的位置，计算窗口内已经包含的目标元素数量（即窗口内小于 ( K ) 的元素数量）。
     * 窗口中包含最多目标元素的位置意味着需要的交换次数最少。交换次数等于窗口大小减去窗口内目标元素的数量。

给定数组为 `[1, 3, 1, 4, 0]`，( K ) 值为 2。小于 2 的元素是 `1`, `1`, `0`。

     * 这些元素的索引是 `[0, 2, 4]`。
     * 可以把这些元素想象为需要放在一个长度为 3 的窗口中。
     * 滑动这个窗口，尝试找到包含最多目标元素的窗口。例如，如果窗口覆盖 `1, 3, 1`，那么窗口已经包含两个目标元素，还需要一个交换将 `0` 换入窗口。
     * 找到一个位置，比如 `[1, 1, 0]`，只需要交换一次就可以将所有小于 2 的元素组合在一起。

所以，最少交换次数是 1。

## 写法1

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // 使用Scanner读取一行输入
            String numsStr = scanner.nextLine();
            // 按空格分割字符串并转换为整数数组
            String[] numParts = numsStr.split(" ");
            int[] nums = new int[numParts.length];
            for (int i = 0; i < numParts.length; i++) {
                nums[i] = Integer.parseInt(numParts[i]);
            }
            // 读取一个整数k
            int k = scanner.nextInt();
            // 计算数组中小于k的元素数量
            int count = 0;
            for (int num : nums) {
                if (num < k) {
                    count++;
                }
            }
            // 如果小于k的元素数量为1，直接输出0
            if (count == 1) {
                System.out.println(0);
                return;
            }
            // 计算最少交换次数
            int minSwapCount = 0;
            for (int i = 0; i < count; i++) {
                if (nums[i] >= k) {
                    minSwapCount++;
                }
            }
            int tmpSwapCount = minSwapCount;
            // 使用滑动窗口更新最小交换次数
            for (int j = count; j < nums.length; j++) {
                int preLeft = j - count;
                int curRight = j;
                if (nums[preLeft] >= k && nums[curRight] < k) {
                    tmpSwapCount--;
                } else if (nums[preLeft] < k && nums[curRight] >= k) {
                    tmpSwapCount++;
                }
                minSwapCount = Math.min(minSwapCount, tmpSwapCount);
            }
            // 输出最终的最小交换次数
            System.out.println(minSwapCount);
        }
    }
    

## Python

    
    
    nums = list(map(int, input().split()))
    k = int(input())
    
    count = sum(1 for num in nums if num < k)
    if count == 1:
        print(0)
        exit()
    
    min_swap_count = sum(1 for num in nums[:count] if num >= k)
    tmp_swap_count = min_swap_count
    
    for j in range(count, len(nums)):
        pre_left = j - count
        cur_right = j
        if nums[pre_left] >= k and nums[cur_right] < k:
            tmp_swap_count -= 1
        elif nums[pre_left] < k and nums[cur_right] >= k:
            tmp_swap_count += 1
        min_swap_count = min(min_swap_count, tmp_swap_count)
    
    print(min_swap_count)
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (numsStr) => {
        const nums = numsStr.split(' ').map(Number);
        rl.on('line', (k) => {
            k = parseInt(k);
            // 计算小于k的元素的数量
            let count = nums.filter(num => num < k).length;
            if (count === 1) {
                console.log(0);
                rl.close();
                return;
            }
            // 计算需要交换的初始数量
            let minSwapCount = nums.slice(0, count).filter(num => num >= k).length;
            let tmpSwapCount = minSwapCount;
            for (let j = count; j < nums.length; j++) {
                let preLeft = j - count;
                let curRight = j;
                if (nums[preLeft] >= k && nums[curRight] < k) {
                    tmpSwapCount--;
                } else if (nums[preLeft] < k && nums[curRight] >= k) {
                    tmpSwapCount++;
                }
                minSwapCount = Math.min(minSwapCount, tmpSwapCount);
            }
            console.log(minSwapCount);
            rl.close();
        });
    });
    

## C++

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    int main() {
        char line[1024];
        fgets(line, 1024, stdin);
        int nums[100];
        int length = 0;
        char *token = strtok(line, " ");
        while (token) {
            nums[length++] = atoi(token);
            token = strtok(NULL, " ");
        }
    
        int k;
        scanf("%d", &k);
    
        int count = 0;
        for (int i = 0; i < length; i++) {
            if (nums[i] < k) count++;
        }
    
        if (count == 1) {
            printf("0\n");
            return 0;
        }
    
        int minSwapCount = 0;
        for (int i = 0; i < count; i++) {
            if (nums[i] >= k) minSwapCount++;
        }
    
        int tmpSwapCount = minSwapCount;
        for (int j = count; j < length; j++) {
            int preLeft = j - count;
            int curRight = j;
            if (nums[preLeft] >= k && nums[curRight] < k) {
                tmpSwapCount--;
            } else if (nums[preLeft] < k && nums[curRight] >= k) {
                tmpSwapCount++;
            }
            if (tmpSwapCount < minSwapCount) {
                minSwapCount = tmpSwapCount;
            }
        }
    
        printf("%d\n", minSwapCount);
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    int main() {
        char line[1024];
        fgets(line, 1024, stdin);
        int nums[100];
        int length = 0;
        char *token = strtok(line, " ");
        while (token) {
            nums[length++] = atoi(token);
            token = strtok(NULL, " ");
        }
    
        int k;
        scanf("%d", &k);
    
        int count = 0;
        for (int i = 0; i < length; i++) {
            if (nums[i] < k) count++;
        }
    
        if (count == 1) {
            printf("0\n");
            return 0;
        }
    
        int minSwapCount = 0;
        for (int i = 0; i < count; i++) {
            if (nums[i] >= k) minSwapCount++;
        }
    
        int tmpSwapCount = minSwapCount;
        for (int j = count; j < length; j++) {
            int preLeft = j - count;
            int curRight = j;
            if (nums[preLeft] >= k && nums[curRight] < k) {
                tmpSwapCount--;
            } else if (nums[preLeft] < k && nums[curRight] >= k) {
                tmpSwapCount++;
            }
            if (tmpSwapCount < minSwapCount) {
                minSwapCount = tmpSwapCount;
            }
        }
    
        printf("%d\n", minSwapCount);
    
        return 0;
    }
    

## 写法2

  1. **二值化数组** ：遍历数组，将小于阈值的元素标记为 `1`，其余元素标记为 `0`，形成一个二元数组。

  2. **计算窗口大小** ：统计数组中 `1` 的总数 `count`，表示需要聚集的 `1` 的数量。

  3. **滑动窗口计算** ：使用一个大小为 `count` 的窗口，遍历整个数组，计算每个窗口内 `1` 的数量，并找出窗口内 `1` 的最大数量。

  4. **最少交换次数** ：最少的交换次数等于 `count` 减去窗口内最大 `1` 的数量，因为我们需要把 `1` 全部聚集在一起，而差值则是需要交换的位置。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    import java.util.stream.IntStream;
    
    public class Main {
        public static void main(String[] args) {
            // 使用Scanner读取输入
            Scanner scanner = new Scanner(System.in);
            // 读取一行输入并分割成字符串数组，然后转换为整数数组
            int[] numbers = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            // 读取阈值
            int threshold = Integer.parseInt(scanner.nextLine());
    
            // 遍历数组，将小于阈值的元素标记为1，大于等于阈值的标记为0
            for (int i = 0; i < numbers.length; i++) {
                if (numbers[i] < threshold) {
                    numbers[i] = 1;
                } else {
                    numbers[i] = 0;
                }
            }
    
            // 数组的长度
            int length = numbers.length;
            // 计算数组中1的总数
            int count = (int) IntStream.of(numbers).sum();
    
            // 处理边界情况，如果没有1或只有一个1，则不需要交换
            if (count == 0 || count == 1) {
                System.out.println(0);
                return;
            }
    
            // 计算初始窗口（大小为count）内1的数量
            int currentOnes = 0;
            for (int i = 0; i < count; i++) {
                currentOnes += numbers[i];
            }
    
            // 用于记录窗口中1的最大数量
            int maxOnesInWindow = currentOnes;
    
            // 滑动窗口法优化计算，遍历数组计算每个窗口的1的数量
            for (int i = 1; i <= length - count; i++) {
                // 滑动窗口，更新窗口中1的数量
                currentOnes = currentOnes - numbers[i - 1] + numbers[i + count - 1];
                // 更新记录的最大值
                maxOnesInWindow = Math.max(maxOnesInWindow, currentOnes);
            }
    
            // 计算并输出最少交换次数，即总数count减去窗口中最大1的数量
            System.out.println(count - maxOnesInWindow);
        }
    }
    

## Python

    
    
    numbers = list(map(int, input().split()))  # 从标准输入读取数字并转换为整数列表
    threshold = int(input())  # 读取阈值
    
    for i in range(len(numbers)):
        if numbers[i] < threshold:
            numbers[i] = 1
        else:
            numbers[i] = 0
    
    count = sum(numbers)  # 计算1的总数
    
    if count == 0 or count == 1:  # 处理边界情况
        print(0)
        exit()
    
    currentOnes = sum(numbers[:count])
    maxOnesInWindow = currentOnes
    for i in range(1, len(numbers) - count + 1):
        currentOnes = currentOnes - numbers[i - 1] + numbers[i + count - 1]
        maxOnesInWindow = max(maxOnesInWindow, currentOnes)
    
    print(count - maxOnesInWindow)
    

## JavaScript

    
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    readline.on('line', (input) => {
        const numbers = input.split(' ').map(Number);
        readline.on('line', (thresholdInput) => {
            const threshold = parseInt(thresholdInput);
            let count = 0;
    
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] < threshold) {
                    numbers[i] = 1;
                    count++;
                } else {
                    numbers[i] = 0;
                }
            }
    
            if (count === 0 || count === 1) {
                console.log(0);
                readline.close();
                return;
            }
    
            let currentOnes = 0;
            for (let i = 0; i < count; i++) {
                currentOnes += numbers[i];
            }
    
            let maxOnesInWindow = currentOnes;
            for (let i = 1; i <= numbers.length - count; i++) {
                currentOnes = currentOnes - numbers[i - 1] + numbers[i + count - 1];
                maxOnesInWindow = Math.max(maxOnesInWindow, currentOnes);
            }
    
            console.log(count - maxOnesInWindow);
            readline.close();
        });
    });
    

## C++

    
    
    #include <iostream>
    #include <string>
    using namespace std;
    
    int main() {
        // 创建Scanner对象
        string numsStr;
        getline(cin, numsStr);
        // 按空格分隔字符串
        int nums[100];
        int length = 0;
        int start = 0;
        for (int i = 0; i < numsStr.length(); i++) {
            if (numsStr[i] == ' ') {
                nums[length++] = stoi(numsStr.substr(start, i - start));
                start = i + 1;
            }
        }
        nums[length++] = stoi(numsStr.substr(start, numsStr.length() - start));
        // 读取一个整数
        int k;
        cin >> k;
        // 计算小于k的数的个数
        int count = 0;
        for (int i = 0; i < length; i++) {
            if (nums[i] < k) {
                count++;
            }
        }
    
        // 如果小于k的数的个数为1，则不需要交换，返回0
        if (count == 1) {
            cout << 0 << endl;
            return 0;
        }
    
        int minSwapCount = 0;
        for (int i = 0; i < count; i++) {
            if (nums[i] >= k) {
                minSwapCount++;
            }
        }
    
        int tmpSwapCount = minSwapCount;
        // 遍历后面的数，更新交换次数
        for (int j = count; j < length; j++) {
            int preLeft = j - count;
            int curRight = j;
            if (nums[preLeft] >= k && nums[curRight] < k) {
                tmpSwapCount--;
            } else if (nums[preLeft] < k && nums[curRight] >= k) {
                tmpSwapCount++;
            }
            minSwapCount = min(minSwapCount, tmpSwapCount);
        }
    
        // 输出最小交换次数
        cout << minSwapCount << endl;
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    int main() {
        char input[1024];
        fgets(input, sizeof(input), stdin); // 从标准输入读取一行
        int numbers[1024];
        int count = 0, index = 0;
        char *token = strtok(input, " ");
        while (token != NULL) {
            numbers[index++] = atoi(token); // 将字符串转换为整数
            token = strtok(NULL, " ");
        }
        int threshold;
        scanf("%d", &threshold); // 读取阈值
    
        int oneCount = 0;
        for (int i = 0; i < index; i++) {
            if (numbers[i] < threshold) {
                numbers[i] = 1;
                oneCount++;
            } else {
                numbers[i] = 0;
            }
        }
    
        if (oneCount == 0 || oneCount == 1) { // 处理边界情况
            printf("0\n");
            return 0;
        }
    
        int currentOnes = 0;
        for (int i = 0; i < oneCount; i++) {
            currentOnes += numbers[i];
        }
    
        int maxOnesInWindow = currentOnes;
        for (int i = 1; i <= index - oneCount; i++) {
            currentOnes = currentOnes - numbers[i - 1] + numbers[i + oneCount - 1];
            maxOnesInWindow = maxOnesInWindow > currentOnes ? maxOnesInWindow : currentOnes;
        }
    
        printf("%d\n", oneCount - maxOnesInWindow);
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/cbe87ef47c73efded41e150837706a78.png)

## 完整用例

### 1

    
    
    1 3 1 4 0
    2
    

### 2

    
    
    -3 -2 -1 0 1 2 3
    0
    

### 3

    
    
    1 5 3 4 2
    4
    

### 4

    
    
    100 100 100 100 100
    100
    

### 5

    
    
    1 3 1 4 0 1 2 1
    2
    

### 6

    
    
    1 3 1 4 0 1 2 1 0 -1
    2
    

### 7

    
    
    4 0 1 6 5 3 -1 1 3 1 4 0 1 2 1 0 -1
    2
    

### 8

    
    
    1 6 3 9 8 4 2 5 7
    6
    

### 9

    
    
    11 12 2 3 4 -10 -5 0 5 10 12 14 1 2
    10
    

### 10

    
    
    -10 10 -9 9 -8 8 -7 7 -6 6 -5 5 -4 4 -3 3 -2 2 -1 1 0
    4
    

