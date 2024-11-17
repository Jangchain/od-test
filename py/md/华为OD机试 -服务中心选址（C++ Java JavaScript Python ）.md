#### 题目描述

一个快递公司希望在一条街道建立新的服务中心。公司统计了该街道中所有区域在地图上的位置，并希望能够以此为依据为新的服务中心选址：使服务中心到所有区域的距离的总和最小。

给你一个数组positions，其中positions[i] = [left, right] 表示第 i
个区域在街道上的位置，其中left代表区域的左侧的起点，right代表区域的右侧终点，假设服务中心的位置为location：

  * 如果第 i 个区域的右侧终点right满足 right < location，则第 i 个区域到服务中心的距离为 location - right；
  * 如果第 i 个区域的左侧起点left 满足 left > location，则第 i 个区域到服务中心的距离为left - location；
  * 如果第 i 个区域的两侧left，right满足left <= location <= right，则第 i 个区域到服务中心的距离为0

选择最佳的服务中心位置为location，请返回最佳的服务中心位置到所有区域的距离总和的最小值。

#### 输入描述

第一行，一个整数N表示区域个数。

后面N行，每行两个整数，表示区域的左右起点终点。

#### 输出描述

运行结果输出一个整数，表示服务中心位置到所有区域的距离总和的最小值。

#### 用例

输入

    
    
    3
    1 2
    3 4
    10 20
    

输出

    
    
    8
    

#### 题目解析

