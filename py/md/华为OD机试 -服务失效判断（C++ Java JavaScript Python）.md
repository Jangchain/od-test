#### 题目描述

> 某系统中有众多服务，每个服务用字符串（只包含字母和数字，长度<=10）唯一标识，服务间可能有依赖关系，如A依赖B，则当B故障时导致A也故障。
>
> 依赖具有传递性，如A依赖B，B依赖C，当C故障时导致B故障，也导致A故障。
>
> 给出所有依赖关系，以及当前已知故障服务，要求输出所有正常服务。
>
> 依赖关系：服务1-服务2 表示“服务1”依赖“服务2”
>
> 不必考虑输入异常，用例保证：依赖关系列表、故障列表非空，且依赖关系数，故障服务数都不会超过3000，服务标识格式正常。

#### 输入描述

> 半角逗号分隔的依赖关系列表**（换行）**
>
> 半角逗号分隔的故障服务列表

#### 输出描述

依赖关系列表中提及的所有服务中可以正常工作的服务列表，用半角逗号分隔，按依赖关系列表中出现的次序排序。

特别的，没有正常节点输出单独一个**半角逗号** 。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| `a1-a2,a5-a6,a2-a3`  
`a5,a2`  
---|---  
输出| a6,a3  
说明|
a1依赖a2，a2依赖a3，所以a2故障，导致a1不可用，但不影响a3；a5故障不影响a6。所以可用的是a3、a6，在依赖关系列表中a6先出现，所以输出:a6,a3。  
输入| `a1-a2`  
`a2`  
---|---  
输出| ,  
说明| a1依赖a2，a2故障导致a1也故障，没有正常节点，输出一个逗号。  
  
#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <unordered_map>
    #include <unordered_set>
    #include <algorithm>
    
    using namespace std;
    
    // 递归移除故障服务及其所有子孙服务
    void remove(unordered_map<string, unordered_set<string>>& serviceDependencies, const string& service) {
        auto it = serviceDependencies.find(service);
        if (it != serviceDependencies.end()) {
            unordered_set<string> servicesToRemove = it->second;
            serviceDependencies.erase(it);
    
            for (const string& childService : servicesToRemove) {
                remove(serviceDependencies, childService);
            }
        }
    }
    
    int main() {
        // 读取依赖关系列表
        string input;
        getline(cin, input);
        stringstream ss(input);
        string token;
    
        vector<pair<string, string>> dependencyRelations;
        while (getline(ss, token, ',')) {
            size_t pos = token.find('-');
            dependencyRelations.push_back({token.substr(0, pos), token.substr(pos + 1)});
        }
    
        // 读取故障服务列表
        getline(cin, input);
        stringstream ss2(input);
        unordered_set<string> failedServices;
        while (getline(ss2, token, ',')) {
            failedServices.insert(token);
        }
    
        // 创建一个unordered_map，键是父服务，值是子服务集合
        unordered_map<string, unordered_set<string>> serviceDependencies;
    
        // 创建一个unordered_map，用于记录服务第一次出现的位置
        unordered_map<string, int> firstAppearance;
    
        int index = 0;
        // 遍历依赖关系列表
        for (const auto& relation : dependencyRelations) {
            const string& childService = relation.first;
            const string& parentService = relation.second;
    
            // 如果服务不存在于unordered_map中，则添加一个新的unordered_set作为其值
            serviceDependencies.emplace(childService, unordered_set<string>());
            serviceDependencies.emplace(parentService, unordered_set<string>());
    
            // 将子服务添加到父服务的unordered_set中
            serviceDependencies[parentService].insert(childService);
    
            // 记录服务第一次出现的位置
            firstAppearance.emplace(childService, index++);
            firstAppearance.emplace(parentService, index++);
        }
    
        // 遍历故障服务列表，移除故障服务及其所有子孙服务
        for (const string& service : failedServices) {
            remove(serviceDependencies, service);
        }
    
        // 将剩余的正常服务转换为vector
        vector<string> remainingServices;
        for (const auto& entry : serviceDependencies) {
            remainingServices.push_back(entry.first);
        }
    
        // 按照服务在依赖关系列表中出现的顺序对正常服务进行排序
        sort(remainingServices.begin(), remainingServices.end(), [&](const string& a, const string& b) {
            return firstAppearance[a] < firstAppearance[b];
        });
    
        if(remainingServices.size() < 1){
            cout << ",";
         }else{
            // 输出剩余的正常服务，用逗号分隔
            for (size_t i = 0; i < remainingServices.size(); ++i) {
                cout << remainingServices[i];
                if (i < remainingServices.size() - 1) {
                    cout << ",";
                }
            }
    
         }
     
        return 0;
    }
    
    

