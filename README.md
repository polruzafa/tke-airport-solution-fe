# TKE Airport Solutions

## Deliverable

El documento con la propuesta es [DELIVERABLE.md](DELIVERABLE.md)

## Monorepo

Este repositorio está emulando la estructura del monorepo propuesto, pero **no está configurado como tal**. Por lo tanto, ni los _hooks_ ni los _services_ se están compartiendo entre las _apps_.

## Setup

### Web
![photo_2025-07-16_18-06-47](https://github.com/user-attachments/assets/81e0f370-4ede-445c-a43d-3c720c15a157)

#### Curiosidades
- El _hook_ de `useSignalStrengh` devuelve un valor cada 3 segundos y el icono en el header se actualiza en tiempo real.

#### Installation
Desde `monorepo/apps/web`:
```
npm i
npm start
```

### Native

https://github.com/user-attachments/assets/aa64b544-f374-43d7-a658-a7bdfc42b83f

#### Curiosidades
- Hacer _tap_ en la siguiente tarea termina la actual y empieza la siguiente. Sólo se pueden completar tareas secuencialmente.

#### Installation
Desde `monorepo/apps/native`:
```
npm i
npx expo start
```
