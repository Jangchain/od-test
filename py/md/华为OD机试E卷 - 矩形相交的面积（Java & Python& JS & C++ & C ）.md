## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给出3组点坐标(x, y, w, h)，-1000<x,y<1000，w,h为正整数。

(x, y, w, h)表示平面直角坐标系中的一个矩形：

x, y为矩形左上角坐标点，w, h**向右w** ，**向下h** 。

(x, y, w, h)表示x轴(x, x+w)和y轴(y, y-h)围成的矩形区域；

(0, 0, 2, 2)表示 x轴(0, 2)和y 轴(0, -2)围成的矩形区域；

(3, 5, 4, 6)表示x轴(3, 7)和y轴(5, -1)围成的矩形区域；

求3组坐标构成的矩形区域重合部分的面积。

## 输入描述

3行输入分别为3个矩形的位置，分别代表“左上角x坐标”，“左上角y坐标”，“矩形宽”，“矩形高” -1000 <= x,y < 1000

## 输出描述

输出3个矩形相交的面积，不相交的输出0。

## 示例1

输入

    
    
    1 6 4 4
    3 5 3 4
    0 3 7 3
    

输出

    
    
    2
    

说明

>
> ![](https://i-blog.csdnimg.cn/blog_migrate/c037b901d4a12b4155647b69cd635d5f.png)

## 解题思路

  1. 三个矩形的左上角坐标 `(x1, y1)` 以及宽度 `w` 和高度 `h`。利用这些输入，计算出每个矩形的右下角坐标 `(x2, y2)`：

     * `x2 = x1 + w`：右下角的 x 坐标是左上角 x 加上矩形的宽度。
     * `y2 = y1 - h`：右下角的 y 坐标是左上角 y 减去矩形的高度（因为高度是向下的，所以用减法）。

这些计算结果存储在 `x_coords` 和 `y_coords` 两个列表中，分别保存所有的 x 和 y 坐标信息。

  2. **确定最小和最大坐标** ：  
代码通过遍历 `x_coords` 和 `y_coords`
来确定x、y坐标的最小值和最大值。这些值用于构建包含所有矩形的二维数组，这样可以将坐标转换为一个可索引的数组形式，方便后续的重叠检测。

  3. **偏移量的计算** ：  
为了确保坐标系可以从数组的索引 0 开始，代码计算了 `x_offset` 和 `y_offset`，这些偏移量用于将负数坐标平移到数组的有效范围内。

  4. **构建二维数组表示区域并进行重叠检测** ：  
使用二维数组 `intersection_area` 来表示整个坐标系的矩形区域，每个位置（数组的元素）表示该位置被多少个矩形覆盖：

     * 遍历每个矩形的左上角到右下角的范围，将这些区域的值在二维数组中加1，表示这些区域已被覆盖。
     * 如果某个二维数组的值是3，说明该位置被三个矩形同时覆盖。
  5. **计算重叠区域** ：  
最后，遍历二维数组，统计值为3的区域数量，即为三个矩形重叠部分的面积。

## Java

    
    
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            List<Integer> x_coords = new ArrayList<>();  // 存储所有矩形的x坐标
            List<Integer> y_coords = new ArrayList<>();  // 存储所有矩形的y坐标
            List<int[]> rectangles = new ArrayList<>();  // 存储所有矩形的左上角和右下角坐标
            Scanner scanner = new Scanner(System.in);
            for (int i = 0; i < 3; i++) {
                int x1 = scanner.nextInt();
                int y1 = scanner.nextInt();
                int w = scanner.nextInt();
                int h = scanner.nextInt();
    
                int x2 = x1 + w;  // 计算矩形的右上角x坐标
                int y2 = y1 - h;  // 计算矩形的右上角y坐标
                x_coords.add(x1);
                x_coords.add(x2);
                y_coords.add(y1);
                y_coords.add(y2);
                rectangles.add(new int[]{x1, y1, x2, y2});
            }
    
            int min_x_coord = Integer.MAX_VALUE;
            int max_x_coord = Integer.MIN_VALUE;
            int min_y_coord = Integer.MAX_VALUE;
            int max_y_coord = Integer.MIN_VALUE;
            for (int x : x_coords) {
                min_x_coord = Math.min(min_x_coord, x);
                max_x_coord = Math.max(max_x_coord, x);
            }
            for (int y : y_coords) {
                min_y_coord = Math.min(min_y_coord, y);
                max_y_coord = Math.max(max_y_coord, y);
            }
    
            int x_offset = 0 - min_x_coord;  // 计算x坐标的偏移量
            int y_offset = 0 - min_y_coord;  // 计算y坐标的偏移量
    
            int[][] intersection_area = new int[Math.abs(max_x_coord - min_x_coord)][Math.abs(max_y_coord - min_y_coord)];  // 创建表示矩形区域的二维数组
    
            for (int[] rectangle : rectangles) {
                int x1 = rectangle[0];
                int y1 = rectangle[1];
                int x2 = rectangle[2];
                int y2 = rectangle[3];
                for (int i = Math.min(x2, x1) + x_offset; i < Math.max(x2, x1) + x_offset; i++) {
                    for (int j = Math.min(y2, y1) + y_offset; j < Math.max(y2, y1) + y_offset; j++) {
                        intersection_area[i][j] += 1;  // 在相应的区域加1
                    }
                }
            }
    
            int ret = 0;
            for (int i = 0; i < intersection_area.length; i++) {
                for (int j = 0; j < intersection_area[0].length; j++) {
                    if (intersection_area[i][j] == 3) {  // 统计值为3的区域的个数
                        ret += 1;
                    }
                }
            }
    
            System.out.println(ret);  // 输出相交的面积
        }
    }
    
    

