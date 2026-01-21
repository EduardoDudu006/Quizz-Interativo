README: Projeto Super Quiz Interativo

Este repositório contém o código-fonte para um projeto web de um Super Quiz Interativo que testa conhecimentos em tecnologias front-end e back-end (HTML, CSS, JavaScript, React e Bootstrap) (p. 1).

🚀 Funcionalidades Principais

Seleção Personalizada: O usuário pode inserir seu nome, escolher um tema específico (HTML, CSS, JS, React ou Misturado) e definir a quantidade de perguntas (entre 5 e 40) (pp. 1, 7).
Três Telas de Interação: O quiz gerencia a navegação entre a tela de boas-vindas, a tela do quiz ativo e a tela final de resultados (pp. 1-2).
Dicas Integradas: Um botão "Mostrar Dica" revela informações contextuais para ajudar o usuário com a pergunta atual (pp. 1, 8).
Feedback Visual de Resultado: A tela final exibe a porcentagem de acertos (pp. 9-10).
Efeito de Fogos de Artifício: Um efeito visual de fogos de artifício animado é exibido via Canvas API se o usuário atingir uma pontuação igual ou superior a 70% (pp. 10-11).
Gabarito Final: Exibe um resumo detalhado de todas as perguntas, respostas do usuário e respostas corretas ao final do quiz (pp. 2, 10).
Reiniciar Jogo: Um botão permite recarregar a página e jogar novamente (pp. 2, 10).

🛠️ Tecnologias Utilizadas

O projeto é construído com as seguintes tecnologias front-end:
HTML5: Estrutura semântica das três telas do quiz (pp. 1-2).
CSS3: Estilização (layout Flexbox/Grid, gradiente de fundo, efeito backdrop-filter: blur(10px)) (pp. 2-3).
JavaScript (ES6+): Lógica do quiz, manipulação do DOM, embaralhamento de perguntas, cálculo de pontuação e animação de fogos de artifício via Canvas API (pp. 5, 11).

📁 Estrutura de Arquivos

A estrutura do projeto segue um padrão básico:
/super-quiz/
├── index.html
├── style.css
└── script.js

📖 Como Usar

Para visualizar o projeto, basta abrir o arquivo index.html em qualquer navegador web moderno. Não há necessidade de servidor web ou instalação de dependências.

Detalhes de Implementação

CSS: Utiliza a classe .hidden para alternar a visibilidade das diferentes telas (p. 2). As opções de resposta usam display: flex; flex-direction: column; gap: 20px; para um layout limpo e empilhado (p. 4).
JavaScript (Banco de Perguntas): As perguntas são armazenadas em um objeto questionBank categorizado por tema, facilitando a expansão do conteúdo (p. 6).
JavaScript (Lógica): A função loadQuestion() popula dinamicamente a interface com a pergunta e opções atuais (p. 8). A função finishQuiz() calcula a porcentagem de acerto e decide qual mensagem final e qual tipo de animação (fogos simples ou animados) exibir (pp. 9-10).

🖼️ Fontes de Mídia

Este projeto não utiliza imagens externas; o efeito visual de fogos de artifício na tela final é gerado programaticamente usando a API Canvas do HTML (pp. 11-12).

© Direitos Autorais e Licença
© 2026. Todos os direitos reservados.
