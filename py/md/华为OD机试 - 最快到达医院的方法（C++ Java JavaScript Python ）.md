#### 题目描述

新型冠状病毒疫情的肆虐，使得家在武汉的大壮不得不思考自己家和附近定点医院的具体情况。

经过一番调查，大壮明白了距离自己家最近的定点医院有两家。其中：

  * 医院A和自己的距离是X公里
  * 医院B和自己的距离是Y公里

由于武汉封城，公交停运，私家车不能上路，交通十分不便。现在：

  * 到达医院A只能搭乘志愿者计程车，已知计程车的平均速度是M米/分钟，上车平均等待时间为L分钟。
  * 到达医院B只能步行，平均速度是N米/分钟；

给出X，Y，M，L，N的数据，请问大壮到达哪家医院最快？

#### 输入描述

一行，5个数。

分别是到达A医院的距离，到达B医院的距离，计程车平均速度，上车等待时间，步行速度。

#### 输出描述

一行，计程车（Taxi）、步行（Walk）、相等（Same）

#### 用例

输入| 50 5 500 30 90  
---|---  
输出| Walk  
说明| 无  
  
#### 题目解析

送分题！！！

#### C++

    
    
    #include <iostream>
    #include <sstream>
    using namespace std;
    
    double getTime(int distance, int speed) {
        return (distance * 1000.0) / speed;
    }
    
    double getTime(int distance, int speed, int waitingTime) {
        return getTime(distance, speed) + waitingTime;
    }
    
    int main() {
        string line;
        getline(cin, line);
        stringstream ss(line);
        string temp;
        int inputs[5];
        int i = 0;
        while (getline(ss, temp, ' ')) {
            inputs[i] = stoi(temp);
            i++;
        }
        int distanceToA = inputs[0];
        int distanceToB = inputs[1];
        int taxiSpeed = inputs[2];
        int waitingTime = inputs[3];
        int walkingSpeed = inputs[4];
    
        double timeToA = getTime(distanceToA, taxiSpeed, waitingTime);
        double timeToB = getTime(distanceToB, walkingSpeed);
    
        if (abs(timeToA - timeToB) < 1e-6) {
            cout << "Same" << endl;
        } else if (timeToA > timeToB) {
            cout << "Walk" << endl;
        } else {
            cout << "Taxi" << endl;
        }
    
        return 0;
    }
    
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    function calculateTime(distance, speed) {
      return (distance * 1000.0) / speed;
    }
    
    rl.on('line', (line) => {
      const inputs = line.split(' ');
      const distanceToHospitalA = parseInt(inputs[0]);
      const distanceToHospitalB = parseInt(inputs[1]);
      const taxiSpeed = parseInt(inputs[2]);
      const waitingTime = parseInt(inputs[3]);
      const walkingSpeed = parseInt(inputs[4]);
    
      const timeToHospitalA = calculateTime(distanceToHospitalA, taxiSpeed) + waitingTime;
      const timeToHospitalB = calculateTime(distanceToHospitalB, walkingSpeed);
    
      if (Math.abs(timeToHospitalA - timeToHospitalB) < 1e-6) {
        console.log('Same');
      } else if (timeToHospitalA > timeToHospitalB) {
        console.log('Walk');
      } else {
        console.log('Taxi');
      }
    
      rl.close();
    });
    
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            String line = scanner.nextLine();
            String[] inputs = line.split(" ");
            int distanceToA = Integer.parseInt(inputs[0]);
            int distanceToB = Integer.parseInt(inputs[1]);
            int taxiSpeed = Integer.parseInt(inputs[2]);
            int waitingTime = Integer.parseInt(inputs[3]);
            int walkingSpeed = Integer.parseInt(inputs[4]);
    
            double timeToA = getTime(distanceToA, taxiSpeed, waitingTime);
            double timeToB = getTime(distanceToB, walkingSpeed);
    
            if (Math.abs(timeToA - timeToB) < 1e-6) {
                System.out.println("Same");
            } else if (timeToA > timeToB) {
                System.out.println("Walk");
            } else {
                System.out.println("Taxi");
            }
    
            scanner.close();
        }
    
        private static double getTime(int distance, int speed) {
            return (distance * 1000.0) / speed;
        }
    
        private static double getTime(int distance, int speed, int waitingTime) {
            return getTime(distance, speed) + waitingTime;
        }
    }
    
    

#### Python

    
    
    import math
    
    def main():
        line = input()
        inputs = line.split(" ")
        distance_to_A = int(inputs[0])
        distance_to_B = int(inputs[1])
        taxi_speed = int(inputs[2])
        waiting_time = int(inputs[3])
        walking_speed = int(inputs[4])
    
        time_to_A = get_time_to_A(distance_to_A, taxi_speed, waiting_time)
        time_to_B = get_time_to_B(distance_to_B, walking_speed)
    
        if math.isclose(time_to_A, time_to_B, rel_tol=1e-6):
            print("Same")
        elif time_to_A > time_to_B:
            print("Walk")
        else:
            print("Taxi")
    
    def get_time_to_B(distance, speed):
        return (distance * 1000.0) / speed
    
    def get_time_to_A(distance, speed, waiting_time):
        return get_time_to_B(distance, speed) + waiting_time
    
    if __name__ == "__main__":
        main()
    

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

