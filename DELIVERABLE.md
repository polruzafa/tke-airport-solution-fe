# TKE Airport Solutions

### Plataforma de Monitorización de Operaciones Quirúrgicas
#### Contexto
Estás participando en el desarrollo de una plataforma crítica para la
monitorización en tiempo real de operaciones quirúrgicas en un hospital.
Cada profesional (cirujano, anestesista, enfermero quirúrgico, etc.) cuenta con
una aplicación móvil desde la que puede registrar el inicio y fin de sus tareas.

Además, un dashboard web permite al responsable de planta visualizar, en
tiempo real, todas las salas de quirófano, tareas activas, tiempos, y alertas si
hay riesgos operacionales.

La plataforma también integra datos automáticos provenientes de cámaras y
sensores, que identifican personas y tareas, complementando los registros
manuales.
Debe ser una aplicación crítica, altamente disponible, usable sin conexión
en ciertos contextos, y diseñada para escalar a múltiples hospitales
internacionales.

## Diseño de Arquitectura Frontend

### Análisis

Pese a que **React-Native** nos permite tener versiones nativas y web de **una misma aplicación** en una sola base de código, en este caso las dos aplicaciones que queremos crear tienen casos de uso totalmente distintos y el usuario (rol) que las utilizaría tampoco es el mismo: 
- el usuario/rol de *management* sólo usaría la aplicación web para la visualización de _dashboards_.
- el usuario/rol de *profesional* sólo usaría la aplicación nativa para el registro de sus tareas.

### Propuesta

A partir del análisis anterior vemos que no tendría sentido tener una sola app en **React-Native** y optaríamos por un **Monorepo** con ambas aplicaciones claramente separadas y un conjunto de componentes, servicios y *utilities* comunes.

```
+---------------------------+
|     Monorepo Root         |
+---------------------------+
|  apps/                    |
|   ├── web/                |  <- React
|   └── mobile/             |  <- React-Native
|                           |
|  common/                  |
|   ├── locales/            |  <- Translations
|   ├── ui/                 |  <- Design System (React + RN)
|   ├── core/               |  <- Domain logic (tasks, validation)
|   ├── hooks/              |  <- React Hooks 
|   └── services/           |  <- API clients, websockets, storage
|                           |
|  styleguides/             |  <- Style guides for each hospital
|   ├── hospital_1/         |  <- These folders would contain colors, assets
|   └── hospital_2/         |
|                           |
+---------------------------+
```

- Dentro de `common/ui` tendríamos los componentes comunes que quisieramos reaprovechar. Hay que tener en cuenta que muchos componentes **no** serán comunes ya que React-Native usa su propia librería de componentes para pasar de RN a código nativo y web. Por lo tanto, aunque tengamos un componente `<Header />`, dicho componente tendría una versión web y otra nativa pero seguiría el mismo _design system_.

- Los componentes de nuestras aplicaciones usarían los estilos (colores, fuentes, _assets_...) de las **guías de estilos** para cada uno de los hospitales (clientes) que tengamos. Con una buena configuración de los entornos de desarrollo y de nuestro sistema de _builds_ haremos que la aplicación desplegada sólo contenga los estilos del cliente al que entreguemos la build (menor _bundle size_, menor posibilidad de erores...)

- Dentro de `common/core` estarían los archivos comunes de la lógica de negocio. Además de constantes, archivos de _utils_ y demás.

- Los _Hooks_ y los _Services_ serían la parte más reutilizable del código, ya que éstos sí son completamente compatibles entre React y React-Native (a menos que utilicemos alguna librería de terceros que no lo sea).

- En `common/locales` tendríamos todas las traducciones para todas las cadenas de nuestras _apps_, e igual que hicimos con la guía de estilos, mediante configuraciones en el sistema de _builds_ podemos hacer que sólo se incluyan en la _build_ los _locales_ necesarios para cada cliente (por ejemplo, `hospital_1` necesitaría inglés y alemán pero `hospital_2` inglés y francés: nuestra _build pipeline_ sólo añadiría esos locales)

#### Soluciones

- Para ambas aplicaciones usaremos `react-query`, una librería muy completa que nos incluye muchas opciones para caché y permite implementar fácilmente patrones _Optimistic UI_.
Además, si lo necesitásemos podemos complementar `react-query` con `MMKV` (a través de `react-native-mmkv`) en la parte nativa para añadir una capa de persistencia (_offline capabilities_) y resiliencia.

- Por el tipo de aplicación web que queremos (un _dashboard_ con datos en tiempo real) esta aplicación estaría muy limitada en cuanto a utilidad en entornos _offline_.

- Esta _Optimistic UI_ nos mostraría los cambios de nuestras operaciones (empezar o terminar tareas, por ejemplo) de manera optimista, dando por hecho que tenemos conectividad y que la _request_ ha sido exitosa. A través de `react-query` podemos aplicar cambios, revertirlos y actualizar el estado local en caso de error.

- Para la gestión del estado (_in-memory_), viendo que el _scope_ de ambas aplicaciones no es, de momento, muy amplio (el usuario y datos de tareas en una; el usuario y estado de las tareas de otros operarios en otra), no necesitaríamos ninguna libreria de gestión de estado: usando nuestros `services` y `hooks` podemos compartimentar y usar los datos necesarios en cada componente (o _screen_). Para mantener un estado global usaríamos el propio `Context` de React.

