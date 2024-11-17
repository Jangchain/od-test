#### 题目描述

向一个空栈中依次存入正整数，假设入栈元素 n(1<=n<=2^31-1)按顺序依次为 nx…n4、 n3、n2、 n1, 每当元素入栈时，如果
n1=n2+…+ny(y 的范围[2,x]， 1<=x<=1000)，则 n1~ny 全部元素出栈，重新入栈新元素 m(m=2*n1)。

如：依次向栈存入 6、 1、 2、 3, 当存入 6、 1、 2 时，栈底至栈顶依次为[6、 1、 2]；当存入 3时， 3=2+1， 3、 2、 1
全部出栈，重新入栈元素 6(6=2*3)，此时栈中有元素 6；

因为 6=6，所以两个 6 全部出栈，存入 12，最终栈中只剩一个元素 12。

#### 输入描述

使用单个空格隔开的正整数的字符串，如”5 6 7 8″， 左边的数字先入栈，输入的正整数个数为 x， 1<=x<=1000。

#### 输出描述

最终栈中存留的元素值，元素值使用空格隔开，如”8 7 6 5″， 栈顶数字在左边。 6 1 2 3

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 5 10 20 50 85 1  
---|---  
输出| 1 170  
说明| 5+10+20+50=85， 输入 85 时， 5、 10、 20、 50、 85 全部出栈，入栈 170，最终依次出栈的数字为 1 和 170。  
输入| 6 7 8 13 9  
---|---  
输出| 9 13 8 7 6  
说明| 无  
输入| 1 2 5 7 9 1 2 2  
---|---  
输出| 4 1 9 14 1  
说明| 无  
  
#### 解题思路：

  1. 首先，我们创建一个数字栈，用于存储入栈的元素。

  2. 接下来，我们遍历输入的数字序列，对于每个数字进行以下操作：

     * 将字符串转换为整数，得到当前数字`currentNumber`。
     * 初始化部分和`partialSum`为当前数字。
     * 从栈顶向栈底检查是否满足出栈条件： 
       * 从部分和中减去栈中的元素。
       * 如果满足出栈条件，清除子列表并更新当前数字： 
         * 清除子列表，即移除栈中从索引`index`到栈顶的元素。
         * 更新当前数字，即将`currentNumber`乘以2。
         * 更新部分和，将`partialSum`设置为当前数字。
       * 如果部分和小于0,说明累加的和已经小于当前数字，不满足条件，不需要往后循环了，跳出循环。
     * 将当前数字`currentNumber`入栈，即将`currentNumber`添加到`numberStack`的末尾。
  3. 最后，我们从栈顶到栈底依次移除栈中的元素，并将其连接为一个字符串输出。

#### 用例解释：

输入序列为`5 10 20 50 85 1`。

  * 当存入5时，栈中为[5]。
  * 当存入10时，栈中为[5, 10]。
  * 当存入20时，栈中为[5, 10, 20]。
  * 当存入50时，栈中为[5, 10, 20, 50]。
  * 当存入85时，栈中为[5, 10, 20, 50, 85]，满足出栈条件，将5、10、20、50、85全部出栈，重新入栈170，栈中为[170]。
  * 当存入1时，栈中为[170, 1]。

最终栈中存留的元素值为[170, 1]，栈顶数字在左边，因此输出为`170 1`。

#### C++

    
    
     #include <iostream>
    
    int main() {
        // 读取用户输入
        int input_sequence[1000];
        int input_size = 0;
        int temp;
        while (std::cin >> temp) {
            input_sequence[input_size++] = temp;
        }
    
        // 创建一个普通数组用作数字栈
        int number_stack[1000];
        int stack_size = 0;
    
        // 遍历输入的数字序列
        for (int i = 0; i < input_size; ++i) {
            int current_number = input_sequence[i];
            // 初始化部分和为当前数字
            int partial_sum = current_number;
    
            // 从栈顶向栈底检查是否满足出栈条件
            int index = stack_size - 1;
            while (index >= 0) {
                // 从部分和中减去栈中的元素
                partial_sum -= number_stack[index];
    
                // 如果满足出栈条件，清除子列表并更新当前数字
                if (partial_sum == 0) {
                    // 清除子列表
                    stack_size = index;
                    // 更新当前数字
                    current_number *= 2;
                    // 更新部分和
                    partial_sum = current_number;
                } else if (partial_sum < 0) {
                    // 如果部分和小于0，跳出循环
                    break;
                }
    
                index -= 1;
            }
    
            // 将当前数字入栈
            number_stack[stack_size++] = current_number;
        }
    
        // 输出栈中的元素，从栈顶到栈底
        for (int i = stack_size - 1; i >= 0; --i) {
            std::cout << number_stack[i];
            if (i > 0) {
                std::cout << " ";
            }
        }
        std::cout << std::endl;
    
        return 0;
    }
    
    