#### C++

    
    
    #include<iostream>
    #include<vector>
    #include<cmath>
    #include<climits>
    #include<algorithm>
    using namespace std;
    
    // 计算当前位置到所有中心点的距离
    double calculateDistance(double pos, vector<vector<double>> centers) {
        double dis = 0;
        for (auto center : centers) {
            // 如果当前位置在中心点左侧，则加上中心点与当前位置的距离
            if (center[1] < pos) 
                dis += pos - center[1];
            // 如果当前位置在中心点右侧，则加上当前位置与中心点的距离
            else if (pos < center[0]) 
                dis += center[0] - pos;
        }
        return dis;
    }
    
    // 更新最小和最大位置
    void updateMinMaxPos(double& min_pos, double& max_pos, vector<vector<double>>& centers) {
        for(int i = 0;i<centers.size();i++){
            double left = centers[i][0];
            double right = centers[i][1];
            min_pos = min(min_pos, min(left, right));
            max_pos = max(max_pos, max(left, right));
        }
    }
    
    // 判断当前位置是否为最小距离的位置
    bool isMinDistance(double distance, double distance_left, double distance_right) {
        return distance <= distance_left && distance <= distance_right;
    }
    
    // 更新最小位置和最大位置
    void updateMinMaxPos(double& min_pos, double& max_pos, double mid_pos, double distance, double distance_left, double distance_right) {
        if (distance < distance_left) {
            min_pos = mid_pos + 0.5;
        }
        else if (distance < distance_right) {
            max_pos = mid_pos - 0.5;
        }
    }
    
    int main() {
        // 处理输入
        int n;
        cin >> n;
    
        double min_pos = 0;
        double max_pos = INT_MAX;
        vector<vector<double>> centers;
        for(int i = 0;i<n;i++){
            double left, right;
            cin >> left >> right;
            centers.push_back(vector<double>{left, right});
        }
        updateMinMaxPos(min_pos, max_pos, centers);
    
        // 二分查找最小距离
        while (min_pos < max_pos) {
            // 取中间位置
            double mid_pos = ceil((min_pos + max_pos) / 2);
    
            // 计算当前位置到所有中心点的距离，以及左右相邻位置到所有中心点的距离
            double distance = calculateDistance(mid_pos, centers);
            double distance_left = calculateDistance(mid_pos - 0.5, centers);
            double distance_right = calculateDistance(mid_pos + 0.5, centers);
    
            // 如果当前位置的距离最小，则输出距离并结束程序
            if (isMinDistance(distance, distance_left, distance_right)) {
                cout << int(distance);
                return 0;
            }
    
            // 如果左侧相邻位置的距离更小，则将最小位置更新为左侧相邻位置
            // 如果右侧相邻位置的距离更小，则将最大位置更新为右侧相邻位置
            updateMinMaxPos(min_pos, max_pos, mid_pos, distance, distance_left, distance_right);
        }
    
        cout << 0;
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    function calculateDistance(pos, centers) {
      let dis = 0;
      for (let center of centers) {
        if (center[1] < pos) {
          dis += pos - center[1];
        } else if (pos < center[0]) {
          dis += center[0] - pos;
        }
      }
      return dis;
    }
    
    function updateMinMaxPos(minMaxPos, centers) {
      let minPos = Number.MAX_VALUE;
      let maxPos = Number.MIN_VALUE;
      for (let center of centers) {
        let left = center[0];
        let right = center[1];
        minPos = Math.min(minPos, Math.min(left, right));
        maxPos = Math.max(maxPos, Math.max(left, right));
      }
      minMaxPos[0] = minPos;
      minMaxPos[1] = maxPos;
    }
    
    function isMinDistance(distance, distanceLeft, distanceRight) {
      return distance <= distanceLeft && distance <= distanceRight;
    }
    
    function updateMinMaxPos2(minMaxPos, midPos, distance, distanceLeft, distanceRight) {
      if (distance < distanceLeft) {
        minMaxPos[0] = midPos + 0.5;
      } else if (distance < distanceRight) {
        minMaxPos[1] = midPos - 0.5;
      }
    }
    
    
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    
      let n = 0;
      let centers = [];
      rl.on('line', (line) => {
        if (n === 0) {
          n = parseInt(line);
        } else {
          let [left, right] = line.split(' ').map(Number);
          centers.push([left, right]);
        }
      });
    
      rl.on('close', () => {
        let minMaxPos = [0, Number.MAX_VALUE];
        updateMinMaxPos(minMaxPos, centers);
    
        while (minMaxPos[0] < minMaxPos[1]) {
          let midPos = Math.ceil((minMaxPos[0] + minMaxPos[1]) / 2);
    
          let distance = calculateDistance(midPos, centers);
          let distanceLeft = calculateDistance(midPos - 0.5, centers);
          let distanceRight = calculateDistance(midPos + 0.5, centers);
    
          if (isMinDistance(distance, distanceLeft, distanceRight)) {
            console.log(Math.floor(distance));
            return;
          }
    
          updateMinMaxPos2(minMaxPos, midPos, distance, distanceLeft, distanceRight);
        }
    
        console.log(0);
      });
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        // 计算当前位置到所有中心点的距离
        public static double calculateDistance(double pos, List<List<Double>> centers) {
            double dis = 0;
            for (List<Double> center : centers) {
                // 如果当前位置在中心点左侧，则加上中心点与当前位置的距离
                if (center.get(1) < pos)
                    dis += pos - center.get(1);
                // 如果当前位置在中心点右侧，则加上当前位置与中心点的距离
                else if (pos < center.get(0))
                    dis += center.get(0) - pos;
            }
            return dis;
        }
    
        // 更新最小和最大位置
        public static void updateMinMaxPos(double[] min_max_pos, List<List<Double>> centers) {
            double min_pos = Double.MAX_VALUE;
            double max_pos = Double.MIN_VALUE;
            for (List<Double> center : centers) {
                double left = center.get(0);
                double right = center.get(1);
                min_pos = Math.min(min_pos, Math.min(left, right));
                max_pos = Math.max(max_pos, Math.max(left, right));
            }
            min_max_pos[0] = min_pos;
            min_max_pos[1] = max_pos;
        }
    
        // 判断当前位置是否为最小距离的位置
        public static boolean isMinDistance(double distance, double distance_left, double distance_right) {
            return distance <= distance_left && distance <= distance_right;
        }
    
        // 更新最小位置和最大位置
        public static void updateMinMaxPos(double[] min_max_pos, double mid_pos, double distance, double distance_left, double distance_right) {
            if (distance < distance_left) {
                min_max_pos[0] = mid_pos + 0.5;
            } else if (distance < distance_right) {
                min_max_pos[1] = mid_pos - 0.5;
            }
        }
    
        public static void main(String[] args) {
            // 处理输入
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();
    
            double[] min_max_pos = new double[2];
            min_max_pos[0] = 0;
            min_max_pos[1] = Double.MAX_VALUE;
            List<List<Double>> centers = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                double left = scanner.nextDouble();
                double right = scanner.nextDouble();
                centers.add(Arrays.asList(left, right));
            }
            updateMinMaxPos(min_max_pos, centers);
    
            // 二分查找最小距离
            while (min_max_pos[0] < min_max_pos[1]) {
                // 取中间位置
                double mid_pos = Math.ceil((min_max_pos[0] + min_max_pos[1]) / 2);
    
                // 计算当前位置到所有中心点的距离，以及左右相邻位置到所有中心点的距离
                double distance = calculateDistance(mid_pos, centers);
                double distance_left = calculateDistance(mid_pos - 0.5, centers);
                double distance_right = calculateDistance(mid_pos + 0.5, centers);
    
                // 如果当前位置的距离最小，则输出距离并结束程序
                if (isMinDistance(distance, distance_left, distance_right)) {
                    System.out.println((int) distance);
                    return;
                }
    
                // 如果左侧相邻位置的距离更小，则将最小位置更新为左侧相邻位置
                // 如果右侧相邻位置的距离更小，则将最大位置更新为右侧相邻位置
                updateMinMaxPos(min_max_pos, mid_pos, distance, distance_left, distance_right);
            }
    
            System.out.println(0);
        }
    }
    