- En nuestro _design system_ sería importantísimo tener en cuenta una manera rápida y visual de mostrar el estado de la conectividad, ya sea mediante notificaciones o cambios visuales en la interfaz (por ejemplo con el uso de colores), además de diseñar todos nuestros componentes que dependen de datos asíncronos con diferentes estados (por ejemplo mediante un icono para mostrar que una tarea está sincronizada con el servidor o todavía está a la espera de respuesta).

#### Explica
-  ¿Qué decisiones tomarías para que el código sea escalable y reusable?

Todas las decisiones tomadas en su conjunto ya están enfocadas a la escalabilidad y a la reusabilidad. En todo caso, la aplicación dependerá mucho de la disponibilidad de conexión y del rendimiento del _backend_, pero aunque la latencia aumente, el uso de `react-query`  y nuestro enfoque _optimistic UI_ harían que la aplicación se siguiese percibiendo fluida.

Por otro lado, si el número de clientes (`styleguides`) creciese demasiado en un futuro, sería muy útil tener un segundo repositorio con las guías de estilos e importarlas directamente desde ahí.

- ¿Qué patrón de navegación propones para la app móvil?

Dependería mucho de la cantidad de vistas (_screens_) que queramos tener. En un principio una simple `TabBar` con unos iconos bien definidos y botones grandes (pensando en operarios con guantes, por ejemplo) funcionaría bien.
Utilizando `expo-router` (viene incluido con el framework `Expo`) tenemos varias opciones muy fáciles de implementar, incluso cambiarlas en el futuro si el número de _features_ crece y necesitamos más vistas.

- ¿Cómo implementarías resiliencia offline (por ejemplo, para registrar
tareas sin red)?

Usando `react-query` podemos hacer cambios en la interfaz asumiendo una respuesta OK a nuestras peticiones (_Optimistic UI_) e incluso marcar el cambio como _pending_ visualmente mientras estamos intentando resolver las peticiones en _background_ de manera exponencial. 

- ¿Qué arquitectura seguirías para el diseño de componentes reutilizables?

Con el **monorepo** podríamos tener los elementos de interfaz comunes, como cabeceras, botones personalizados, etc. en `commons/ui` y usarlos en tantas aplicaciones como queramos. Hay que tener en cuenta que pese a que React y React-Native son muy parecidos y comparten muchísima funcionalidad interna (como los _hooks_), los componentes de React-Native son diferentes a los elementos HTML que utilizaríamos en React, por lo que no son compatibles. Por lo tanto, aunque el diseño sería idéntico habría que implementar una versión web y otra nativa por separado. 

## Desarrollo parcial de interfaz

## Consideraciones críticas

a) Seguridad y roles

-  ¿Cómo implementarías en el frontend:
    - Autenticación y autorización de usuarios?
    -  Roles y accesos diferenciados (cirujano vs. responsable de
planta)?

Idealmente sería una autenticación con tokens tipo `JWT`. Este token contendrá también el _rol_ del usuario en el sistema y lo añadiremos a cada petición que hagamos al _backend_.

Almacenaremos de forma segura el token en el _frontend_ e implemtaremos un sistema de renovación del token cuando sea necesario, además de redirigir el usuario a la pantalla de _login_ en el momento que el token sea inválido o haya expirado.

b) Alta disponibilidad y modo offline
- ¿Qué técnicas usarías para asegurar que:
    - La app móvil siga funcionando temporalmente sin red?
    - El dashboard web pueda reconectarse y actualizar en tiempo real
sin recargar?

Siguiendo una estrategia de _offline-first_ en la aplicación móvil utilizando colas de acciones para resolverlas cuando haya conexión, mostrando el estado de la conexión y el estado de las acciones de forma evidente en la UI.

En la aplicación web podríamos optar por usar `WebSockets` para gestionar los datos en tiempo real sin necesidad de recarga por parte del cliente, pero si tenemos cambios frecuentes en el estado de la red, abrir y mantener una conexión _websocket_ es _costoso_: en este caso `react-query` nos permite hacer todas las operaciones que necesitamos: reintentos automáticos cuando detecta conectividad, _polling_ controlado para actualizar los datos sin intervención del cliente y un _fallback_ con la caché local para mostrar al usuario últimos datos recibidos sin perderlos en caso de error.

c) Internacionalización y configuración por hospital
- ¿Cómo plantearías una arquitectura que permita:
    - Cambios de idioma?
    - Customizaciones por hospital sin duplicar código?

Mediante una buena configuración en nuestra _build pipeline_ podemos incluir en cada aplicación sólo las cadenas traducidas en los idiomas necesarios para cada hospital. 

Luego, dentro de cada aplicación podríamos tener un simple desplegable (`<select>`) con los idiomas disponibles para la _build_.

Igualmente, para las _customizaciones_ (de estilos) por hospital sin duplicidad de código, nuestra _pipeline_ sólo incluiría los estilos, colores y _assets_ del hospital seleccionado.

Si queremos que estas _customizaciones_ vayan más allá y añadir una suite de _features_ diferente para cada hospital, podemos controlarlas mediante _feature flags_ durante el proceso de _build_ o utilizar el _backend_ para dictaminar qué _features_ están disponibles para cada hospital.