#### 题目描述

有一堆长方体积木，它们的宽度和高度都相同，但长度不一。

小橙想把这堆积木叠成一面墙，墙的每层可以放一个积木，也可以将两个积木拼接起来，要求每层的长度相同。

若必须用完这些积木，叠成的墙最多为多少层？

![](https://i-blog.csdnimg.cn/blog_migrate/ae9f6a7a8f60a2cc25d19944bb57deb1.png)

#### 输入描述

输入为一行，为各个积木的长度，数字为正整数，并由空格分隔。积木的数量和长度都不超过5000。

#### 输出描述

输出一个数字，为墙的最大层数，如果无法按要求叠成每层长度一致的墙，则输出-1。

#### 用例

输入| 3 6 6 3  
---|---  
输出| 3  
说明|
可以每层都是长度3和6的积木拼接起来，这样每层的长度为9，层数为2；也可以其中两层直接用长度6的积木，两个长度3的积木拼接为一层，这样层数为3，故输出3。  
输入| 1 4 2 3 6  
---|---  
输出| -1  
说明| 无法用这些积木叠成每层长度一致的墙，故输出-1。  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        // 从输入中读取积木的长度
        vector<int> bricks;
        int brick;
        while (cin >> brick) {
            bricks.push_back(brick);
        }
    
        int brick_count = bricks.size();
        int max_layers = -1;
    
        // 如果只有一个积木，最大层数为1
        if (brick_count == 1) {
            max_layers = 1;
        }
        // 如果有两个积木，最大层数为2（如果它们的长度相等）或1（如果它们的长度不等）
        else if (brick_count == 2) {
            max_layers = bricks[0] == bricks[1] ? 2 : 1;
        }
        // 如果有多个积木，尝试找到最大层数
        else {
            // 按长度降序排序积木
            sort(bricks.rbegin(), bricks.rend());
            int min_layer_length = bricks[0];
            int max_layer_length = bricks[0] + bricks[1];
    
            // 遍历可能的层长度
            for (int layer_length = min_layer_length; layer_length <= max_layer_length; layer_length++) {
                int layers = 0;
                int left = 0;
                int right = brick_count - 1;
    
                // 使用双指针方法检查是否可以构建具有相同长度的层
                while (left < right) {
                    // 如果左指针指向的积木长度等于当前层长度，将其作为一层，左指针右移
                    if (bricks[left] == layer_length) {
                        left++;
                        layers++;
                    }
                    // 如果左指针指向的积木长度等于当前层长度，将其作为一层，左指针右移
                    else if (bricks[left] + bricks[right] == layer_length) {
                        left++;
                        right--;
                        layers++;
                    }
                    // 如果无法构建相同长度的层，跳出循环
                    else {
                        break;
                    }
                }
    
                // 如果找到了一个有效的墙层组合，更新最大层数并结束循环
                if (left >= right) {
                    max_layers = layers;
                    break;
                }
            }
        }
    
        // 输出最大层数
        cout << max_layers << endl;
    
        return 0;
    }
    

#### java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 从输入中读取积木的长度
            Scanner sc = new Scanner(System.in);
            Integer[] bricks = Arrays.stream(sc.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new);
    
            int brickCount = bricks.length;
            int maxLayers = -1;
    
            // 如果只有一个积木，最大层数为1
            if (brickCount == 1) {
                maxLayers = 1;
            } 
            // 如果有两个积木，最大层数为2（如果它们的长度相等）或1（如果它们的长度不等）
            else if (brickCount == 2) {
                maxLayers = bricks[0].equals(bricks[1]) ? 2 : 1;
            } 
            // 如果有多个积木，尝试找到最大层数
            else {
                // 按长度降序排序积木
                Arrays.sort(bricks, (a, b) -> b - a);
                int minLayerLength = bricks[0];
                int maxLayerLength = bricks[0] + bricks[1];
    
                // 遍历可能的层长度
                for (int layerLength = minLayerLength; layerLength <= maxLayerLength; layerLength++) {
                    int layers = 0;
                    int left = 0;
                    int right = brickCount - 1;
    
                   // 使用双指针方法检查是否可以构建具有相同长度的层
                    while (left < right) {
                        // 如果左指针指向的积木长度等于当前层长度，将其作为一层，左指针右移
                        if (bricks[left] == layerLength) {
                            left++;
                            layers++;
                        } 
                        // 如果左指针和右指针指向的积木长度之和等于当前层长度，将它们拼接作为一层，左指针右移，右指针左移
                        else if (bricks[left] + bricks[right] == layerLength) {
                            left++;
                            right--;
                            layers++;
                        } 
                        // 如果无法构建相同长度的层，跳出循环
                        else {
                            break;
                        }
                    }
                    // 如果找到了一个有效的墙层组合，更新最大层数并结束循环
                    if (left >= right) {
                        maxLayers = layers;
                        break;
                    }
                }
            }
    
            // 输出最大层数
            System.out.println(maxLayers);
        }
    }
    
    

#### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      // 从输入中读取积木的长度
      const bricks = input.split(' ').map(Number);
    
      const brickCount = bricks.length;
      let maxLayers = -1;
    
      // 如果只有一个积木，最大层数为1
      if (brickCount === 1) {
        maxLayers = 1;
      }
      // 如果有两个积木，最大层数为2（如果它们的长度相等）或1（如果它们的长度不等）
      else if (brickCount === 2) {
        maxLayers = bricks[0] === bricks[1] ? 2 : 1;
      }
      // 如果有多个积木，尝试找到最大层数
      else {
        // 按长度降序排序积木
        bricks.sort((a, b) => b - a);
        const minLayerLength = bricks[0];
        const maxLayerLength = bricks[0] + bricks[1];
    
        // 遍历可能的层长度
        for (let layerLength = minLayerLength; layerLength <= maxLayerLength; layerLength++) {
          let layers = 0;
          let left = 0;
          let right = brickCount - 1;
    
          // 使用双指针方法检查是否可以构建具有相同长度的层
          while (left < right) {
              // 如果左指针指向的积木长度等于当前层长度，将其作为一层，左指针右移
            if (bricks[left] === layerLength) {
              left++;
              layers++;
                
            } else if (bricks[left] + bricks[right] === layerLength) {
                // 如果左指针和右指针指向的积木长度之和等于当前层长度，将它们拼接作为一层，左指针右移，右指针左移
              left++;
              right--;
              layers++;
            } else {
                 // 如果无法构建相同长度的层，跳出循环
              break;
            }
          }
    
          // 如果找到了一个有效的墙层组合，更新最大层数并结束循环
          if (left >= right) {
            maxLayers = layers;
            break;
          }
        }
      }
    
      // 输出最大层数
      console.log(maxLayers);
    });
    
    

#### python

    
    
    # 从输入中读取积木的长度
    bricks = list(map(int, input().split()))
    
    brick_count = len(bricks)
    max_layers = -1
    
    # 如果只有一个积木，最大层数为1
    if brick_count == 1:
        max_layers = 1
    # 如果有两个积木，最大层数为2（如果它们的长度相等）或1（如果它们的长度不等）
    elif brick_count == 2:
        max_layers = 2 if bricks[0] == bricks[1] else 1
    # 如果有多个积木，尝试找到最大层数
    else:
        # 按长度降序排序积木
        bricks.sort(reverse=True)
        min_layer_length = bricks[0]
        max_layer_length = bricks[0] + bricks[1]
    
        # 遍历可能的层长度
        for layer_length in range(min_layer_length, max_layer_length + 1):
            layers = 0
            left = 0
            right = brick_count - 1
    
            # 使用双指针方法检查是否可以构建具有相同长度的层
            while left < right:
                # 如果左指针指向的积木长度等于当前层长度，将其作为一层，左指针右移
                if bricks[left] == layer_length:
                    left += 1
                    layers += 1
                # 如果左指针和右指针指向的积木长度之和等于当前层长度，将它们拼接作为一层，左指针右移，右指针左移
                elif bricks[left] + bricks[right] == layer_length:
                    left += 1
                    right -= 1
                    layers += 1
                # 如果无法构建相同长度的层，跳出循环
                else:
                    break
    
            # 如果找到了一个有效的墙层组合，更新最大层数并结束循环
            if left >= right:
                max_layers = layers
                break
    
    # 输出最大层数
    print(max_layers)
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++
      * java
      * javaScript
      * python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

