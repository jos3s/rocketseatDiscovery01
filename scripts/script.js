const Modal={
    toggle(){
        document
            .querySelector(".modalOverlay")
            .classList.toggle("active")
    }
}

const Transaction={
    all:[
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
    ],
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

const Utils={
    formatDate(date){
        const splittedDate=date.split("-");
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }   
}

const Form={
    description:document.querySelector("input#description"),
    amount:document.querySelector("input#amount"),
    date:document.querySelector("input#date"),
    getValues(){
        return {
            description:Form.description.value,
            amount:Form.amount.value,
            date:Form.date.value,
        }
    },
    formatValues(){
        let {description,amount,date}=Form.getValues();
        date=Utils.formatDate(date);
        amount=Number(amount);
        return {description,amount,date};
    },
    validateField(){
        const {description,amount,date}=Form.getValues();

        if (description.trim()==="" || amount.trim()==="" || date.trim()==="") {
            throw new Error("Por favor, preencha todos os campos");
        }
    },
    clearFields(){
        Form.description.value="";
        Form.amount.value="";
        Form.date.value="";
    },
    submit(event){
        event.preventDefault();
        try {
            Form.validateField();
            const transaction=Form.formatValues();
            Transaction.add(transaction);
            Form.clearFields();
            Modal.toggle();
        } catch (error) {
            alert(error.message);
        }
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

