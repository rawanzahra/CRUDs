let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count=document.getElementById('count');
let categeory=document.getElementById('categeory');
let create=document.getElementById('sumbit');
let title=document.getElementById('title');
let search=document.getElementById('search');
let mood='create';
let moodsearch='title';
let up;
//Total
function getTotal(){
    if(price.value != ''){
        let result= (+price.value + +taxes.value + +ads.value) - (+discount.value);
        total.innerHTML=result;
        total.style.background='green';
    }else{
        total.innerHTML= '';
        total.style.background='red';
    }
}

//storage data
let dataPro;
if(localStorage.product !=null){
    dataPro=JSON.parse(localStorage.product)

}
else{
    dataPro=[];
}
create.onclick=function(){
    let newPro={
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        categeory: categeory.value,
        count: count.value,
    }
    if(mood==='create'){
        if( title.value !='' && 
            price.value!=''  && 
            count.value <100 && 
            categeory.value !=''
        ){
            if(count.value>1){
                for(let x=0;x<count.value;x++){
                    dataPro.push(newPro);
                }
        
            }else{
                dataPro.push(newPro);
            }
            cleardata();
        }
       
     

    }else if(mood==='update'){
        dataPro[up]=newPro;
        mood='create';
        create.innerHTML='Create';
        count.style.display='block';
        cleardata();
    }
       
    localStorage.setItem('product',JSON.stringify(dataPro));
   
    showdata()
  

}
//clear data

function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    categeory.value='';
    search.value='';

}
//show data

function showdata(){
    getTotal();
    let table ='';
    for(let i=0;i< dataPro.length;i++){
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].categeory}</td>
            <td><button onclick='updateData(${i})' >Update</button></td>
            <td><button onclick='deleteElement(${i})'>Delete</button></td>
        </tr>
    `
    }
    document.getElementById('tbody').innerHTML=table;
    let btndeleteAll= document.getElementById('deleteAll');
    if(dataPro.length>0){
        btndeleteAll.innerHTML=`
        <button onclick='deleteAll()'>Delete All(${dataPro.length})</button>
        `;

    }else{
        btndeleteAll.innerHTML='';

    }
}
showdata()

//delete
function deleteElement(i){
    dataPro.splice(i,1);
    localStorage.product= JSON.stringify(dataPro);
    cleardata();
    showdata();

}
//delete all
function deleteAll(){
    dataPro.splice(0);
    localStorage.clear();
    cleardata();
    showdata();
    
   
}

//update
function updateData(i){
    title.value=dataPro[i].title;
    taxes.value=dataPro[i].taxes;
    price.value=dataPro[i].price;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    categeory.value= dataPro[i].categeory;
    count.style.display='none';
    getTotal();
    mood='update'
    create.innerHTML='Update';
    up=i;
    scroll({
        top:0,
        behavior:"smooth",
    });
  

}

//search 
 function getMood(id){
    search.value='';
    moodsearch= id;
    search.focus();
    search.placeholder='search by '+ id;
    showdata();
    
 
 }

 function searchData(){
    let table='';
    for(let i=0; i<dataPro.length; i++){
        if(moodsearch==='title'){
            if(dataPro[i].title.includes(search.value)){
                table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].categeory}</td>
                    <td><button onclick='updateData(${i})' >Update</button></td>
                    <td><button onclick='deleteElement(${i})'>Delete</button></td>
                </tr>
            `
            }
            
        }else{
            if(dataPro[i].categeory.includes(search.value)){
                table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].categeory}</td>
                    <td><button onclick='updateData(${i})' >Update</button></td>
                    <td><button onclick='deleteElement(${i})'>Delete</button></td>
                </tr>
            `
            }
            

        }
        document.getElementById('tbody').innerHTML=table;
        
        
    }
    

 }
