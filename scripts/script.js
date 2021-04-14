const Modal={
    toggle(){
        document
            .querySelector(".modalOverlay")
            .classList.toggle("active")
    }
}

const transactions=[
    {
        id:1,
        description:"Luz",
        amount:-500,
        date:"23/01/2021"
    },{
        id:2,
        description:"Internet",
        amount:-100,
        date:"23/01/2021"        
    },{
        id:3,
        description:"Projeto Website",
        amount:500,
        date:"23/03/2021"
    }
]

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
        <td class="${CSSclass}">R$ ${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>`
        return html;
    }
}
 
transactions.forEach(transaction => DOM.addTransaction(transaction));