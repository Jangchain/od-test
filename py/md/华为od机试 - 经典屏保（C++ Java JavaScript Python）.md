#### 题目描述

DVD机在视频输出时，为了保护电视显像管，在待机状态会显示“屏保动画”，如下图所示，DVD Logo在屏幕内来回运动，碰到边缘会反弹。

请根据如下要求，实现屏保Logo坐标的计算算法。

  1. 屏幕是一个800*600像素的矩形，规定屏幕的左上角点坐标原点，沿横边向右方向为X轴，沿竖边向下方向为Y轴
  2. Logo是一个50*25像素的矩形，初始状态下，左上角点坐标记做(x，y)，它在X和Y方向上均以1像素/秒的速度开始运动
  3. 遇到屏幕四个边缘后，会发生镜面反弹，即以45°碰撞边缘，再改变方向以45°弹出
  4. 当Logo和四个角碰撞时，两个边缘同时反弹的效果是Logo会原路返回

![](https://i-blog.csdnimg.cn/blog_migrate/aeef373eace1896b42da4647f21ee45c.png)

请编码实现，t秒后Logo左上角点的坐标。

#### 输入描述

输入3个数字，以空格分隔：

> x y t

第一个数字表示Logo左上角点的初始X坐标；  
第二个数字表示Logo左上角点的初始Y坐标；  
第三个数字表示时间 t，题目要求即求 t 秒后Logo左上角点的位置。

#### 输出描述

输出2个数字，以空格分隔:

> x y

第一个数字表示 t 秒后，Logo左上角点的X坐标  
第二个数字表示 t 秒后，Logo左上角点的Y坐标

#### 备注

所有用例均保证:

  * 输入的x和y坐标会保证整个Logo都在屏幕范围内，Logo不会出画；
  * 所有输入数据都是合法的数值，且不会出现负数；
  * t 的最大值为100000。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例1

输入

    
    
    0 0 10
    

输出

    
    
    10 10
    

> 输入样例表示Logo初始位置在屏幕的左上角点，10s后，Logo在X和Y方向都移动了10像素，因此输出10 10。

#### 用例2

输入

    
    
    500 570 10
    

输出

    
    
    510 570
    

>
> 输入样例表示初始状态下，Logo的下边缘再有5像素就碰到屏幕下边缘了，5s后，会与屏幕碰撞，碰撞后，斜向45弹出，又经过5s后，Logo与起始位置相比，水平移动了10像素，垂直方向回到了原来的高度。

#### 解题思路

题目要求根据输入的初始坐标和时间，计算出 t 秒后 Logo 左上角的坐标。根据题目描述，Logo 在 X 和 Y 方向上均以 1 像素/秒
的速度开始运动，因此 t 秒后 Logo 在 X 方向上的位移为 t 像素，在 Y 方向上的位移也为 t 像素。因此，我们可以先将输入的 x 和 y
分别加上 t，得到 Logo 在 t 秒后的初始坐标。

接下来，需要考虑 Logo 是否会碰到屏幕边缘。如果碰到了，需要进行反弹。根据题目描述，碰到边缘时 Logo 会以 45°
的角度反弹，并改变运动方向。因此，我们可以使用一个 while 循环，不断判断 Logo
是否碰到了边缘。如果碰到了，就根据碰撞的边缘进行反弹，并改变运动方向。

具体实现时，可以根据以下几个条件来判断 Logo 是否碰到了边缘：

  * Logo 的左上角坐标 x 小于 0，说明碰到了屏幕左侧边缘；
  * Logo 的左上角坐标 y 小于 0，说明碰到了屏幕上侧边缘；
  * Logo 的左上角坐标 x 加上 Logo 的宽度 50 大于 800，说明碰到了屏幕右侧边缘；
  * Logo 的左上角坐标 y 加上 Logo 的高度 25 大于 600，说明碰到了屏幕下侧边缘。

如果 Logo 碰到了边缘，就根据碰撞的边缘进行反弹。具体实现时，可以使用以下公式：

  * 如果碰到了屏幕左侧边缘，将 x 的值赋为 -x；
  * 如果碰到了屏幕上侧边缘，将 y 的值赋为 -y；
  * 如果碰到了屏幕右侧边缘，将 x 的值赋为 1500 - x；
  * 如果碰到了屏幕下侧边缘，将 y 的值赋为 1150 - y。

注意，在碰到屏幕角落时，需要同时进行两个方向的反弹，即 Logo 会原路返回。因此，需要将两个方向的反弹都考虑到。

最后，输出 t 秒后 Logo 左上角的坐标即可。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 输入Logo左上角点的初始X坐标
            int x = scanner.nextInt();
            
            // 输入Logo左上角点的初始Y坐标
            int y = scanner.nextInt();
            
            // 输入时间t，题目要求即求t秒后Logo左上角点的位置
            int t = scanner.nextInt();
     
            // 定义屏幕的宽度和高度
            int screenWidth = 800;
            int screenHeight = 600;
            
            // 定义Logo的宽度和高度
            int logoWidth = 50;
            int logoHeight = 25;
    
            // 计算Logo在X轴上的最大移动范围
            int maxX = screenWidth - logoWidth;
            
            // 计算Logo在Y轴上的最大移动范围
            int maxY = screenHeight - logoHeight;
    
            // 计算t秒后Logo左上角点的X坐标
            int finalX = (x + t) % (2 * maxX);
            
            // 计算t秒后Logo左上角点的Y坐标
            int finalY = (y + t) % (2 * maxY);
    
            // 当Logo超出屏幕范围时，进行镜面反弹
            if (finalX > maxX) {
                finalX = 2 * maxX - finalX;
            }
    
            if (finalY > maxY) {
                finalY = 2 * maxY - finalY;
            }
    
            // 输出t秒后Logo左上角点的坐标
            System.out.println(finalX + " " + finalY);
        }
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (line) => {
        const [x, y, t] = line.split(' ').map(Number);
        const screenWidth = 800;
        const screenHeight = 600;
        const logoWidth = 50;
        const logoHeight = 25;
        const maxX = screenWidth - logoWidth;
        const maxY = screenHeight - logoHeight;
        const finalX = (parseInt(x) + parseInt(t)) % (2 * maxX);
        const finalY = (parseInt(y) + parseInt(t)) % (2 * maxY);
        let outputX = finalX;
        let outputY = finalY;
    
        if (finalX > maxX) {
            outputX = 2 * maxX - finalX;
        }
    
        if (finalY > maxY) {
            outputY = 2 * maxY - finalY;
        }
    
        console.log(outputX + " " + outputY);
    
    
    });
    

