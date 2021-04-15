const Modal={
    toggle(){
        document
            .querySelector(".modalOverlay")
            .classList.toggle("active")
    }
}

const transactions=[
    {
        description:"Luz",
        amount:-500,
        date:"23/01/2021"
    },{
        description:"Internet",
        amount:-100,
        date:"23/01/2021"        
    },{
        description:"Projeto Website",
        amount:500,
        date:"23/03/2021"
    }
]

const Transaction={
    all:transactions,
    add(transaction){
        Transaction.all.push(transaction);
        App.reload();
    },
    remove(index){
        Transaction.all.splice(index,1);
        App.reload();
    },
    incomes(){
        let income=0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount>=0){
                income+=transaction.amount;
            }
        });
        return income;
    },
    expenses(){
        let expense=0;
        Transaction.all.forEach(transaction =>{
            if (transaction.amount<0){
                expense+=transaction.amount;
            }
        });
        return expense;
    },
    total(){
        return Transaction.expenses()+ Transaction.incomes();
    }
}

const DOM={
    transactionsContainer:document.querySelector("#dataTable tbody"),
    addTransaction(transaction,index){
        const tr=document.createElement("tr");
        tr.innerHTML=DOM.innerHTMLTransaction(transaction);
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        const CSSclass=transaction.amount>0 ? "income":"expense";
        const html=`
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">R$ ${Number(transaction.amount).toFixed(2).replace(".",",")}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>`
        return html;
    },
    updateBalance(){
        document.getElementById("incomeDisplay")
            .innerHTML="R$ "+Transaction.incomes().toFixed(2).replace(".",",");
        document.getElementById("expanseDisplay")
            .innerHTML="R$ "+Transaction.expenses().toFixed(2).replace(".",",");
        document.getElementById("totalDisplay")
            .innerHTML="R$ "+Transaction.total().toFixed(2).replace(".",",");
    },
    clearTransactions(){
        DOM.transactionsContainer.innerHTML="";
    }
}

const App={
    init(){
        Transaction.all.forEach(transaction => DOM.addTransaction(transaction));
        DOM.updateBalance();
    },
    reload(){
        DOM.clearTransactions();
        App.init();
    }
}

App.init();

