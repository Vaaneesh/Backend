let tasklist=document.querySelector(".tasklist");
let form=document.querySelector(".myform");
let input=document.querySelector("#taskitem");

form.addEventListener("submit",(ev)=>{
    ev.preventDefault();
    let taskitem=input.value;
    axios.post("/addtodo",{
        task:taskitem  //key pass kri
    }).then((data)=>{
        console.log(data);
        input.value="";
        let div=document.createElement("div");
        div.innerHTML=`${taskitem} <button>Delete</button>`;
        tasklist.append(div);
    })
    // axios.post("/addtodo",{
    //     task:taskitem
    // },{
    //     headers:{

    //     }
    // })
})

function showData(data){
    console.log(data);
    console.log(tasklist);
    data.forEach(task => {
        let div=document.createElement("div");
        div.innerText=`${task}`;
        tasklist.append(div);
    });
}

async function getdata(Api){
    let data=await fetch(Api);
    let responsedata=await data.json();
    console.log(responsedata);
    showData(responsedata);
}
getdata("/gettodo");