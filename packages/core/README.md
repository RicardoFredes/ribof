# RIBO

![image](https://user-images.githubusercontent.com/29892001/171888800-040a1a53-7fcf-4294-badc-ffd7b2706fc3.png)

![License](https://img.shields.io/static/v1?label=Licence&message=MIT&color=yellow)
![Coverage](https://img.shields.io/static/v1?label=Coverage&message=0%&color=red)
![Build](https://img.shields.io/static/v1?label=Build&message=Success&color=lemon)
![Version](https://img.shields.io/static/v1?label=Version&message=1.1.1&color=orange)

**RIBO** é a nossa biblioteca de montagem de componentes.

**Explicando o nome:** Quando passamos um json para dentro do componente é como se a gente passasse um RNA para a RIBOssomo fazer a síntese dos componentes no front (proteínas). Ribossomo é muito longo, logo Ribo é mais sonoro.

# Tabela de Conteúdo

- [Sobre](#sobre)
- [Tabela de Conteúdo](#tabela-de-conteudo)
- [Como usar](#como-usar)
- [Instalação](#instalacao)
  - [Pré-requisitos](#pre-requisitos)
  - [Organização dos arquivos](#organizacao-dos-arquivos)
- [Testes](#testes)
- [Publicação](#publicacao)
- [Tecnologias](#tecnologias)

# Como usar <a name="como-usar"></a>

Para adicionar o Ribo aos projetos, rode o seguinte comando:

```bash
$ yarn add ribo
```

Importando o RIBO:

:warning: Em construção

# Instalação <a name="instalacao"></a>

Para rodar o projeto você precisa clonar a aplicação em usa máquina:

```bash
# Clone este repositório
$ git clone git@github.com:mesalva/ribo.git

# Acesse a pasta do projeto no terminal/cmd
$ cd ribo

# Instale as dependências
$ yarn
```

## Pre-requisitos <a name="pre-requisitos"></a>

- Git
- Node.js >= 14 <= 16 (Recomendado)
- Yarn >= 1 <= 2

Os seguintes padrões foram adotados e devem ser seguidos:

- [Conventional Commits](https://www.conventionalcommits.org)

## Organização dos arquivos <a name="organizacao-dos-arquivos"></a>

O projeto está organizado da seguinte maneira:

```bash
📂src
 ┣ 📂async-content # componente que usa controller com JST
 ┣ 📂constraints-content # componente que usa as constraints
 ┣ 📂ribo # componente recursivo de montagem de componentes
 ┗ 📜index.ts # arquivo que exporta todos os componentes
```

# Testes <a name="testes"></a>

## Testes unitários e funcionais

Os testes da aplicação usam o [RTL (React Testing Library)](https://testing-library.com/docs/react-testing-library), que trabalham em conjunto com o [Jest](https://jestjs.io/pt-BR/) e o [React Test Utils](https://reactjs.org/docs/test-utils.html).

Os arquivos de testes unitários devem seguir a extensão `.spec.ts`.

```bash
# Rodando os testes
$ yarn test

# Rodando os testes com watch
$ yarn test:watch

# Rodando os testes com coverage
$ yarn test:coverage
```

# Publicação <a name="publicacao"></a>

:warning: Em construção

A publicação do projeto é automatizada e feita toda a vez que um PR é mesclado no branch `main`.
A geração de tags e publicação é realizado com base no semantic realease, assim como a atualização da documentação contendo a versão mais recente do modulo no npm.

# Tecnologias <a name="tecnologias"></a>

- [Jest](https://jestjs.io/pt-BR/)
- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [RTL (React Testing Library)](https://testing-library.com/docs/react-testing-library)
- [TypeScript](https://www.typescriptlang.org/)
