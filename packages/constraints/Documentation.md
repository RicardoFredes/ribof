# Constraints
Uma biblioteca para segmentação de dados baseada em regras.

## Data

Os dados aceitos são em formato json e podem ter vários níveis.

**Exemplo**

O json abaixo será usado para os exemplos seguintes:

```json
{
  "user": {
    "name": "Ricardo Fredes",
    "guest": false,
    "roles": [
      {
        "name": "Desenvolvedor",
        "slug": "dev"
      },
      {
        "name": "Beta tester",
        "slug": "tester",
      }
    ]
  },
  "accesses": {
    "has": true,
    "courses": [ "medicina", "questoes", "100-dias" ],
    "remainingDays": 30
  },
  "platform": "Me Salva!"
}
```

## Rules

As regras aplicadas para para criar uma `constraint` são baseadas em um conjunto formado por `conditions` e `asserts`:

### Conditions

As condições são operadores lógicos e seguem o mesmo modelo da tabela verdade usada na lógica de programação:

| Símbolo | Significado |
|---------|-------------|
| `AND`   | operador "E"
| `\OR`   | operador "OU"

### Asserts

Os comparadores são operadores matemáticos que atuam sobre duas entradas e retornam um valor boleano:

| Símbolo | Significado      | Tipos aceitos |
|---------|------------------| --------------|
| `=`     | Igual            | `string`, `boolean`, `number`
| `!=`    | Diferente        | `string`, `boolean`, `number`
| `>`     | Maior que        | `number`
| `<`     | Menor que        | `number`
| `~`     | Contém parte     | `string`, `string[]`, `number[]`
| `!~`    | Não contém parte | `string`, `string[]`, `number[]`

### Estrutura das regras

```js
const rules = {
  field: "user.guest",
  value: false,
  operator: "=",
};
```

- `field`: é a chave correspondente ao índice do objeto de dados (`data`)
- `value`: é o valor ao qual se deseja comparar ao valor do objeto
- `operator`: é um dos asserts possíveis

#### fields
As `fields` são uma parte importante para o acesso aos dados.

Abaixo seguem alguns exemplos:

| field | valor da chave   |
| ---------- | --------- |
| platform   | `"Me Salva!"`
| notFound   | `undefined`
| user.guest | `false`
| accesses.remainingDays | `30`
| courses    | `[ "medicina", "questoes", "100-dias" ]`
| courses[0] | `"medicina"`
| courses[3] | `undefined`
| user.notFound | `undefined`
| user.roles[1].slug | `"tester"`
| user.roles[3].slug | `undefined`

## Como usar

```js
import Constraints from "@fredes/constraints";
import data from "./data.json";

const constraints = new Constraints(data);
const rules = {};

constraints.match(rules);
// false
```

```js
const rules = {
  field: "user.guest",
  operator: "=",
  value: false,
};
// true
```

```js
const rules = {
  field: "user.guest",
  operator: "!=",
  value: true,
};
// false
```

```js
const rules = {
  field: "accesses.remainingDays",
  operator: "<",
  value: 30,
};
// true
```

```js
const rules = {
  field: "accesses.remainingDays",
  operator: ">",
  value: 30,
};
// false
```

```js
const rules = {
  field: "accesses.courses",
  operator: "~",
  value: "medicina",
};
// true
```

```js
const rules = {
  field: "accesses.courses",
  operator: "!~",
  value: "medicina",
};
// false
```

```js
const rules = {
  operator: "OR",
  value: [
    {
      field: "accesses.courses",
      operator: "~",
      value: "medicina",
    },
    {
      field: "accesses.courses",
      operator: "~",
      value: "engenharia",
    }
  ]
}
// true
```

### Referência
- https://developers.intercom.com/intercom-api-reference/reference/search-for-contacts
