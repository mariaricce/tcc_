# Instituto Solidarize

Sistema web desenvolvido como Trabalho de Conclusão de Curso (TCC) para auxiliar no gerenciamento das atividades do Instituto Solidarize.

O projeto possui uma área pública para divulgação das ações da instituição e uma área administrativa destinada ao gerenciamento de campanhas, voluntários, beneficiários, doações, participações e atendimentos.

---

## Objetivo do projeto

O Instituto Solidarize foi desenvolvido com o objetivo de centralizar informações e facilitar a organização de atividades realizadas por uma instituição social.

O sistema permite divulgar campanhas, receber manifestações de interesse em voluntariado, registrar doações, acompanhar beneficiários e organizar atendimentos e participações.

---

## Tecnologias utilizadas

### Back-end

- Node.js
- Express
- Express Session
- MySQL
- mysql2
- bcryptjs
- dotenv
- Nodemailer
- Multer

### Front-end

- HTML
- CSS
- JavaScript
- EJS

### Banco de dados

- MySQL
- MySQL Workbench

---

## Principais funcionalidades

### Área pública

- Página inicial institucional
- Página sobre o Instituto
- Divulgação de campanhas
- Progresso de arrecadação das campanhas
- Página Como Ajudar
- Cadastro público de voluntários
- Formulário de contato
- Cadastro e login de usuários
- Área do usuário
- Doação em dinheiro
- Instruções para pagamento via PIX
- Envio de comprovante pelo WhatsApp
- Modo claro e modo escuro
- Menu responsivo
- Aviso de cookies
- Página de privacidade
- Integração com VLibras

---

## Área administrativa

Usuários administradores possuem acesso a um painel exclusivo para gerenciamento do sistema.

O painel permite administrar:

- Campanhas
- Voluntários
- Beneficiários
- Doações
- Participações
- Atendimentos

Também possui indicadores e registros recentes para facilitar a visualização das informações cadastradas.

---

## Campanhas

O administrador pode:

- Cadastrar campanhas
- Editar campanhas
- Inserir imagem
- Definir período
- Definir meta de arrecadação
- Alterar o status
- Consultar valor arrecadado
- Excluir campanhas sem registros vinculados

Campanhas podem possuir os seguintes status:

- Ativa
- Pausada
- Encerrada

O valor arrecadado considera somente doações com status `Recebida`.

---

## Voluntários

O sistema permite:

- Cadastro público de voluntários
- Cadastro pelo administrador
- Edição dos dados
- Controle de status
- Registro da área de interesse
- Registro da disponibilidade
- Participação em campanhas

Um voluntário que possui participações registradas não pode ser excluído diretamente.

---

## Beneficiários

O administrador pode:

- Cadastrar beneficiários
- Editar dados
- Registrar telefone
- Registrar endereço
- Adicionar observações
- Alterar status
- Relacionar beneficiários a atendimentos

Beneficiários que possuem atendimentos registrados não podem ser excluídos diretamente.

---

## Doações

O sistema permite registrar doações com informações como:

- Nome do doador
- Tipo
- Descrição
- Quantidade
- Valor
- Data
- Campanha relacionada
- Status

Os status disponíveis são:

- Recebida
- Pendente
- Cancelada

---

## Doação pública por PIX

O visitante pode acessar uma campanha ativa e realizar uma doação em dinheiro.

O funcionamento é:

1. O usuário escolhe uma campanha.
2. Informa o nome e o valor da contribuição.
3. A doação é registrada como `Pendente`.
4. O sistema apresenta os dados necessários para realizar o PIX.
5. O usuário pode enviar o comprovante pelo WhatsApp.
6. O administrador verifica o pagamento.
7. A doação pode ser alterada para `Recebida`.

A confirmação do pagamento não é automática.

A página de pagamento da doação é protegida pela sessão utilizada no momento em que a doação é criada.

---

## Participações

O módulo permite relacionar voluntários e campanhas.

Os status disponíveis são:

- Inscrito
- Participando
- Concluído
- Cancelado

---

## Atendimentos

Os atendimentos relacionam beneficiários às ações realizadas pelo Instituto.

Um atendimento pode ser associado opcionalmente a uma campanha.

Exemplos de tipos de atendimento:

- Cesta básica
- Roupas
- Material escolar
- Higiene
- Orientação
- Outro

Os status disponíveis são:

- Realizado
- Agendado
- Cancelado

---

## Sistema de autenticação

O projeto possui autenticação para usuários e administradores.

As senhas não são armazenadas em texto simples. O sistema utiliza `bcryptjs` para gerar hash das senhas.

As sessões são controladas com `express-session`.

Existem dois tipos de usuário:

```text
usuario
admin
```

As páginas administrativas possuem controle de acesso exclusivo para administradores.

---