## Python

    
    
    x_coords = []  # 存储所有矩形的x坐标
    y_coords = []  # 存储所有矩形的y坐标
    rectangles = []  # 存储所有矩形的左上角和右下角坐标
    for _ in range(3):
        x1, y1, w, h = list(map(int, input().split()))
     
        x2 = x1 + w  # 计算矩形的右上角x坐标
        y2 = y1 - h  # 计算矩形的右上角y坐标
        x_coords += [x1, x2]
        y_coords += [y1, y2]
        rectangles.append((x1, y1, x2, y2))
    
    min_x_coord, max_x_coord = min(x_coords), max(x_coords)  # 计算矩形区域的最小和最大x坐标
    min_y_coord, max_y_coord = min(y_coords), max(y_coords)  # 计算矩形区域的最小和最大y坐标
    x_offset = 0 - min_x_coord  # 计算x坐标的偏移量
    y_offset = 0 - min_y_coord  # 计算y坐标的偏移量
    
    intersection_area = [[0] * abs(max_y_coord - min_y_coord) for _ in range(abs(max_x_coord - min_x_coord))]  # 创建表示矩形区域的二维数组
    
    for x1, y1, x2, y2 in rectangles:
        for i in range(min((x2, x1)) + x_offset, max((x2, x1)) + x_offset):
            for j in range(min((y2, y1)) + y_offset, max((y2, y1)) + y_offset):
                intersection_area[i][j] += 1  # 在相应的区域加1
    
    ret = 0
    for i in range(len(intersection_area)):
        for j in range(len(intersection_area[0])):
            if intersection_area[i][j] == 3:  #  区域值为3时表示3个矩形重合
                ret += 1
    
    print(ret)  # 输出相交的面积
    
    

