const inputsymbol = document.getElementById("stock-symbol");
const searchbtn = document.getElementById("add-stock");
const intrabtn = document.getElementById("intraday");
const dailybtn = document.getElementById("daily");
const weekbtn = document.getElementById("weekly");
const monthbtn = document.getElementById("monthly");
const watchdiv = document.getElementById("watchlist-data");
const stockcard = document.getElementById("watchlist-cards");
const deletebtn = document.getElementById("btn-delete");

let timeframeval = null;
const timeframeFunc = (event)=>{
    if(event.target.innerText == intrabtn.innerText){
        timeframeval = event.target.innerText;
        console.log(timeframeval);
    }
    else if(event.target.innerText == dailybtn.innerText){
        timeframeval = event.target.innerText;
        console.log(timeframeval);
    }
    else if(event.target.innerText == weekbtn.innerText){
        timeframeval = event.target.innerText;
        console.log(timeframeval);
    }
    else if(event.target.innerText == monthbtn.innerText){
        timeframeval = event.target.innerText;
        console.log(timeframeval);
    }
    else{
        timeframeval = intrabtn.innerText;
        console.log(timeframeval);
    }
    return timeframeval;
};

intrabtn.addEventListener('click', timeframeFunc);
dailybtn.addEventListener('click', timeframeFunc);
weekbtn.addEventListener('click', timeframeFunc);
monthbtn.addEventListener('click', timeframeFunc);


searchbtn.addEventListener('click',function(event){
    
    if(inputsymbol.value == "IBM"){
        addStock(event);
    }
    else if(inputsymbol.value == "ibm"){
        addStock(event);
    }
    else {
        alert("wrong Input");
    }
});

function addStock(event){
    let symbol = inputsymbol.value.toUpperCase();
    if(timeframeval=="DAILY"){
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${timeframeval}_ADJUSTED&symbol=${symbol}&apikey=3V8ON25NY23CAA0Y`)
        .then((data)=>data.json())
        .then((data)=>{
            const stockname = Object.values(data['Meta Data'])[1];
            const latestprice = Object.values(data['Time Series (Daily)'])[0]['4. close'];
            //    console.log(latestprice);
            stockcardfnc(stockname,latestprice,timeframeval);
          })
         .catch((Error)=>{console.log(Error)})
    }
    else{
       fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${timeframeval}&symbol=${symbol}&interval=5min&apikey=3V8ON25NY23CAA0Y`)
       .then((data)=>data.json())
       .then((data)=>{
            const stockname = Object.values(data['Meta Data'])[1];
            // console.log(stockname);
        if(timeframeval=="INTRADAY"){
            const latestprice = Object.values(data['Time Series (5min)'])[0]['4. close'];
            // console.log(latestprice); 
            stockcardfnc(stockname,latestprice,timeframeval);
        }
        else if(timeframeval=="WEEKLY"){
            const latestprice = Object.values(data['Weekly Time Series'])[0]['4. close'];
            // console.log(latestprice);
            stockcardfnc(stockname,latestprice,timeframeval);
        }
        else if(timeframeval=="MONTHLY"){
            const latestprice = Object.values(data['Monthly Time Series'])[0]['4. close'];
            // console.log(latestprice);
            stockcardfnc(stockname,latestprice,timeframeval);
        }
      })
     .catch((Error)=>{console.log(Error)})
   };
};

function stockcardfnc(stockname,latestprice,timeframeval){
   const stockdiv = document.createElement("div");
   let idname = latestprice + timeframeval;
   stockdiv.setAttribute('id',idname);
   stockdiv.classList.add("stockcard-data");
   stockdiv.classList.add(latestprice);
   stockdiv.classList.add(timeframeval);
   stockdiv.innerHTML=`<p id="stock-name">${stockname}</p>
   <p id="stock-price">${latestprice}</p>
   <button type="button" id="time-frame" class="interval">${timeframeval}</button>
   <button id="btn-delete" class="btn-delete"><i class="fa-solid fa-xmark"></i></button>`;

   stockcard.appendChild(stockdiv);
    inputsymbol.value= null;
};