## Upload de imagens

As campanhas permitem upload de imagens.

Formatos aceitos:

- JPEG
- PNG
- WEBP

Tamanho máximo:

```text
5 MB
```

As imagens ficam armazenadas em:

```text
public/images/campanhas
```

---

## Estrutura principal do projeto

```text
instituto-solidarize-tcc/
│
├── config/
│   ├── database.js
│   ├── email.js
│   └── uploadCampanha.js
│
├── controllers/
│
├── middlewares/
│
├── models/
│
├── public/
│   ├── css/
│   ├── images/
│   └── js/
│
├── routes/
│
├── views/
│   ├── admin/
│   ├── atendimentos/
│   ├── beneficiarios/
│   ├── campanhas/
│   ├── doacoes/
│   ├── participacoes/
│   ├── partials/
│   ├── usuario/
│   └── voluntarios/
│
├── .env
├── .env.example
├── .gitignore
├── app.js
├── criarAdmin.js
├── package.json
└── README.md
```

---

# Instalação

## 1. Pré-requisitos

Para executar o projeto é necessário possuir:

- Node.js
- npm
- MySQL
- MySQL Workbench ou outro gerenciador MySQL

---

## 2. Clonar o projeto

```bash
git clone URL_DO_REPOSITORIO
```

Depois entre na pasta:

```bash
cd instituto-solidarize-tcc
```

---

## 3. Instalar as dependências

Execute:

```bash
npm install
```

---

## 4. Configurar as variáveis de ambiente

Copie:

```text
.env.example
```

e crie:

```text
.env
```

Preencha as configurações conforme seu ambiente.

Exemplo:

```env
PORT=8000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=solidarize_tcc

SESSION_SECRET=sua_chave_secreta

EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_aplicativo

PIX_CHAVE=sua_chave_pix
PIX_RECEBEDOR=Instituto Solidarize

WHATSAPP_NUMERO=55DDDNUMERO

ADMIN_NOME=Administrador Solidarize
ADMIN_EMAIL=admin@exemplo.com
ADMIN_SENHA=sua_senha_forte
```

O arquivo `.env` não deve ser enviado ao GitHub.

---

# Banco de dados

O banco utilizado pelo sistema é:

```text
solidarize_tcc
```

As principais tabelas são:

```text
usuarios
campanhas
voluntarios
beneficiarios
doacoes
participacoes
atendimentos
```

Antes de executar o sistema em outro computador, importe o arquivo SQL do banco de dados no MySQL.

---

# Criar administrador

Depois de configurar o `.env` e o banco de dados, execute:

```bash
node criarAdmin.js
```

O script utiliza:

```text
ADMIN_NOME
ADMIN_EMAIL
ADMIN_SENHA
```

definidos no arquivo `.env`.

Caso já exista um usuário com o mesmo e-mail, o administrador não será criado novamente.

---

# Executar o projeto

## Desenvolvimento

```bash
npm run dev
```

O Nodemon reinicia o servidor automaticamente quando alterações são detectadas.

---

## Execução normal

```bash
npm start
```

Por padrão, o sistema pode ser acessado em:

```text
http://localhost:8000
```

---

# Segurança

O projeto utiliza algumas medidas para auxiliar na proteção das informações:

- Hash de senhas com bcryptjs
- Controle de sessão
- Rotas administrativas protegidas
- Validação de dados recebidos
- Consultas SQL parametrizadas
- Limitação de arquivos enviados
- Restrição dos tipos de imagem
- Proteção de registros relacionados antes da exclusão
- Variáveis sensíveis armazenadas no `.env`

---

# Responsividade e acessibilidade

O site possui recursos voltados para diferentes dispositivos e necessidades de acesso.

Entre eles:

- Layout responsivo
- Menu adaptado para dispositivos móveis
- Modo claro
- Modo escuro
- Estados de foco para navegação
- VLibras
- Estrutura HTML com atributos de acessibilidade

---

# Privacidade

O sistema utiliza sessão para manter usuários autenticados.

Também utiliza armazenamento no navegador para algumas preferências, como o modo claro ou escuro e a confirmação do aviso de cookies.

As informações enviadas pelo formulário de contato são encaminhadas para o e-mail configurado pelo Instituto.

---

# Observação sobre pagamentos

O sistema não utiliza gateway de pagamento.

O PIX apresentado no site funciona como orientação para realização da transferência.

A confirmação da doação é realizada pelo administrador após a verificação do pagamento.

---

# Trabalho de Conclusão de Curso

Este sistema foi desenvolvido para fins educacionais como projeto de Trabalho de Conclusão de Curso.

O Instituto Solidarize representa uma proposta de sistema web voltado para organização e apoio às atividades de uma instituição social.

---

## Licença

Projeto desenvolvido para fins acadêmicos e educacionais.