#### java

    
    
    import java.util.LinkedList;
    import java.util.Scanner;
    import java.util.StringJoiner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String[] inputSequence = scanner.nextLine().split(" ");
            // 创建一个 LinkedList 对象用作数字栈
            LinkedList<Integer> numberStack = new LinkedList<>();
    
            // 遍历输入的数字序列
            for (String numberString : inputSequence) {
                // 将字符串转换为整数
                int currentNumber = Integer.parseInt(numberString);
                // 初始化部分和为当前数字
                int partialSum = currentNumber;
    
                // 从栈顶向栈底检查是否满足出栈条件
                for (int index = numberStack.size() - 1; index >= 0; index--) {
                    // 从部分和中减去栈中的元素
                    partialSum -= numberStack.get(index);
    
                    // 如果满足出栈条件，清除子列表并更新当前数字
                    if (partialSum == 0) {
                        // 清除子列表
                        numberStack.subList(index, numberStack.size()).clear();
                        // 更新当前数字
                        currentNumber *= 2;
                        // 更新部分和
                        partialSum = currentNumber;
                    } else if (partialSum < 0) {
                        // 如果部分和小于0，跳出循环
                        break;
                    }
                }
    
                // 将当前数字入栈
                numberStack.add(currentNumber);
            }
    
            // 输出栈中的元素，从栈顶到栈底
            // 创建一个 StringJoiner 对象，用于连接栈中的元素
            StringJoiner outputJoiner = new StringJoiner(" ");
            // 当栈不为空时，依次移除栈顶元素并添加到 StringJoiner 中
            while (!numberStack.isEmpty()) {
                outputJoiner.add(numberStack.removeLast().toString());
            }
            // 输出最终结果
            System.out.println(outputJoiner.toString());
        }
    }
     
    

#### javascript

    
    
     
    const readline = require('readline');
    
    // 创建一个 readline.Interface 实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 读取用户输入
    rl.on('line', (input) => {
      const inputSequence = input.split(' ');
      // 创建一个数组用作数字栈
      const numberStack = [];
    
      // 遍历输入的数字序列
      for (const numberString of inputSequence) {
        // 将字符串转换为整数
        let currentNumber = parseInt(numberString, 10);
        // 初始化部分和为当前数字
        let partialSum = currentNumber;
    
        // 从栈顶向栈底检查是否满足出栈条件
        for (let index = numberStack.length - 1; index >= 0; index--) {
          // 从部分和中减去栈中的元素
          partialSum -= numberStack[index];
    
          // 如果满足出栈条件，清除子列表并更新当前数字
          if (partialSum === 0) {
            // 清除子列表
            numberStack.splice(index);
            // 更新当前数字
            currentNumber *= 2;
            // 更新部分和
            partialSum = currentNumber;
          } else if (partialSum < 0) {
            // 如果部分和小于0，跳出循环
            break;
          }
        }
    
        // 将当前数字入栈
        numberStack.push(currentNumber);
      }
    
      // 输出栈中的元素，从栈顶到栈底
      const output = numberStack.reverse().join(' ');
      console.log(output);
    
      // 关闭 readline.Interface 实例
      rl.close();
    });
    
    

#### python

    
    
    
    def main():
        # 读取用户输入并使用空格分隔
        input_sequence = input().split()
        # 创建一个列表用作数字栈
        number_stack = []
    
        # 遍历输入的数字序列
        for number_string in input_sequence:
            # 将字符串转换为整数
            current_number = int(number_string)
            # 初始化部分和为当前数字
            partial_sum = current_number
    
            # 从栈顶向栈底检查是否满足出栈条件
            index = len(number_stack) - 1
            while index >= 0:
                # 从部分和中减去栈中的元素
                partial_sum -= number_stack[index]
    
                # 如果满足出栈条件，清除子列表并更新当前数字
                if partial_sum == 0:
                    # 清除子列表
                    number_stack = number_stack[:index]
                    # 更新当前数字
                    current_number *= 2
                    # 更新部分和
                    partial_sum = current_number
                elif partial_sum < 0:
                    # 如果部分和小于0，跳出循环
                    break
    
                index -= 1
    
            # 将当前数字入栈
            number_stack.append(current_number)
    
        # 输出栈中的元素，从栈顶到栈底
        output = ' '.join(map(str, reversed(number_stack)))
        print(output)
    
    
    if __name__ == "__main__":
        main()
    
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 解题思路：
>       * 用例解释：
>       * C++
>       * java
>       * javascript
>       * python
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b9d4ccec6750ca2bb5aa2c845c25658b.png)

