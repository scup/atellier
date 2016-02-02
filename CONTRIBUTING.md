# Contributing to Atellier

We'd love for you to contribute to our source code and to make Atellier even better than it is today!
Here are the guidelines we'd like you to follow:

 - [Got a Question or Issue](#issue)
 - [Feature Requests](#feature)
 - [Submission Guidelines](#submit)
 - [Coding Rules](#rules)
 - [Git Commit Guidelines](#commit)

## <a name="issue"></a> Got a Question or Issue?
If you got a question, find a bug or an issue in the source code or a mistake in the documentation, you can help us by
submitting an issue to our [GitHub Repository](https://github.com/scup/Atellier/issues). Even better you can submit a Pull Request
with a fix.

**Please see the Submission Guidelines below**.

## <a name="feature"></a> Want a Feature?
You can request a new feature by submitting an issue to our [GitHub Repository](https://github.com/scup/Atellier/issues).  If you would like to implement
a new feature then consider what kind of change it is:

* **Major Changes** that you wish to contribute to the project should be discussed first in issue on our
[GitHub Repository](https://github.com/scup/Atellier/issues) so that we can better coordinate our efforts, prevent
duplication of work, and help you to craft the change so that it is successfully accepted into the
project.
* **Small Changes** can be crafted and submitted to the [GitHub Repository](https://github.com/scup/Atellier/pulls) as a Pull Request.


## <a name="submit"></a> Submission Guidelines

### Submitting an Issue
Before you submit your issue search the archive, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new features, by not reporting duplicate issues.
Providing the following information will increase the chances of your issue being dealt with quickly:

* **Overview of the Issue** - if an error is being thrown a non-minified stack trace helps
* **Motivation for or Use Case** - explain why this is a bug for you
* **Atellier Version(s)** - is it a regression?
* **Browsers and Operating System** - is this a problem with all browsers or only IE8?
* **Reproduce the Error** - provide a live example (using [Codepen](http://codepen.io/), [Plunker](https://plnkr.co/) or
  [JSFiddle](https://jsfiddle.net/) or an unambiguous set of steps.
* **Related Issues** - has a similar issue been reported before?
* **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be
  causing the problem (line of code or commit)

Here is a great example of a well defined issue: https://github.com/scup/Atellier/issues/1

**If you get help, help others. Good karma rulez!**

### Submitting a Pull Request
Before you submit your pull request consider the following guidelines:

* Search [GitHub](https://github.com/scup/Atellier/pulls) for an open or closed Pull Request that relates to your
  submission. You don't want to duplicate effort.
* Make your changes in a new git branch, using [git-flow](http://nvie.com/posts/a-successful-git-branching-model/):
  * ***feature***

    ```shell
    git checkout -b feature/my-feature-description development
    ```

  * ***hotfix***

    ```shell
    git checkout -b hotfix/my-hot-fix-description master
    ```

  * ***release***

    ```shell
    git checkout -b release/my-release-1.0.0 development
    ```

* ***Create your patch, INCLUDING APPROPRIATE TEST CASES.***

  ```shell
  git checkout -b feature/my-feature-description development
  ```

* Run the full Atellier test suite, and ensure that all tests pass.
* Commit your changes using a descriptive commit message that follows our
  [Git Commit Guidelines](#commit) for future change logs.
    ```shell
    git commit -a
    ```
  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

* Build your changes locally to ensure all the tests pass:

  ```shell
  npm test && npm build
  ```

* Push your branch to GitHub:

  ```shell
  git push origin feature/my-feature-description
  ```

* In GitHub, send a pull request to `Atellier:master`.
* If we suggest changes then:
  * Make the required updates.
  * Re-run the Atellier test suite to ensure tests are still passing.
  * Commit your changes to your branch (e.g. `feature/my-feature`).
  * Push the changes to your GitHub repository (this will update your Pull Request).

If the PR gets too outdated we may ask you to rebase and force push to update the PR:

```shell
git rebase development -i
git push origin feature/my-feature -f
```

*WARNING. Squashing or reverting commits and forced push thereafter may remove GitHub comments
on code that were previously made by you and others in your commits.*

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```

## <a name="rules"></a> Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested**.
* All public API methods **must be documented**.
* With the exceptions listed below, we follow the rules contained in dotfile `.eslint` [ESLint](http://eslint.org/):
    * Wrap all code at **120 characters**.
    * We **don't go crazy with type annotations** for private internal APIs unless it's an internal API
      that is used throughout Atellier. The best guidance is to do what makes the most sense.

## <a name="commit"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  But also,
we use the git commit messages to **generate the Atellier change log**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope
The scope could be anything specifying place of the commit change. For example `Inspector`, `MyExampleView`

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues
that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit
message is then used for this.

### Facilities
* ***Atom packages*** that's useful for live lint your code
[ATOM_PACKAGES.md](https://gist.github.com/joaoneto/79341a504809cd6063ab)

---

This Contributing Guide is based on Angular.js
[CONTRIBUTING.md](https://github.com/angular/angular.js/)