#### java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象，用于读取输入
            Scanner scanner = new Scanner(System.in);
    
            // 读取依赖关系列表，并将其转换为二维字符串数组
            String[][] dependencyRelations = Arrays.stream(scanner.nextLine().split(",")).map(s -> s.split("-")).toArray(String[][]::new);
    
            // 读取故障服务列表，并将其转换为HashSet
            Set<String> failedServices = new HashSet<>(Arrays.asList(scanner.nextLine().split(",")));
    
            // 创建一个HashMap，键是父服务，值是子服务集合
            HashMap<String, HashSet<String>> serviceDependencies = new HashMap<>();
    
            // 创建一个LinkedHashMap，用于记录服务第一次出现的位置
            LinkedHashMap<String, Integer> firstAppearance = new LinkedHashMap<>();
    
            int index = 0;
            // 遍历依赖关系列表
            for (String[] relation : dependencyRelations) {
                String childService = relation[0];
                String parentService = relation[1];
    
                // 如果服务不存在于HashMap中，则添加一个新的HashSet作为其值
                serviceDependencies.putIfAbsent(childService, new HashSet<>());
                serviceDependencies.putIfAbsent(parentService, new HashSet<>());
    
                // 将子服务添加到父服务的HashSet中
                serviceDependencies.get(parentService).add(childService);
    
                // 记录服务第一次出现的位置
                firstAppearance.putIfAbsent(childService, index++);
                firstAppearance.putIfAbsent(parentService, index++);
            }
    
            // 遍历故障服务列表，移除故障服务及其所有子孙服务
            for (String service : failedServices) {
                remove(serviceDependencies, service);
            }
    
            // 将剩余的正常服务转换为字符串数组
            String[] remainingServices = serviceDependencies.keySet().toArray(new String[0]);
    
            // 如果没有正常服务，则输出一个逗号
            if (remainingServices.length == 0) {
                System.out.println(",");
            } else {
                // 按照服务在依赖关系列表中出现的顺序对正常服务进行排序
                Arrays.sort(remainingServices, (a, b) -> firstAppearance.get(a) - firstAppearance.get(b));
    
                // 使用StringJoiner将正常服务连接成一个逗号分隔的字符串
                StringJoiner servicesJoiner = new StringJoiner(",");
                for (String service : remainingServices) servicesJoiner.add(service);
                System.out.println(servicesJoiner.toString());
            }
        }
    
        // 由于服务s是故障服务，因此s服务本身，和其所有子孙服务都无法运行
        public static void remove(HashMap<String, HashSet<String>> serviceDependencies, String service) {
            if (serviceDependencies.containsKey(service)) {
                HashSet<String> servicesToRemove = serviceDependencies.get(service);
                serviceDependencies.remove(service);
    
                // 递归移除子服务及其子孙服务
                for (String childService : servicesToRemove) {
                    remove(serviceDependencies, childService);
                }
            }
        }
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    // 递归移除故障服务及其所有子孙服务
    function remove(serviceDependencies, service) {
        if (serviceDependencies.has(service)) {
            const servicesToRemove = serviceDependencies.get(service);
            serviceDependencies.delete(service);
    
            for (const childService of servicesToRemove) {
                remove(serviceDependencies, childService);
            }
        }
    }
    
    rl.on('line', (dependencyRelationsInput) => {
        rl.on('line', (failedServicesInput) => {
            // 读取依赖关系列表，并将其转换为二维字符串数组
            const dependencyRelations = dependencyRelationsInput.split(',').map((s) => s.split('-'));
    
            // 读取故障服务列表，并将其转换为Set
            const failedServices = new Set(failedServicesInput.split(','));
    
            // 创建一个Map，键是父服务，值是子服务集合
            const serviceDependencies = new Map();
    
            // 创建一个Map，用于记录服务第一次出现的位置
            const firstAppearance = new Map();
    
            let index = 0;
            // 遍历依赖关系列表
            for (const relation of dependencyRelations) {
                const childService = relation[0];
                const parentService = relation[1];
    
                // 如果服务不存在于Map中，则添加一个新的Set作为其值
                if (!serviceDependencies.has(childService)) {
                    serviceDependencies.set(childService, new Set());
                }
                if (!serviceDependencies.has(parentService)) {
                    serviceDependencies.set(parentService, new Set());
                }
    
                // 将子服务添加到父服务的Set中
                serviceDependencies.get(parentService).add(childService);
    
                // 记录服务第一次出现的位置
                if (!firstAppearance.has(childService)) {
                    firstAppearance.set(childService, index++);
                }
                if (!firstAppearance.has(parentService)) {
                    firstAppearance.set(parentService, index++);
                }
            }
    
            // 遍历故障服务列表，移除故障服务及其所有子孙服务
            for (const service of failedServices) {
                remove(serviceDependencies, service);
            }
    
            // 将剩余的正常服务转换为数组
            const remainingServices = Array.from(serviceDependencies.keys());
            if (remainingServices.length < 1) {
                console.log(",");
            }
            {
                // 按照服务在依赖关系列表中出现的顺序对正常服务进行排序
                remainingServices.sort((a, b) => firstAppearance.get(a) - firstAppearance.get(b));
    
                // 使用join将正常服务连接成一个逗号分隔的字符串
                console.log(remainingServices.join(','));
            }
    
    
            rl.close();
        });
    });
    
    

