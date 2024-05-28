class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validarCampos(produto)) {
            this.adicionar(produto);
            this.listaTabela();
            this.limparCampos();
        }
    }

    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;

        return produto;
    }

    validarCampos(produto) {
        let msg = '';

        if (produto.nomeProduto === '') {
            msg += '- Informe o nome do Produto \n';
        }

        if (produto.preco === '') {
            msg += '- Informe o preço do Produto \n';
        }

        if (msg !== '') {
            alert(msg);
            return false;
        }

        return true;
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);
        this.id++;
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_id.classList.add('center');
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].preco;

            let imgEditar = document.createElement('img');
            imgEditar.src = 'img/editing.png';
            imgEditar.setAttribute("onclick", "produto.editar(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            let imgDeletar = document.createElement('img');
            imgDeletar.src = 'img/trash.png';
            imgDeletar.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

            td_acoes.appendChild(imgEditar);
            td_acoes.appendChild(imgDeletar);
            td_acoes.classList.add('center');
        }
    }

    limparCampos() {
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';
    }

    cancelar() {
        this.limparCampos();
    }

    editar(dados) {
        // Função para editar produtos
    }

    deletar(id) {
        let tbody = document.getElementById('tbody');

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id === id) {
                this.arrayProdutos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
    }
}

let produto = new Produto();
