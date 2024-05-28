class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validarCampos(produto)) {
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
    
    cancelar() {
        this.limparCampos();
    }
    
    limparCampos() {
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';
    }
}

let produto = new Produto();