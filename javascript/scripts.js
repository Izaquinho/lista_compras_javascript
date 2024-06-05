class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validarCampos(produto)) {
            if (this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
            this.listaTabela();
            this.limparCampos();
        }
    }

    lerDados() {
        let produto = {};

        produto.id = this.id;

        if (this.editId == null) {
            produto.nomeProduto = $('#produto').val();
            produto.preco = parseFloat($('#preco').val()).toFixed(2);
        } else {
            produto.nomeProduto = $('#produtoModal').val();
            produto.preco = parseFloat($('#precoModal').val()).toFixed(2);
        }

        return produto;
    }

    validarCampos(produto) {
        let msg = '';

        if (produto.nomeProduto === '') {
            msg += '- Informe o nome do Produto \n';
        }

        if (produto.preco === '' || isNaN(produto.preco)) {
            msg += '- Informe um preço válido para o Produto \n';
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

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
        this.editId = null;
    }

    listaTabela() {
        let tbody = $('#tbody');
        tbody.empty();

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = $('<tr></tr>');

            let td_id = $('<td></td>').text(this.arrayProdutos[i].id).addClass('center');
            let td_produto = $('<td></td>').text(this.arrayProdutos[i].nomeProduto);
            let td_preco = $('<td></td>').text(`R$ ${parseFloat(this.arrayProdutos[i].preco).toFixed(2)}`);
            let td_acoes = $('<td></td>').addClass('center');

            let imgEdit = $('<img>').attr('src', 'img/editing.png').click(() => this.editar(this.arrayProdutos[i]));
            let imgDelete = $('<img>').attr('src', 'img/trash.png').click(() => this.deletar(this.arrayProdutos[i].id));

            td_acoes.append(imgEdit, imgDelete);

            tr.append(td_id, td_produto, td_preco, td_acoes);
            tbody.append(tr);
        }
    }

    limparCampos() {
        $('#produto, #preco').val('');
        this.editId = null;
    }

    cancelar() {
        this.limparCampos();
    }

    editar(dados) {
        this.editId = dados.id;

        $('#produtoModal').val(dados.nomeProduto);
        $('#precoModal').val(dados.preco);

        $('#editModal').show();
    }

    deletar(id) {
        this.arrayProdutos = this.arrayProdutos.filter(produto => produto.id !== id);
        this.listaTabela();
    }
}

let produto = new Produto();

$(document).ready(function () {
    $('#salvar').click(function () {
        produto.salvar();
    });

    $('#cancelar').click(function () {
        produto.cancelar();
    });

    let modal = $('#editModal');
    let span = $('.close');

    span.click(function () {
        modal.hide();
    });

    $(window).click(function (event) {
        if (event.target.id === 'editModal') {
            modal.hide();
        }
    });

    $('#salvarModal').click(function () {
        produto.salvar();
        modal.hide();
    });

    $('#cancelarModal').click(function () {
        modal.hide();
    });
});
