# platziverse-mqtt



## `agent/connected` 

```js
{
  agent:{
    uuid, // auto generado
    username, // definir por configuracion
    name, // definir por configuracion
    hostname, // obtener del sistema operativo
    pid // obtener del proceso
  }
}
```


## `agent/disconnected`
```js
{
  agent:{
    uuid, // auto generado
  }
}
```

## `agent/massage`

```js
{
  agent,
  metric: [
    {
      type,
      value
    }
  ],
  timestamp // generado cuando creamos el mensaje
```
