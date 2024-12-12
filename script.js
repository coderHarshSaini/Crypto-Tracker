/* Write the Javascript code here */

let dropBox=document.querySelector('#crypto-select')
let listData;

let para=document.createElement('p');
para.setAttribute('id','crypto-price')
para.innerText=`Current Price:$ `
document.querySelector('.crypto-info').append(para)

async function getData(){
    let url="https://api.coinlore.net/api/tickers/";
    try{
        let bigData=await axios.get(url);
        listData=bigData.data.data;
    
        listData.forEach((element,idx) => {
            let option=document.createElement('option')
            option.setAttribute('value',idx)
            option.innerText=element.name;
            dropBox.appendChild(option);
    });
    }
    catch(err){
        console.log("Network Error");
        alert("Network Error")
    }

}
getData()

let inpBox=document.querySelector('.alert-setup')
let h1=document.createElement('h1')
h1.setAttribute('id','alert-message')


function change(){

    let idx=dropBox.value;
    if(idx<0){
        h1.style.display="none"
        para.innerText=`Current Price:$ `
        return;
    }
    para.innerText=`Current Price:$ ${listData[idx].price_usd}`;
    let value=document.querySelector('#alert-price').value;

    if(+(listData[idx].price_usd) >= +value){

        h1.innerText=`Alert ${listData[idx].name} has reached or surpassed $ ${value}`
        h1.style.display="flex"
        inpBox.append(h1)
        
    }else{
        h1.style.display="none"
    }
}


