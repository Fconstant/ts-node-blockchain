## Why?
I was bored, so I made a little blockchain ts node project.

## How to Test
```shell
$ git clone <this_repo_url>
$ npm i
$ npm test
```

If you see `src/test/Basi.spec.ts` you should notice that modifying any data of a `Block` in a `Blockchain` should result in a invalid `Blockchain`.

Trying to force a new hash generation after modifying any data of a `Block` also results in a failure, because this modified `Block` won't be linked anymore to the `Blockchain`
