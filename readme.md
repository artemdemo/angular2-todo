#Angular 2 - ToDo

ToDo project. It is ready to start out of the box

## How to install TypeScript

In your project folder:

1.
```
npm install -g tsd
```

2.
```
tsd query angular2 --action install
```

3.
```
npm install -g typescript@^1.5.0-beta
```

4.
```
touch app.ts index.html
```

5.
```
tsc --watch -m commonjs -t es5 --emitDecoratorMetadata app.ts
```