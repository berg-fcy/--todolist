function clear(){
    localStorage.clear();
    list();
}

function list(){
    var todolist = document.getElementById("todoBox");
    var donelist = document.getElementById("doneBox");
    var todocount = document.getElementById("todocount");
    var donecount = document.getElementById("donecount");
    var data = localStorage.getItem("todoBox");
    var todolist1 = "";
    var donelist1 = "";
    var todocount1 = 0;
    var donecount1 = 0;
    if(data != null){
        data=JSON.parse(data);
        for(var i = data.length-1;i >= 0;i--){
            if(data[i].status){
                donelist1 += "<li id='li-" + i +"'><input class='checkBox' type='checkbox' style='float:left;' checked='checked' onchange='change(" + i + ",true)'>" + 
                "<input class='content' type='text' style='float:left;' id='" + i + "' value=" + data[i].li + " onchange='update(" + i + ")'>" +
                 "<span class='listSpan' style='float:right;' onclick=remove(" +i + ")>" + "删除</span></li>";
                 donecount1++;
            }else{
                todolist1 += "<li id='li-" + i +"'><input class='checkBox' type='checkbox' style='float:left;' onchange='change(" + i + ",false)'>" + 
                "<input class='content' type='text' style='float:left;' id='" + i + "' value=" + data[i].li +" onchange='update(" + i + ")'>" +
                 "<span class='listSpan' style='float:right;' onclick=remove(" +i + ")>" + "删除</span></li>";
                 todocount1++;
            }
        }
            todolist.innerHTML = todolist1;
            donelist.innerHTML = donelist1;
            todocount.innerText = todocount1;
            donecount.innerText = donecount1;
    }else{
        todolist.innerHTML = "";
        donelist.innerHTML = "";
        todocount.innerText = 0;
        donecount.innerText = 0;
    }
}

    function change(id,val){
        var data = loadData();
        if(val){
            var li = document.getElementById("li-"+id);
            var checkbox = li.children[0];
            checkbox.innerHTML = "<input class='checkBox' type='checkbox' style='float:left;' onchange='change(" + id + ",false)'>";
            var donecount = new Number(document.getElementById("donecount").innerText);
            donecount.innerText = donecount-1;
            data[id].status = false;
            saveData(data);
            list();
        }else{
            var li = document.getElementById("li-"+id);
            var checkbox = li.children[0];
            checkbox.innerHTML = "<input class='checkBox' type='checkbox' style='float:left;' onchange='change(" + id + ",true)'>";
            var todocount = new Number(document.getElementById("todocount").innerText);
            todocount.innerText = todocount-1;
            data[id].status = true;
            saveData(data);
            list();
        }
    }

    function update(id){
        var data = loadData();
        var Item = document.getElementById(new String(id));
        console.log(data[id]);
        console.log(Item);
        data[id].li = Item.value;
        saveData(data);
    }

    function remove(n){
        var data = loadData();
        data.splice(n,1);
        saveData(data);
        list();
    }

    function saveData(data){
        data = JSON.stringify(data);
        localStorage.setItem("todoBox",data);
    }

    function loadData(){
        var data = localStorage.getItem("todoBox");
        var Array = [];
        if(data==null){
            return Array;
        }else{
            return JSON.parse(data);
        }
    }

    function action(){
        var input = document.getElementById("Input");
        if(input.value == ""){
            alert("内容不能为空");
        }else{
            var data=loadData();
            var todo={"li":input.value,"status":false};
            data.push(todo);
            saveData(data);
            var form = document.getElementById("form");
            form.reset();
            list();
        }

        window.onload = function (){
            list();
        }
    }
