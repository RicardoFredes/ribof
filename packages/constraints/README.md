# Constraints | Me Salva!

![License](https://img.shields.io/static/v1?label=Licence&message=MIT&color=yellow)
![Coverage](https://img.shields.io/static/v1?label=Coverage&message=100%&color=success)
![Build](https://img.shields.io/static/v1?label=Build&message=Success&color=lemon)
![Version](https://img.shields.io/static/v1?label=Version&message=1.0.0-alpha.1&color=orange)

Biblioteca para segmentação de públicos a partir de um entrada de objeto chave-valor.

# Como usar

Para adicionar o `constraints` aos projetos, rode o seguinte comando:

```bash
yarn add constraints
```

Importando a biblioteca e aplicando em um exemplo simples de uso:

```ts
import constraints from "constraints";

const input = { my_key: "my_value" };
const rules = { key: "my_key", value: "my_value", operation: "equal" };

constraints(input, rules); // true
```

No exemplo acima, o método `constraints` verifica se o `input` contém uma chave (`my_key`) como o valor igual à `my_value`. Retornando um valor boleano `true` para o caso de satisfazer todas as regras (`rules`) ou `false` para o contrário.

Os seguintes operadores estão disponíveis:

| operation | pode ser combinado? | caso
|-|-|-
| `equal` | false | compara os valores do input com a regra (default) `value1 === value2`
| `not` | false | compara os valores do input com a regra  `value1 !== value2`
| `less` | false | compara os valores numéricos do input com a regra  `number1 < number2`
| `greater` | false | compara os valores numéricos do input com a regra `number1 < number2`
| `contains` | false | verifica se o valor do input está contido dentro de uma `string` ou `array`
| `not-contains` | false | verifica se o valor do input NÃO está contido dentro de uma `string` ou `array`
| `and` | true | compara dois grupos de casos (`right` e `left`)
| `or` | true | compara dois grupos de casos (`right` e `left`)


As entradas sempre devem ser um `object` simples com chave-valor, em que os valores podem ser dos tipos:

- `boolean`
- `number`
- `string`
- `undefined`
- `null`
- `array`

```ts
const input = {
  first: true,
  secondary: 15,
  third: "third",
  fourth: undefined,
  fifth: null,
};
```

As regras podem ser simples, como apresentado anteriormente, ou mais complexas ao se usar um operador (`or` ou `and`) contendo dois _braços_ (`right` e `left`) para as condições. A condição por sua vez, pode ser uma regra simples ou também pode conter uma estrutura de _braços_ como o exemplo abaixo:

```ts
const rules = {
  operation: "or",
  left: { key: "first", value: true },
  right: { key: "secondary", value: 15 },
};
```

Abaixo segue um exemplo mais complexo:

```ts
const rules = {
  operation: "and",
  left: { key: "first", value: true },
  right: {
    operation: "or",
    left: { key: "secondary", value: 15 },
    right: { key: "third", value: "third" },
  },
};
```

Utilizando operadores simples:

```ts
import constraints from "constraints";

const input = { my_key: "my_value" };
const rules = { operation: "not", key: "my_key", value: "another_value_value" };

constraints(input, rules); // true
```

# Como publicar

Esse projeto utiliza o conventional commits como padrão de escrita de commits. Com base nessas regras, sempre que um PR é mesclado no branch `main`, uma nova versão do pacote é publicada no `npm`.

# Como testar

Para rodar os testes basta executar o seguinte comando:

```bash
$ yarn test

// or

$ yarn test:watch
```
