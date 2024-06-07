# Entrega-GS-WebDev
Esse repositório servirá para armazenar a entrega relacionada a disciplina de WebDev conectada com a proposta da Global Solution desse semestre: a Economia Azul. Essa entrega será focada no código relacionado as funcionalidades da nossa ideia, feito em JavaScript.

Integrantes do grupo:
Wendell dos Santos Silva RM558859
Lorenzzo Vendruscolo Dias  RM558305
Davi Schaeffer Aguiar 554951

Descrição do projeto:
Idealizamos um site voltado para o tema principal da Global Solution (GS) FIAP 2024, primeiro semestre, cujo foco é a Economia Azul. Foi proposto para a nossa turma de Engenharia de Software a prototipação de um site envolvendo alguma solução eficaz para o cuidado e manutenção de oceanos, a fim de tornar as atividades ali realizadas mais sustentáveis. Tendo em vista essa abordagem, nosso grupo prototipou o projeto BeOcean: uma plataforma ideal para organiazações como ONG's se conectarem com voluntários de forma mais simples e funcional. 
O foco central da BeOcean é criar um ambiente onde organizações podem postar seus eventos relacionados aos cuidados com oceanos e voluntários podem visualizar esses eventos e se cadastrar. A plataforma é simples, mas busca um objetivo forte: encurtar distância entre a solidariedade (voluntários) e o compromisso (ONG's), Nesse arquivo você pode visualizar informações importantes sobre o script do projeto, apresentando funcionalidades como registro de usuário, página de criação/visualização de eventos e perfil de cada usuário. Todas as funcionalides foram feitas usando JavaScript.
Esse repositório armazena principalmente o script do projeto, que é o principal requisito solicitado pela disciplina de Web Development. O Front da nossa plataforma foi projeto apenas com o foco de tornar a imersão no script mais real possível, ou seja, o design não é o foco principal desse repositório e sim a funcionalidade.

Sobre o Script:

O código da plataforma foi separado em três scripts: 
- script-register.js: código relacionado a página de cadastro de usuário (empresa ou voluntário) e login do usuário já cadastrado.
        - Esse script foi separado em validação dos dados cadastrados nos campos solicitados, armazenamento desses dados no localStorage e página de login usando dandos disponíveis no localStorage. Foi usado conceitos de manipulação de DOM, criação de funções de verificação de dados inseridos, funções geradas por cliques em botões e "armazenamento de dados" no localStorage, apenas para tornar a experiência mais real, mesmo não sendo aplicado diretamente conceito de bancos de dados.
- script_events.js: código relacionado a criação, atualização, remoção e visualização dos eventos relacionados a ideia do projeto.
        - Essa parte do projeto usou principalmente do conceito de CRUD (Creat, read, update, delete) para criação de novos eventos para o perfil de empresa. A página de eventos modifica de acordo com o perfil logado no site (voluntário ou empresa). Todos esses dados são obtidos no localStorage.
-script_profile.js: código relacionado ao perfil do usuário.
        - O perfil pega informações do usuário logado na página e altera os elementos do página relacionados as informações cadastradas. Ao clicar no botão sair, o usuário é desconectado, tendo que realizar o login novamente para aproveitar nosso site.

Conceitos principais aprendidos em aula e aplicados nesse projeto:
- Uso do GitHub e manipulação de branchs
- Boas práticas na manipulação e atualização de repositório
- CRUD
- Manipulação de DOM via JavaScript
- Declaração de funções
- addEventListener como principal atributo de validação de cliques.