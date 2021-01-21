class Format
{
    static getCamelCase(text)
    {   
        let div = document.createElement('div');
        // cria uma div para poder utilizar o dataset que faz a transformação do id utilizando o dataset
        div.innerHTML = `<div data-${text}="id"></div>`;
        // retorna a chave do elemento da div (id no padrão camel case)
        return Object.keys(div.firstChild.dataset)[0];
    }
}