#### Python

    
    
    x, y, t = map(int, input().split())    
    screenWidth = 800
    screenHeight = 600
    logoWidth = 50
    logoHeight = 25
    maxX = screenWidth - logoWidth
    maxY = screenHeight - logoHeight
    finalX = (x + t) % (2 * maxX)
    finalY = (y + t) % (2 * maxY)
    outputX = finalX
    outputY = finalY
    
    if finalX > maxX:
        outputX = 2 * maxX - finalX
    
    if finalY > maxY:
        outputY = 2 * maxY - finalY
    
    print(outputX, outputY)
    

#### C++

    
    
    #include <iostream>
    using namespace std;
    
    int main() {
        int x, y, t;
        cin >> x >> y >> t;
        
        int screenWidth = 800;
        int screenHeight = 600;
        int logoWidth = 50;
        int logoHeight = 25;
        
        int maxX = screenWidth - logoWidth;
        int maxY = screenHeight - logoHeight;
        
        int finalX = (x + t) % (2 * maxX);
        int finalY = (y + t) % (2 * maxY);
        
        if (finalX > maxX) {
            finalX = 2 * maxX - finalX;
        }
        
        if (finalY > maxY) {
            finalY = 2 * maxY - finalY;
        }
        
        cout << finalX << " " << finalY << endl;
        
        return 0;
    }
    
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 备注
>       *         * ACM输入输出模式
>       * 用例1
>       * 用例2
>       * 解题思路
>       * 机考代码查重
>       * Java
>       * JavaScript
>       * Python
>       * C++
>       * 完整用例
>       *         * 用例1
>         * 用例2
>         * 用例3
>         * 用例4
>         * 用例5
>         * 用例6
>         * 用例7 极端用例可忽略
>         * 用例8
>         * 用例9 极端用例可忽略
>         * 用例10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

0 0 10

##### 用例2

500 570 10

##### 用例3

750 300 20

##### 用例4

0 0 100000

##### 用例5

400 300 50000

##### 用例6

750 570 10000

##### 用例7 极端用例可忽略

800 600 100000

##### 用例8

400 300 100000

##### 用例9 极端用例可忽略

800 600 5

##### 用例10

400 300 100

