// Função principal que encontra o menor número que não pode ser formado pela soma de subconjuntos
function findSmallestImpossibleNumber(arr) {
    // Ordena o array em ordem crescente
    arr.sort((a, b) => a - b);
    
    let smallestImpossible = 1; // Começa com o menor número positivo
    
    // Itera através do array ordenado
    for (let i = 0; i < arr.length; i++) {
        // Se o elemento atual for maior que o smallestImpossible, encontramos nossa resposta
        if (arr[i] > smallestImpossible) {
            return smallestImpossible;
        }
        // Atualiza o smallestImpossible adicionando o valor do elemento atual
        smallestImpossible += arr[i];
    }
    
    // Se todos os elementos puderem formar todos os números até a soma total
    return smallestImpossible;
}

// Função para validar e processar a entrada do usuário
function processInput() {
    const input = document.getElementById('numbers').value;
    const resultElement = document.getElementById('result');
    
    try {
        // Remove espaços e divide por vírgulas
        const numbers = input.split(',')
            .map(num => num.trim())
            .filter(num => num !== '')
            .map(num => {
                const parsed = parseInt(num, 10);
                if (isNaN(parsed) || parsed < 1 || parsed > 1000) {
                    throw new Error('Invalid number');
                }
                return parsed;
            });
        
        if (numbers.length === 0) {
            throw new Error('Empty input');
        }
        
        if (numbers.length > 1000) {
            throw new Error('Maximum of 1000 numbers allowed');
        }
        
        // Encontra o menor número impossível
        const result = findSmallestImpossibleNumber(numbers);
        resultElement.textContent = result;
        resultElement.style.color = '#00ff88';
        resultElement.style.textShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
        
    } catch (error) {
        resultElement.textContent = 'Erro: Insira números válidos (1-1000) separados por vírgulas';
        resultElement.style.color = '#ff5555';
        resultElement.style.textShadow = '0 0 10px rgba(255, 85, 85, 0.5)';
    }
}

// Função para limpar o campo de entrada e resultado
function clearFields() {
    document.getElementById('numbers').value = '';
    document.getElementById('result').textContent = '-';
    document.getElementById('result').style.color = '#fff';
    document.getElementById('result').style.textShadow = 'none';
}

// Event listeners para os botões
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('detect').addEventListener('click', processInput);
    document.getElementById('return').addEventListener('click', clearFields);
    
    // Permite pressionar Enter no campo de input para detectar
    document.getElementById('numbers').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processInput();
        }
    });
});