#### python

    
    
    import sys
    
    # 递归移除故障服务及其所有子孙服务
    def remove(service_dependencies, service):
        if service in service_dependencies:
            services_to_remove = service_dependencies[service]
            del service_dependencies[service]
    
            for child_service in services_to_remove:
                remove(service_dependencies, child_service)
    
    def main():
        dependency_relations_input = input("")
        failed_services_input = input("")
    
        # 读取依赖关系列表，并将其转换为二维字符串数组
        dependency_relations = [s.split('-') for s in dependency_relations_input.split(',')]
    
        # 读取故障服务列表，并将其转换为集合
        failed_services = set(failed_services_input.split(','))
    
        # 创建一个字典，键是父服务，值是子服务集合
        service_dependencies = {}
    
        # 创建一个字典，用于记录服务第一次出现的位置
        first_appearance = {}
    
        index = 0
        # 遍历依赖关系列表
        for relation in dependency_relations:
            child_service, parent_service = relation
    
            # 如果服务不存在于字典中，则添加一个新的集合作为其值
            if child_service not in service_dependencies:
                service_dependencies[child_service] = set()
            if parent_service not in service_dependencies:
                service_dependencies[parent_service] = set()
    
            # 将子服务添加到父服务的集合中
            service_dependencies[parent_service].add(child_service)
    
            # 记录服务第一次出现的位置
            if child_service not in first_appearance:
                first_appearance[child_service] = index
                index += 1
            if parent_service not in first_appearance:
                first_appearance[parent_service] = index
                index += 1
    
        # 遍历故障服务列表，移除故障服务及其所有子孙服务
        for service in failed_services:
            remove(service_dependencies, service)
    
        # 将剩余的正常服务转换为列表
        remaining_services = list(service_dependencies.keys())
    
    
        if len(remaining_services) < 1:
            print(",")
        else:
            # 按照服务在依赖关系列表中出现的顺序对正常服务进行排序
            remaining_services.sort(key=lambda x: first_appearance[x])
    
            # 使用join将正常服务连接成一个逗号分隔的字符串
            print(','.join(remaining_services))
    
    
    if __name__ == "__main__":
        main()
    
    
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * C++
>       * java
>       * JavaScript
>       * python
>

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/e9413fcd109f2f3d7297192eab0c0b2a.gif)