## JavaScript

    
    
    var readline = require('readline');
    
    // 创建接口用于读取标准输入
    var rl = readline.createInterface({
      input: process.stdin, // 输入来自标准输入（键盘输入）
      output: process.stdout // 输出到标准输出（控制台）
    });
    
    var x_coords = []; // 用于存储所有矩形的x坐标
    var y_coords = []; // 用于存储所有矩形的y坐标
    var rectangles = []; // 用于存储每个矩形的左上角和右下角坐标
    
    // 监听每行输入的事件
    rl.on('line', function(line){
      // 将输入的每一行按空格分割，并将其转换为数字数组
      var inputs = line.split(' ').map(Number);
      var x1 = inputs[0]; // 矩形左上角的x坐标
      var y1 = inputs[1]; // 矩形左上角的y坐标
      var w = inputs[2];  // 矩形的宽度
      var h = inputs[3];  // 矩形的高度
    
      var x2 = x1 + w;  // 计算矩形右下角的x坐标
      var y2 = y1 - h;  // 计算矩形右下角的y坐标
    
      // 将矩形的x坐标加入x_coords数组
      x_coords.push(x1, x2);
      // 将矩形的y坐标加入y_coords数组
      y_coords.push(y1, y2);
      // 将矩形的完整坐标（左上角和右下角）存入rectangles数组
      rectangles.push([x1, y1, x2, y2]);
    
      // 当已经读取到三个矩形时，结束输入
      if(rectangles.length === 3){
        rl.close(); // 关闭输入流
      }
    });
    
    // 当输入结束时触发此事件
    rl.on('close', function(){
      // 计算所有矩形的x坐标中的最小值和最大值
      var min_x_coord = Math.min(...x_coords);
      var max_x_coord = Math.max(...x_coords);
      // 计算所有矩形的y坐标中的最小值和最大值
      var min_y_coord = Math.min(...y_coords);
      var max_y_coord = Math.max(...y_coords);
    
      // 计算x坐标和y坐标的偏移量，将所有坐标平移到非负范围
      var x_offset = 0 - min_x_coord;
      var y_offset = 0 - min_y_coord;
    
      // 创建一个二维数组 intersection_area，表示整个区域
      // 数组的大小为矩形的最大x和最小x之间的差值，以及最大y和最小y之间的差值
      var intersection_area = new Array(Math.abs(max_x_coord - min_x_coord))
        .fill(0)
        .map(() => new Array(Math.abs(max_y_coord - min_y_coord)).fill(0));
    
      // 遍历每个矩形
      for(var i = 0; i < rectangles.length; i++){
        var x1 = rectangles[i][0]; // 矩形左上角的x坐标
        var y1 = rectangles[i][1]; // 矩形左上角的y坐标
        var x2 = rectangles[i][2]; // 矩形右下角的x坐标
        var y2 = rectangles[i][3]; // 矩形右下角的y坐标
    
        // 遍历矩形的x坐标范围，填充到二维数组中
        for(var j = Math.min(x2, x1) + x_offset; j < Math.max(x2, x1) + x_offset; j++){
          // 遍历矩形的y坐标范围，填充到二维数组中
          for(var k = Math.min(y2, y1) + y_offset; k < Math.max(y2, y1) + y_offset; k++){
            intersection_area[j][k]++; // 对应的二维数组位置计数加1，表示该区域被覆盖
          }
        }
      }
    
      var ret = 0; // 用于存储同时被三个矩形覆盖的区域的数量
    
      // 遍历整个二维数组，统计被三个矩形同时覆盖的区域
      for(var i = 0; i < intersection_area.length; i++){
        for(var j = 0; j < intersection_area[0].length; j++){
          if(intersection_area[i][j] === 3){ // 如果该区域被三个矩形覆盖
            ret++; // 计数增加
          }
        }
      }
    
      // 输出最终结果，即重叠的面积
      console.log(ret);
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        vector<int> x_coords;  // 存储所有矩形的x坐标
        vector<int> y_coords;  // 存储所有矩形的y坐标
        vector<vector<int>> rectangles;  // 存储所有矩形的左上角和右下角坐标
        for (int i = 0; i < 3; i++) {
            int x1, y1, w, h;
            cin >> x1 >> y1 >> w >> h;
    
            int x2 = x1 + w;  // 计算矩形的右上角x坐标
            int y2 = y1 - h;  // 计算矩形的右上角y坐标
            x_coords.push_back(x1);
            x_coords.push_back(x2);
            y_coords.push_back(y1);
            y_coords.push_back(y2);
            rectangles.push_back({x1, y1, x2, y2});
        }
    
        int min_x_coord = *min_element(x_coords.begin(), x_coords.end());  // 计算矩形区域的最小x坐标
        int max_x_coord = *max_element(x_coords.begin(), x_coords.end());  // 计算矩形区域的最大x坐标
        int min_y_coord = *min_element(y_coords.begin(), y_coords.end());  // 计算矩形区域的最小y坐标
        int max_y_coord = *max_element(y_coords.begin(), y_coords.end());  // 计算矩形区域的最大y坐标
        int x_offset = 0 - min_x_coord;  // 计算x坐标的偏移量
        int y_offset = 0 - min_y_coord;  // 计算y坐标的偏移量
    
        vector<vector<int>> intersection_area(abs(max_x_coord - min_x_coord), vector<int>(abs(max_y_coord - min_y_coord), 0));  // 创建表示矩形区域的二维数组
    
        for (vector<int>& rectangle : rectangles) {
            int x1 = rectangle[0];
            int y1 = rectangle[1];
            int x2 = rectangle[2];
            int y2 = rectangle[3];
            for (int i = min(x2, x1) + x_offset; i < max(x2, x1) + x_offset; i++) {
                for (int j = min(y2, y1) + y_offset; j < max(y2, y1) + y_offset; j++) {
                    intersection_area[i][j] += 1;  // 在相应的区域加1
                }
            }
        }
    
        int ret = 0;
        for (int i = 0; i < intersection_area.size(); i++) {
            for (int j = 0; j < intersection_area[0].size(); j++) {
                if (intersection_area[i][j] == 3) {  // 域值为3时表示3个矩形重合
                    ret += 1;
                }
            }
        }
    
        cout << ret << endl;  // 输出相交的面积
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <limits.h>  // 用于定义最大和最小整数值
    
    #define MAX_RECTANGLES 3  // 矩形数量
    
    int main() {
        int x_coords[MAX_RECTANGLES * 2];  // 存储所有矩形的x坐标（每个矩形有2个x坐标）
        int y_coords[MAX_RECTANGLES * 2];  // 存储所有矩形的y坐标（每个矩形有2个y坐标）
        int rectangles[MAX_RECTANGLES][4];  // 存储所有矩形的左上角和右下角坐标 (x1, y1, x2, y2)
        int x1, y1, w, h;
        int x2, y2;
    
        // 输入三个矩形的信息
        for (int i = 0; i < MAX_RECTANGLES; i++) {
            scanf("%d %d %d %d", &x1, &y1, &w, &h);  // 读取每个矩形的左上角坐标和宽高
            x2 = x1 + w;  // 计算矩形的右下角x坐标
            y2 = y1 - h;  // 计算矩形的右下角y坐标
    
            // 存储矩形的x坐标
            x_coords[i * 2] = x1;
            x_coords[i * 2 + 1] = x2;
    
            // 存储矩形的y坐标
            y_coords[i * 2] = y1;
            y_coords[i * 2 + 1] = y2;
    
            // 存储矩形的坐标 (x1, y1, x2, y2)
            rectangles[i][0] = x1;
            rectangles[i][1] = y1;
            rectangles[i][2] = x2;
            rectangles[i][3] = y2;
        }
    
        // 初始化最小和最大坐标值
        int min_x_coord = INT_MAX;
        int max_x_coord = INT_MIN;
        int min_y_coord = INT_MAX;
        int max_y_coord = INT_MIN;
    
        // 寻找x轴的最小值和最大值
        for (int i = 0; i < MAX_RECTANGLES * 2; i++) {
            if (x_coords[i] < min_x_coord) {
                min_x_coord = x_coords[i];
            }
            if (x_coords[i] > max_x_coord) {
                max_x_coord = x_coords[i];
            }
        }
    
        // 寻找y轴的最小值和最大值
        for (int i = 0; i < MAX_RECTANGLES * 2; i++) {
            if (y_coords[i] < min_y_coord) {
                min_y_coord = y_coords[i];
            }
            if (y_coords[i] > max_y_coord) {
                max_y_coord = y_coords[i];
            }
        }
    
        // 计算x和y的偏移量，将坐标平移至非负范围
        int x_offset = 0 - min_x_coord;
        int y_offset = 0 - min_y_coord;
    
        // 计算二维数组的大小
        int width = abs(max_x_coord - min_x_coord);
        int height = abs(max_y_coord - min_y_coord);
    
        // 动态分配用于表示矩形区域的二维数组
        int** intersection_area = (int**)malloc(width * sizeof(int*));
        for (int i = 0; i < width; i++) {
            intersection_area[i] = (int*)calloc(height, sizeof(int));  // 初始化数组元素为0
        }
    
        // 遍历每个矩形，填充二维数组区域
        for (int i = 0; i < MAX_RECTANGLES; i++) {
            int rect_x1 = rectangles[i][0];
            int rect_y1 = rectangles[i][1];
            int rect_x2 = rectangles[i][2];
            int rect_y2 = rectangles[i][3];
    
            // 遍历每个矩形的区域，并在二维数组中标记被覆盖的区域
            for (int x = (rect_x1 + x_offset); x < (rect_x2 + x_offset); x++) {
                for (int y = (rect_y2 + y_offset); y < (rect_y1 + y_offset); y++) {
                    intersection_area[x][y] += 1;  // 增加覆盖计数
                }
            }
        }
    
        int ret = 0;  // 用于存储重叠的区域面积
    
        // 遍历二维数组，统计同时被三个矩形覆盖的区域数
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (intersection_area[i][j] == 3) {  // 如果区域被三个矩形覆盖
                    ret += 1;  // 增加计数
                }
            }
        }
    
        // 输出结果
        printf("%d\n", ret);
    
        // 释放二维数组的内存
        for (int i = 0; i < width; i++) {
            free(intersection_area[i]);
        }
        free(intersection_area);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

#### 完整用例

##### 用例1

    
    
    1 6 4 4
    3 5 3 4
    0 3 7 3
    

##### 用例2

    
    
    0 0 3 3
    1 1 2 2
    2 2 3 3
    

##### 用例3

    
    
    -1 -1 3 3
    1 1 2 2
    -2 -2 4 4
    

##### 用例4

    
    
    -1 -1 3 3
    -2 -2 2 2
    -3 -3 1 1
    

##### 用例5

    
    
    -1 -1 3 3
    -2 -2 2 2
    -3 -3 3 3
    

##### 用例6

    
    
    -1000 -1000 2000 2000
    -1000 -1000 2000 2000
    -1000 -1000 2000 2000
    

##### 用例7

    
    
    -1000 -1000 2000 2000
    -1000 -1000 2000 2000
    0 0 2000 2000
    

##### 用例8

    
    
    -1000 -1000 2000 2000
    0 0 2000 2000
    1000 1000 2000 2000
    

##### 用例9

    
    
    0 0 1 1
    0 0 1 1
    0 0 1 1
    

##### 用例10

    
    
    0 0 1 1
    0 0 1 1
    0 0 2 2
    

