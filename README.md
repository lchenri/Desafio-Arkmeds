# Desafio Técnico Arkmeds

Projeto que visa desenvolver uma aplicação web com funcionalidades de um CRUD(Create, Read, Update e Delete) utilizando Python, Django, JavaScript, HTML e APIs REST.

## Tecnologias Utilizadas
- [Python 3.12](https://www.python.org/downloads/)
- [Django](https://www.djangoproject.com/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [Coverage.py](https://coverage.readthedocs.io/en/7.6.0/)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [DOMPurify](https://www.npmjs.com/package/dompurify)
- [SQLite](https://www.sqlite.org/)
- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

## Pré-requisitos

Certifique-se de ter instalado em sua máquina o [Python 3.12](https://www.python.org/downloads/)

## Instalação

1. Clone o repositório com:
```bash
git clone https://github.com/lchenri/Desafio-Arkmeds.git
```

2. Navegue com o prompt de comando até a pasta onde o repositório foi clonado e certifique-se de entrar dentro da pasta do repositório. O caminho deve estar algo assim:
```
C:\Users\{user}\{Downloads}\Desafio-Arkmeds>
```

3. Crie e ative um ambiente virtual:
```bash
# Cria um ambiente virtual
python -m venv .venv

# Ativa o ambiente virtual
.venv\Scripts\activate
```

4. Com o ambiente virtual ativo, instale as dependências em requirements.txt com o seguinte comando:
```bash
pip install -r requirements.txt
```

5. Caso queira garantir a funcionalidade do projeto, antes iniciar o servidor de desenvolvimento, execute os testes com:
```bash
python manage.py test
```

6. Estando tudo certo, inicie o servidor com:
```bash
python manage.py runserver
```

7. Após isso, acesse a aplicação no navegador com o ip que apareceu no prompt de comando:
```bash
# Semelhante ao da linha abaixo. Geralmente é o localhost na porta 8000
Starting development server at http://127.0.0.1:8000/
```

## API
A aplicação utiliza uma API interna para realizar as operações de CRUD. Abaixo se encontram os endpoints da API.
-  **GET /api/equipamentos/** - Listar todos os equipamentos. 
- **POST /api/equipamentos/** - Adicionar um novo equipamento. 
- **GET /api/equipamentos/{id}/** - Visualizar detalhes de um equipamento específico. 
- **PUT /api/equipamentos/{id}/** - Atualizar informações de um equipamento específico. 
- **DELETE /api/equipamentos/{id}/** - Deletar um equipamento específico
  
  
## Contato 
Se tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue ou entrar em contato: 
- Lucas Henrique Cardoso - [lucasbonicardoso@outlook.com](mailto:lucasbonicardoso@outlook.com)
