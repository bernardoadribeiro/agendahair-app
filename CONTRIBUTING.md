# Como contribuir

## Fluxo de desenvolvimento

- Toda nova implementação deve ser iniciado a partir da branch `develop`. 
  Para isso: 
  - Vá para a branch `develop` usando o comando `git checkout develop`
  - Atualize a branch com a que está no repositório: `git pull`
  - Crie sua branch: `git checkout -b nome_da_branch`
  - Agora está pronto para iniciar o desenvolvimento da funcionalidade que irá implementar.
- Quando o desenvolvimento estiver pronto para ser revisado, crie um `pull request` comparando a sua branch com a `develop`.
- Toda nova tarefa deve ser submetida por uma Pull Request.
- Faça diversos commits dependendo do tamanho da task.
- Os commits devem ser descritivos.
- **Não faça commits diretamente na branch `main` ou `develop`.


### Git básico
- Atualizar sua branch local: `git pull`
- Mudar de branch: `git checkout <nome da branch>`
- Criar nova branch `git checkout -b <nome da branch>`
- Preparar alterações para commit: `git add <nome do arquivo>` ou `git add .` para adicionar todos.
- Enviar seus commits locais para o repositório: `git push origin <nome da sua branch>`
  Após enviar seus commits para o repositório, o próprio Github te sugere criar um Pull Request.

-----

## Branches

- As branches são categorizadas da seguinte forma:
    - `feature/` ⮕ Para implementação de nova feature
    - `task/` ⮕ Para implementação de uma tarefa que não seja nem uma feature nem um bug
    - `fix/` ⮕ Para correção de um bug
    - `hotfix/` ⮕ para correção de um bug urgente, que irá paralisar o andamento do projeto em alguma parte ou para alguém
        - exeplos de nomenclaturas de branches:
            ```
            feature/new-component
            ```

            ```
            task/neither-feature-nor-bug
            ```

            ```
            fix/not-urgent-bug
            ```

            ```
            hotfix/urgent-bug
            ```

-----

## Commit Message

- Os commits devem ser descritivos.
- Prepare suas modificações para commitar usando o comando: `git add <file_name>` ou `git add .` para adicionar todos.

Ao nomear seu commit, siga os prefixos:

```bash
git commit -m 'feat: message' # <nova funcionalidade>
git commit -m 'fix: message' # <correção>
git commit -m 'refactor: message' # <reconstrução de alguma funcionalidade>
git commit -m 'build: message' # <mudanças que afetam o build ou adicionam dependencias>
```

-----

## Pull Request
- As features deverão ser entregues por meio de Pull Request da sua branch para a branch `develop`.
- Descreva no Pull Request o que você está implementando.
- Pull Requests são criados pelo Github.

-----

