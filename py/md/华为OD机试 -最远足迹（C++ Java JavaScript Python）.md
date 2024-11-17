## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

某探险队负责对地下洞穴进行探险。探险队成员在进行探险任务时，随身携带的记录器会不定期地记录自身的坐标，但在记录的间隙中也会记录其他数据。探索工作结束后，探险队需要获取到某成员在探险过程中相对于探险队总部的最远的足迹位置。

  1. 仪器记录坐标时，坐标的数据格式为(x,y)，如(1,2)、(100,200)，其中0<x<1000，0<y<1000。同时存在非法坐标，如(01,1)、(1,01)，(0,100)属于非法坐标。
  2. 设定探险队总部的坐标为(0,0)，某位置相对总部的距离为：x*x+y*y。
  3. 若两个座标的相对总部的距离相同，则第一次到达的坐标为最远的足迹。
  4. 若记录仪中的坐标都不合法，输出总部坐标（0,0）。

**备注：**

不需要考虑双层括号嵌套的情况，比如sfsdfsd((1,2))。

#### 输入描述

字符串，表示记录仪中的数据。

如：ferga13fdsf3(100,200)f2r3rfasf(300,400)

#### 输出描述

字符串，表示最远足迹到达的坐标。

如： (300,400)

#### 用例

输入| ferg(3,10)a13fdsf3(3,4)f2r3rfasf(5,10)  
---|---  
输出| (5,10)  
说明| 记录仪中的合法坐标有3个： (3,10)， (3,4)， (5,10)，其中(5,10)是相距总部最远的坐标， 输出(5,10)。  
输入| asfefaweawfaw(0,1)fe  
---|---  
输出| (0,0)  
说明| 记录仪中的坐标都不合法，输出总部坐标（0,0）。  
  
#### C++

    
    
    #include <iostream>
    #include <regex>
    #include <cmath>
    using namespace std;
    int main() {
        string input;
        getline(cin, input);
    
        int maxDistance = 0;
        string farthestFootprint = "(0,0)";
    
        regex pattern("\\((0|[1-9]\\d{0,2}),(0|[1-9]\\d{0,2})\\)");
        sregex_iterator matcher(input.begin(), input.end(), pattern);
        sregex_iterator end;
    
        for (sregex_iterator i = matcher; i != end; ++i) {
            int x = stoi((*i)[1].str());
            int y = stoi((*i)[2].str());
    
            if (x <= 0 || x >= 1000 || y <= 0 || y >= 1000) {
                continue;
            }
    
            int distance = x * x + y * y;
            if (distance > maxDistance) {
                maxDistance = distance;
                farthestFootprint = "(" + to_string(x) + "," + to_string(y) + ")";
            }
        }
    
        cout << farthestFootprint << endl;
    
        return 0;
    }
    

#### java

    
    
    import java.util.Scanner;
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
    
        int maxDistance = 0;
        String farthestFootprint = "(0,0)";
    
        // 使用正则表达式匹配合法坐标
        Pattern pattern = Pattern.compile("\\((0|[1-9]\\d{0,2}),(0|[1-9]\\d{0,2})\\)");
        Matcher matcher = pattern.matcher(input);
    
        while (matcher.find()) {
          int x = Integer.parseInt(matcher.group(1));
          int y = Integer.parseInt(matcher.group(2));
    
          // 检查坐标是否超出范围
          if (x <= 0 || x >= 1000 || y <= 0 || y >= 1000) continue;
    
          // 计算距离
          int distance = x * x + y * y;
          if (distance > maxDistance) {
            maxDistance = distance;
            farthestFootprint = "(" + x + "," + y + ")";
          }
        }
    
        System.out.println(farthestFootprint);
      }
    }
    
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let input = '';
    
    rl.on('line', (line) => {
      input = line.trim();
      rl.close();
    });
    
    rl.on('close', () => {
      let maxDistance = 0;
      let farthestFootprint = "(0,0)";
    
      // 使用正则表达式匹配合法坐标
      const pattern = /\((0|[1-9]\d{0,2}),(0|[1-9]\d{0,2})\)/g;
    
      let matcher;
    
      while ((matcher = pattern.exec(input)) !== null) {
        const x = parseInt(matcher[1]);
        const y = parseInt(matcher[2]);
    
        // 检查坐标是否超出范围
        if (x <= 0 || x >= 1000 || y <= 0 || y >= 1000) continue;
    
        // 计算距离
        const distance = x * x + y * y;
        if (distance > maxDistance) {
          maxDistance = distance;
          farthestFootprint = `(${x},${y})`;
        }
      }
    
      console.log(farthestFootprint);
    });
    

#### python

    
    
    import re
    
    input = input()
    
    maxDistance = 0
    farthestFootprint = "(0,0)"
    
    pattern = re.compile(r'\\((0|[1-9]\\d{0,2}),(0|[1-9]\\d{0,2})\\)')
    matcher = pattern.finditer(input)
    
    for match in matcher:
        x = int(match.group(1))
        y = int(match.group(2))
    
        if x <= 0 or x >= 1000 or y <= 0 or y >= 1000:
            continue
    
        distance = x * x + y * y
        if distance > maxDistance:
            maxDistance = distance
            farthestFootprint = f"({x},{y})"
    
    print(farthestFootprint)
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    ferg(3,10)a13fdsf3(3,4)f2r3rfasf(5,10)
    

##### 用例2

    
    
    asfefaweawfaw(0,1)fe
    

##### 用例3

    
    
    abcdefg
    

##### 用例4

    
    
    hijklmnop(1,2)qrs(3,4)tuv(5,6)
    

##### 用例5

    
    
    xyz(100,200)abc(300,400)def(500,600)
    

##### 用例6

    
    
    ferg(3,10)a13fdsf3(3,4)f2r3rfasf(5,10)(0,0)
    

##### 用例7

    
    
    asfefaweawfaw(0,1)fe(1,0)
    

##### 用例8

    
    
    abcdefg(1000,1000)hijklmnop(1,2)qrs(3,4)tuv(5,6)
    

##### 用例9

    
    
    hijklmnop(1,2)qrs(3,4)tuv(5,6)(7,8)xyz
    

##### 用例10

    
    
    xyz(100,200)abc(300,400)def(500,600)(700,800)
    