let stable;
let tbodydata;
let theaddata;
stockcard.addEventListener('click',(event)=>{
    if (event.target.classList.contains("btn-delete")) {
        const parentdiv = event.target.parentNode;
        // parentdiv.innerText = null;
        parentdiv.remove();
        
    }
    if (event.target.classList.contains("fa-solid")) {
        const parentdiv = event.target.parentNode.parentNode;
        // parentdiv.innerText = null;
        parentdiv.remove();
        
    }
    if(event.target.classList.contains("interval")){
        let selecteddiv = event.target.parentNode.className;
        selecteddiv = selecteddiv.split(" ");
        // console.log(selecteddiv);
        let newid = selecteddiv[1] + selecteddiv[2];
        // console.log(newid);
        let timeperiod = event.target.innerText;
        Getstockcarddata(timeperiod,newid);
    }
});


function Getstockcarddata(timeperiod,newid){
    let cardsymbol = document.getElementById("stock-name").innerText;
    // console.log(cardsymbol);
    if(timeperiod=="DAILY"){
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${timeperiod}_ADJUSTED&symbol=${cardsymbol}&apikey=3V8ON25NY23CAA0Y`)
        .then((data)=>data.json())
        .then((data)=>{
             tbodydata  = Object.values(data['Time Series (Daily)']);
             theaddata = Object.keys(data['Time Series (Daily)']);
            // console.log(tbodydata);
            // console.log(theaddata);
          })
         .catch((Error)=>{console.log(Error)})
    }
    else{
       fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${timeperiod}&symbol=${cardsymbol}&interval=5min&apikey=3V8ON25NY23CAA0Y`)
       .then((data)=>data.json())
       .then((data)=>{
            
        if(timeperiod=="INTRADAY"){
             tbodydata  = Object.values(data['Time Series (5min)']);
             theaddata = Object.keys(data['Time Series (5min)']);
            // console.log(tbodydata);
            // console.log(theaddata);
        }
        else if(timeperiod=="WEEKLY"){
             tbodydata  = Object.values(data['Weekly Time Series']);
             theaddata = Object.keys(data['Weekly Time Series']);
            // console.log(tbodydata);
            // console.log(theaddata);
        }
        else if(timeperiod=="MONTHLY"){
             tbodydata  = Object.values(data['Monthly Time Series']);
             theaddata = Object.keys(data['Monthly Time Series']);
            // console.log(tbodydata);
            // console.log(theaddata);
        }
      })
     .catch((Error)=>{console.log(Error)})
   };

   let headdata = tbodydata [0];
   function stockcardtable(){
    // console.log(headdata);
    stable= document.createElement("table");
    stable.setAttribute('id','stocktab');

    for(let i=0; i<=5;i++){
        let row = stable.insertRow();
        let cell = row.insertCell();

        if (i === 0) {
                if (timeperiod === 'INTRADAY') {
                    cell.innerHTML = theaddata[i].split(" ")[0];
                }

                for (let keys in headdata) {
                    let cell = row.insertCell();
                    let spread = keys.split(' ');
                    cell.innerHTML = spread[1];
                    console.log(spread[1])

                }

            }
            else {
                if (timeperiod === 'INTRADAY') {
                    cell.innerHTML = theaddata[i - 1].split(" ")[1]; 
                }
                for (let key in tbodydata[i - 1]) {
                    let cell = row.insertCell();

                    cell.innerHTML = tbodydata[i - 1][key];
                    cell.style.padding = "2px";

                }
                //Values of Data of open, high, low , close, Volume
            }
    }
       let selectstockcard = document.getElementById(newid);
       if(selectstockcard.nextSibling){
        selectstockcard.parentNode.insertBefore(stable,selectstockcard.nextSibling);
      }else{
        selectstockcard.parentNode.appendChild(stable);
      }

   }
   stockcardtable();
};



