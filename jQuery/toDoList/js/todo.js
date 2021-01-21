$(function () {
    load();
    // 1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    $("#title").on("keydown", function (event) {
        if (event.keyCode == 13) {
            var localData = getData();
            localData.push({
                title: $(this).val(),
                done: false
            });
            saveData(localData);
            // 2. toDoList 本地存储数据渲染加载到页面
            load();
            $(this).val("");
        }
    })
    // 3. toDoList 删除操作  事件委托
    $("ol,ul").on("click", "a", function () {
        var localData = getData();
        var index = parseInt($(this).attr("id"));
        localData.splice(index,1);
        saveData(localData);
        load();
    })
    // 4. toDoList 正在进行和已完成选项操作
    $("ol,ul").on("click", "input",function(){
        // 先获取本地存储的数据
        var localData = getData();
        var index =parseInt($(this).siblings("a").attr("id"));
        localData[index].done = $(this).prop("checked");
        saveData(localData);
        load();
    })
    // 读取本地存储的数据 
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存本地存储数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 渲染加载数据
    function load() {
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        var localData = getData();
        $("ol,ul").empty();
        $.each(localData, function (index, data) {
            if(data.done == false){
                $("ol").prepend("<li><input type='checkbox' > <p>" + data.title + "</p> <a href='javascript:;' id=" + index + " ></a></li>");
                todoCount++;
                console.log(todoCount);
            }else {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + data.title + "</p> <a href='javascript:;' id=" + index+ " ></a></li>");
                doneCount++;
            }
            
        })
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})