#### Python

    
    
    import math
    
    # 计算当前位置到所有中心点的距离
    def calculateDistance(pos, centers):
        dis = 0
        for center in centers:
            # 如果当前位置在中心点左侧，则加上中心点与当前位置的距离
            if center[1] < pos:
                dis += pos - center[1]
            # 如果当前位置在中心点右侧，则加上当前位置与中心点的距离
            elif pos < center[0]:
                dis += center[0] - pos
        return dis
    
    # 更新最小和最大位置
    def updateMinMaxPos(min_max_pos, centers):
        min_pos = float('inf')
        max_pos = float('-inf')
        for center in centers:
            left = center[0]
            right = center[1]
            min_pos = min(min_pos, min(left, right))
            max_pos = max(max_pos, max(left, right))
        min_max_pos[0] = min_pos
        min_max_pos[1] = max_pos
    
    # 判断当前位置是否为最小距离的位置
    def isMinDistance(distance, distance_left, distance_right):
        return distance <= distance_left and distance <= distance_right
    
    # 更新最小位置和最大位置
    def updateMinMaxPos2(min_max_pos, mid_pos, distance, distance_left, distance_right):
        if distance < distance_left:
            min_max_pos[0] = mid_pos + 0.5
        elif distance < distance_right:
            min_max_pos[1] = mid_pos - 0.5
    
    # 处理输入
    n = int(input())
    min_max_pos = [0, float('inf')]
    centers = []
    for i in range(n):
        left, right = map(float, input().split())
        centers.append([left, right])
    updateMinMaxPos(min_max_pos, centers)
    
    # 二分查找最小距离
    while min_max_pos[0] < min_max_pos[1]:
        # 取中间位置
        mid_pos = math.ceil((min_max_pos[0] + min_max_pos[1]) / 2)
    
        # 计算当前位置到所有中心点的距离，以及左右相邻位置到所有中心点的距离
        distance = calculateDistance(mid_pos, centers)
        distance_left = calculateDistance(mid_pos - 0.5, centers)
        distance_right = calculateDistance(mid_pos + 0.5, centers)
    
        # 如果当前位置的距离最小，则输出距离并结束程序
        if isMinDistance(distance, distance_left, distance_right):
            print(int(distance))
            exit()
    
        # 如果左侧相邻位置的距离更小，则将最小位置更新为左侧相邻位置
        # 如果右侧相邻位置的距离更小，则将最大位置更新为右侧相邻位置
        updateMinMaxPos2(min_max_pos, mid_pos, distance, distance_left, distance_right)
    
    print(0)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

