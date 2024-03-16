let base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let msgPara = document.querySelector(".msg #para");
let formCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateExchageRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal = 1;
        amount.value = "1";
    }
    let realUrl = `${base_url}/${formCurr.value.toLowerCase()}.json`;
    let response = await fetch(realUrl);
    let data = await response.json();
    let rate = data[formCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let total = amtVal * rate;
    msgPara.innerText = `${amtVal} ${formCurr.value} = ${total} ${toCurr.value}`;
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newImgUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newImgUrl;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchageRate();
})


