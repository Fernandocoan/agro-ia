# AGRO IA — Assistente Inteligente do Campo

Versão polida do projeto **AGRO IA**, pronta para subir no GitHub Pages.

O app continua sendo 100% frontend: basta publicar o `index.html`. Não precisa de backend, login ou chave de API.

## O que foi melhorado

- Visual mais clean e premium, mantendo identidade agro
- Layout centralizado e responsivo para celular e desktop
- Cabeçalho com status real de conexão
- Atalhos rápidos mais elegantes
- Chat com bolhas mais refinadas e melhor espaçamento
- Resposta mais objetiva para reduzir tempo percebido
- Botões para copiar e ouvir respostas
- Função de exportar conversa em `.txt`
- Função de nova conversa
- Histórico salvo localmente no navegador
- Upload de foto com compressão antes do envio
- Aviso técnico para uso responsável em defensivos, doses e diagnósticos

## Arquivos para subir

Suba estes arquivos:

```txt
index.html
manifest.webmanifest
icon.svg
sw.js
```

Este README é opcional, mas recomendado para o repositório.

## Como publicar no GitHub Pages

1. Crie um repositório público no GitHub, por exemplo `agro-ia`.
2. Envie o arquivo `index.html` para a raiz do repositório.
3. Vá em **Settings > Pages**.
4. Em **Source**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/root`.
6. Salve e aguarde alguns minutos.

O link ficará parecido com:

```txt
https://SEU-USUARIO.github.io/agro-ia/
```

## Tecnologias

| Recurso | Tecnologia |
| --- | --- |
| IA de texto | Pollinations.ai |
| IA com imagem | Pollinations.ai com entrada visual |
| Voz para texto | Web Speech API |
| Texto para fala | SpeechSynthesis API |
| Hospedagem | GitHub Pages |
| Backend | Nenhum |

## Observações importantes

- A IA depende da disponibilidade da Pollinations.ai.
- O microfone funciona melhor no Google Chrome.
- Diagnóstico por imagem é apoio inicial, não substitui agrônomo.
- Para defensivos, dose, carência e manejo químico, siga bula e orientação técnica local.

Projeto acadêmico AGRO IA — inteligência artificial para o campo brasileiro.
